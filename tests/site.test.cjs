const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const {execFileSync}=require('node:child_process');
const {parseHTML}=require('linkedom');
const MarkdownIt=require('markdown-it');
const {mathPlugin,sourceFile,validateArticles}=require('../scripts/site-utils');
const baseline=require('./migration-baseline.json');
const read=url=>fs.readFileSync(path.join('_site',url),'utf8');
const doc=url=>parseHTML(read(url)).document;

test('every pre-migration URL still exists, with static profile/journal pages preserved',()=>{
 for(const url of baseline.urls)assert.ok(fs.existsSync(path.join('_site',url)),url);
 for(const url of ['index.html','about.html','community.html','notes.html','journal/first-open-source-pr.html'])assert.equal(read(url),fs.readFileSync(url,'utf8'),url);
});
test('every code panel exactly matches its standalone source; tabs and rendered LaTeX remain valid',()=>{
 for(const article of baseline.articles){
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
 for(const [slug,ids] of [['project-euler',[1,2,3,4]],['leetcode',[1,2,3,1385]],['cses',[]],['zerojudge',[]]]){
  const d=doc(`online-judge/${slug}/index.html`);
  assert.deepEqual([...d.querySelectorAll('[data-problem-id]')].map(n=>Number(n.getAttribute('data-problem-id'))),ids);
  if(slug==='zerojudge')assert.equal(d.querySelector('.oj-progress'),null);
  else assert.equal(d.querySelector('.oj-progress-center strong').textContent,String(ids.length));
 }
 for(const id of [1,2,3,1385])assert.ok(doc(`online-judge/leetcode/problem-${id}.html`).querySelector('.difficulty-label'));
});
test('all local article, asset and navigation links resolve',()=>{
 for(const url of baseline.urls){
  for(const el of doc(url).querySelectorAll('[href], [src]')){
   const value=el.getAttribute('href')||el.getAttribute('src');if(!value||/^(https?:|mailto:|#|data:)/.test(value))continue;
   const target=new URL(value,'https://site.test/'+url).pathname;
   const full=path.join('_site',decodeURIComponent(target));assert.ok(fs.existsSync(full),`${url}: ${value}`);
  }
 }
});
test('LaTeX supports inline/display math, preserves code, and rejects invalid formulas',()=>{
 const md=new MarkdownIt().use(mathPlugin);
 const html=md.render('Let $n$ grow.\n\n$$\nO(n^2)\n$$\n\n`$n$`\n\n```python\nx = "$n$"\n```');
 assert.match(html,/katex-display/);assert.match(html,/<code>\$n\$<\/code>/);assert.match(html,/x = &quot;\$n\$&quot;/);
 assert.throws(()=>md.render('$\\notARealCommand{n}$'));
 assert.throws(()=>md.render('$$\nx\n'));
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
  assert.deepEqual([...d.querySelectorAll('[data-problem-id]')].map(n=>Number(n.getAttribute('data-problem-id'))),[1,2,3,42,1385]);
  assert.equal(d.querySelector('.oj-progress-center strong').textContent,'5');
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
