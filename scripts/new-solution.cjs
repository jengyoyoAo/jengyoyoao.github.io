const fs=require('node:fs'),path=require('node:path');
const [platform,idText,title,...options]=process.argv.slice(2);
const id=Number(idText);
const supported=['project-euler','leetcode','cses','zerojudge'];
if(!supported.includes(platform)||!Number.isSafeInteger(id)||id<1||!title){
 console.error('Usage: npm run new:solution -- <platform> <id> "Title" [--difficulty=easy|medium|hard] [--languages=python,c] [--url=https://...]');process.exit(1);
}
const args=Object.fromEntries(options.map(s=>{const i=s.indexOf('=');if(!s.startsWith('--')||i<0)throw new Error('Options must use --name=value');return[s.slice(2,i),s.slice(i+1)];}));
const difficulty=args.difficulty||'easy';
if(platform==='leetcode'&&!['easy','medium','hard'].includes(difficulty))throw new Error('Difficulty must be easy, medium or hard');
const languages=(args.languages||'python').split(',');
if(!languages.length||new Set(languages).size!==languages.length||languages.some(l=>!['python','c'].includes(l)))throw new Error('Languages must be python, c, or python,c');
const slug=title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'solution';
const stem=String(id).padStart(4,'0')+'-'+slug;
const dir=path.join('solutions',platform),md=path.join(dir,stem+'.md');
const existing=fs.readdirSync(dir).filter(f=>/^\d+.*\.md$/.test(f));
if(existing.some(f=>Number(f.match(/^\d+/)[0])===id))throw new Error('This problem already exists; no files were changed');
const sources=languages.map(l=>({label:l==='python'?'Python':'C',path:path.join(dir,stem+(l==='python'?'.py':'.c'))}));
if([md,...sources.map(s=>s.path)].some(f=>fs.existsSync(f)))throw new Error('File already exists; no files were changed');
const date=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Taipei',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const data={layout:'solution.njk',tags:['solution'],draft:true,platform,problem_id:id,title,date,problem_url:args.url||(platform==='project-euler'?`https://projecteuler.net/problem=${id}`:platform==='leetcode'?`https://leetcode.com/problems/${slug}/`:platform==='cses'?`https://cses.fi/problemset/task/${id}/`:'https://zerojudge.tw/'),summary:'Write a short summary.',topic:'Add a topic',permalink:`online-judge/${platform}/problem-${id}.html`,solutions:sources};
if(platform==='leetcode')data.difficulty=difficulty;
const front=Object.entries(data).map(([k,v])=>`${k}: ${JSON.stringify(v)}`).join('\n');
const body='## Key idea\n\nExplain your approach using $n$ for input size.\n\n## Solution\n\n{% solution solutions %}\n\n## Why it works\n\nExplain correctness.\n\n## Complexity\n\n- **Time:** $O(n)$ — replace with your analysis.\n- **Extra space:** $O(1)$ — replace with your analysis.\n\n## Takeaway\n\nRecord what you learned.\n';
fs.mkdirSync(dir,{recursive:true});
for(const source of sources)fs.writeFileSync(source.path,source.path.endsWith('.py')?'# Add your Python solution here.\n':'/* Add your C solution here. */\n',{flag:'wx'});
fs.writeFileSync(md,`---\n${front}\n---\n\n${body}`,{flag:'wx'});
console.log(`Created draft: ${md}\nEdit the Markdown and source files, then set draft: false to include it in the preview, lists and progress count.`);
