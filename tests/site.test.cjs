const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const {execFileSync}=require('node:child_process');
const {parseHTML}=require('linkedom');
const MarkdownIt=require('markdown-it');
const {mathPlugin,sourceFile,validateArticles,validateNotes}=require('../scripts/site-utils');
const noteTopics=require('../_data/noteTopics.json');
const baseline=require('./migration-baseline.json');
const matter=require('gray-matter');
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(f=>f.isDirectory()?walk(path.join(dir,f.name)):[path.join(dir,f.name)]);}
const published=walk('solutions').filter(p=>p.endsWith('.md')).map(p=>({source:p,...matter(fs.readFileSync(p,'utf8')).data})).filter(d=>d.tags?.includes('solution') && d.draft!==true);
const leetcodeIds=published.filter(d=>d.platform==='leetcode').map(d=>d.problem_id).sort((a,b)=>a-b);
const articleChecks=published.map(d=>({url:d.permalink,codes:Object.values(d).filter(Array.isArray).flat().filter(v=>v?.path).map(v=>v.path)}));
const publishedNotes=walk('notes').filter(file=>file.endsWith('.md')).map(inputPath=>({inputPath,...matter(fs.readFileSync(inputPath,'utf8')).data})).filter(note=>note.draft!==true);

const read=url=>fs.readFileSync(path.join('_site',url),'utf8');
const doc=url=>parseHTML(read(url)).document;

test('every pre-migration public URL still exists and profile and journal pages share the same shell',()=>{
 for(const url of baseline.urls)assert.ok(fs.existsSync(path.join('_site',url)),url);
 for(const note of publishedNotes)assert.ok(fs.existsSync(path.join('_site',note.permalink)),`${note.inputPath} -> ${note.permalink}`);
 for(const topic of noteTopics)assert.ok(fs.existsSync(path.join('_site','notes',topic.slug,'index.html')),`Notes topic: ${topic.slug}`);
 for(const article of articleChecks)assert.ok(fs.existsSync(path.join('_site',article.url)),article.url);
 const shellPages=['index.html','about.html','community.html','notes.html','journal/first-open-source-pr.html','journal/senior-year-slow-down.html','journal/where-my-student-gets-stuck.html'];
 const navMarkup=[];
 for(const url of shellPages){const d=doc(url);assert.equal(d.querySelectorAll('header.topbar').length,1,url);assert.equal(d.querySelectorAll('footer.footer').length,1,url);const nav=d.querySelector('header.topbar nav');assert.ok(nav,url);nav.querySelectorAll('[aria-current]').forEach(link=>link.removeAttribute('aria-current'));navMarkup.push(nav.innerHTML);}
 assert.ok(navMarkup.every(markup=>markup===navMarkup[0]),'shared pages use one consistent navigation');
 assert.match(read('journal/senior-year-slow-down.html'),/language-toggle/);
 assert.match(read('index.html'),/Trying new things/);
});
test('every code panel exactly matches its standalone source; tabs and rendered LaTeX remain valid',()=>{
 for(const article of articleChecks){
  const d=doc(article.url),codes=[...d.querySelectorAll('.solution-code-panel code')];
  assert.deepEqual(codes.map(n=>n.textContent),article.codes.map(p=>fs.readFileSync(p,'utf8').trimEnd()),article.url);
  assert.ok(d.querySelector('.katex'),article.url);
  assert.equal(d.querySelector('.katex-error'),null);
  assert.ok(!read(article.url).includes('cdn.jsdelivr.net'));
  const ids=[...d.querySelectorAll('[id]')].map(n=>n.id);assert.equal(new Set(ids).size,ids.length);
  for(const card of d.querySelectorAll('[data-code-switcher]')){
   const tabs=[...card.querySelectorAll('[role=tab]')];assert.equal(tabs.filter(t=>t.getAttribute('aria-selected')==='true').length,1);
   for(const tab of tabs){const panel=d.getElementById(tab.getAttribute('aria-controls'));assert.ok(panel);assert.equal(panel.hasAttribute('hidden'),tab.getAttribute('aria-selected')!=='true');}
  }
 }
});
test('platform lists sort numerically and progress is generated without client JavaScript',()=>{
 for(const slug of ['project-euler','leetcode','cses','zerojudge']){
  const ids=published.filter(d=>d.platform===slug).map(d=>d.problem_id).sort((a,b)=>a-b);
  const d=doc(`online-judge/${slug}/index.html`);
  assert.deepEqual([...d.querySelectorAll('[data-problem-id]')].map(n=>Number(n.getAttribute('data-problem-id'))),ids);
  if(slug==='zerojudge')assert.equal(d.querySelector('.oj-progress'),null);
  else assert.equal(d.querySelector('.oj-progress-center strong').textContent,String(ids.length));
 }
 for(const id of leetcodeIds)assert.ok(doc(`online-judge/leetcode/problem-${id}.html`).querySelector('.difficulty-label'));
});
test('all local links, fragments and assets in every generated HTML page resolve',()=>{
 const htmlFiles=walk('_site').filter(file=>file.endsWith('.html'));
 const documents=new Map(htmlFiles.map(file=>[path.relative('_site',file).split(path.sep).join('/'),parseHTML(fs.readFileSync(file,'utf8')).document]));
 function targetFile(pathname){
  const relative=decodeURIComponent(pathname).replace(/^\/+/, '') || 'index.html';
  let full=path.join('_site',relative);
  if(fs.existsSync(full)&&fs.statSync(full).isDirectory())full=path.join(full,'index.html');
  else if(relative.endsWith('/'))full=path.join('_site',relative,'index.html');
  return full;
 }
 for(const [url,d] of documents){
  for(const el of d.querySelectorAll('[href], [src], [poster]')){
   const value=el.getAttribute('href') ?? el.getAttribute('src') ?? el.getAttribute('poster');
   if(!value || /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(value))continue;
   const target=new URL(value,`https://site.test/${url}`);
   const full=targetFile(target.pathname);
   assert.ok(fs.existsSync(full),`${url}: ${value}`);
   if(target.hash && full.endsWith('.html')){
    const targetUrl=path.relative('_site',full).split(path.sep).join('/');
    const targetDocument=documents.get(targetUrl) || parseHTML(fs.readFileSync(full,'utf8')).document;
    assert.ok(targetDocument.getElementById(decodeURIComponent(target.hash.slice(1))),`${url}: ${value} points to a missing fragment`);
   }
  }
 }
 assert.ok(htmlFiles.length>=baseline.urls.length,'link checker includes all generated HTML pages');
});
test('LaTeX supports inline/display math, preserves code, and rejects invalid formulas',()=>{
 const md=new MarkdownIt().use(mathPlugin);
 const html=md.render('Let $n$ grow.\n\n$$\nO(n^2)\n$$\n\n`$n$`\n\n```python\nx = "$n$"\n```');
 assert.match(html,/katex-display/);assert.match(html,/<code>\$n\$<\/code>/);assert.match(html,/x = &quot;\$n\$&quot;/);
 assert.throws(()=>md.render('$\\notARealCommand{n}$'));
 assert.throws(()=>md.render('$$\nx\n'));
});
test('Notes metadata validates required fields, topics, layouts and unique public URLs',()=>{
 const data={layout:'note.njk',tags:['note'],title:'Test note',summary:'A short summary.',topic:'Mathematics',date:new Date('2026-11-19T00:00:00Z'),permalink:'notes/test-note/index.html'};
 assert.doesNotThrow(()=>validateNotes([{data,inputPath:'notes/test-note.md'}],noteTopics));
 assert.throws(()=>validateNotes([{data:{...data,topic:'Learning'},inputPath:'notes/test-note.md'}],noteTopics),/topic .*noteTopics.json/);
 assert.throws(()=>validateNotes([{data:{...data,summary:''},inputPath:'notes/test-note.md'}],noteTopics),/summary/);
 assert.throws(()=>validateNotes([{data},{data}],noteTopics),/duplicate permalink/);
});
test('metadata and source errors fail clearly',()=>{
 assert.throws(()=>sourceFile('../secrets.py'));
 const data={platform:'leetcode',problem_id:1,title:'Test',summary:'Test',problem_url:'https://leetcode.com/problems/two-sum/',difficulty:'easy',permalink:'online-judge/leetcode/problem-1.html'};
 assert.throws(()=>validateArticles([{data},{data}]),/Duplicate/);
 assert.throws(()=>validateArticles([{data:{...data,difficulty:'unknown'}}]),/difficulty/);
});
test('a newly scaffolded article updates sorting, count and code from only Markdown and source',()=>{
 const temp=fs.mkdtempSync(path.join(os.tmpdir(),'site-automation-'));
 try {
  fs.cpSync('.',temp,{recursive:true,filter:src=>!['.git','node_modules','_site'].includes(path.basename(src))});
  fs.symlinkSync(path.resolve('node_modules'),path.join(temp,'node_modules'),'dir');
  const run=(args)=>execFileSync(process.execPath,args,{cwd:temp,stdio:'pipe'});
  run(['scripts/new-solution.cjs','leetcode','42','Test Automation','--difficulty=hard']);
  const note=path.join(temp,'solutions/leetcode/0042-test-automation.md');
  let content=fs.readFileSync(note,'utf8');
  run(['node_modules/@11ty/eleventy/cmd.cjs']);
  assert.ok(!fs.existsSync(path.join(temp,'_site/online-judge/leetcode/problem-42.html')),'draft must not publish');
  assert.ok(!fs.existsSync(path.join(temp,'_site/solutions/leetcode/0042-test-automation.md')),'draft Markdown must not publish');
  assert.ok(!fs.existsSync(path.join(temp,'_site/solutions/leetcode/0042-test-automation.py')),'draft source must not publish');
  fs.writeFileSync(note,content.replace('draft: true','draft: false'));
  const source=path.join(temp,'solutions/leetcode/0042-test-automation.py');fs.writeFileSync(source,'print("first version")\n');
  run(['node_modules/@11ty/eleventy/cmd.cjs']);
  let d=parseHTML(fs.readFileSync(path.join(temp,'_site/online-judge/leetcode/index.html'),'utf8')).document;
  assert.deepEqual([...d.querySelectorAll('[data-problem-id]')].map(n=>Number(n.getAttribute('data-problem-id'))),[...leetcodeIds,42].sort((a,b)=>a-b));
  assert.equal(d.querySelector('.oj-progress-center strong').textContent,String(leetcodeIds.length+1));
  const output=path.join(temp,'_site/online-judge/leetcode/problem-42.html');assert.match(fs.readFileSync(output,'utf8'),/first version/);
  fs.writeFileSync(source,'print("updated source only")\n');run(['node_modules/@11ty/eleventy/cmd.cjs']);
  assert.match(fs.readFileSync(output,'utf8'),/updated source only/);
  run(['scripts/new-note.cjs','test-learning-note','Test Learning Note','--topic=Mathematics']);
  const notePath=path.join(temp,'notes/test-learning-note.md');
  run(['node_modules/@11ty/eleventy/cmd.cjs']);
  assert.ok(!fs.existsSync(path.join(temp,'_site/notes/test-learning-note/index.html')));
  fs.writeFileSync(notePath,fs.readFileSync(notePath,'utf8').replace('draft: true','draft: false'));
  run(['node_modules/@11ty/eleventy/cmd.cjs']);
  const notesIndex=fs.readFileSync(path.join(temp,'_site/notes/index.html'),'utf8');
  assert.match(notesIndex,/Test Learning Note/);
  assert.match(fs.readFileSync(path.join(temp,'_site/notes/test-learning-note/index.html'),'utf8'),/katex-display/);
  fs.writeFileSync(note,content);
  run(['scripts/clean.cjs']);run(['node_modules/@11ty/eleventy/cmd.cjs']);
  assert.ok(!fs.existsSync(output),'unpublishing a draft must remove old output on a clean build');
 } finally {fs.rmSync(temp,{recursive:true,force:true});}
});

test('TOEIC reading records preserve Test 1 totals and leave unrecorded tests empty',()=>{
 const progress=require('../_data/readingProgress')();
 assert.equal(progress.tests.length,10);
 assert.equal(progress.completed,1);
 assert.deepEqual([progress.first.correct,progress.first.incorrect,progress.first.total],[74,26,100]);
 assert.deepEqual(progress.first.sections.map(s=>s.correct),[23,10,4,18,19]);
 for(const test of progress.tests.slice(1)){
  assert.equal(test.recorded,false);
  assert.equal(test.date,null);
  assert.equal(test.minutes,null);
  assert.equal(test.notesUrl,null);
 }
 const log=doc('notes/toeic/reading/index.html');
 assert.equal(log.querySelectorAll('.reading-results tbody tr').length,10);
 assert.equal(log.querySelectorAll('.reading-result-recorded').length,1);
 for(const url of ['notes/toeic/reading/index.html','notes/toeic/reading/test-1/index.html','notes/toeic/vocabulary/a/index.html']){
  const d=doc(url),active=d.querySelectorAll('.notebook-sidebar [aria-current="page"]');
  assert.equal(active.length,1,url);
  assert.equal(active[0].getAttribute('href'),'/'+url.replace('index.html',''),url);
  const ids=[...d.querySelectorAll('[id]')].map(n=>n.id);
  assert.equal(new Set(ids).size,ids.length,url);
 }
 const review=doc('notes/toeic/reading/test-1/index.html');
 assert.equal(review.querySelectorAll('details.reading-topic[id]').length,8);
 assert.ok(review.body.textContent.includes('9789864543687'));
});
