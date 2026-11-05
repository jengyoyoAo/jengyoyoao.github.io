const fs=require('node:fs'),path=require('node:path');
const [slug,title,...options]=process.argv.slice(2);
if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug||'')||!title){console.error('Usage: npm run new:note -- <slug> "Title" [--topic=Mathematics]');process.exit(1);}
const topic=options.find(o=>o.startsWith('--topic='))?.slice(8)||'Learning';
const date=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Taipei',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const data={layout:'note.njk',tags:['note'],draft:true,title,date,topic,summary:'Write a short summary.',permalink:`notes/${slug}/index.html`};
const target=path.join('notes',slug+'.md');if(fs.existsSync(target))throw new Error('Note already exists; no files changed');
fs.mkdirSync('notes',{recursive:true});
fs.writeFileSync(target,'---\n'+Object.entries(data).map(([k,v])=>`${k}: ${JSON.stringify(v)}`).join('\n')+'\n---\n\n## Key idea\n\nWrite your note here. Use $n$ for inline math.\n\n$$\n\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}\n$$\n',{flag:'wx'});
console.log(`Created draft: ${target}\nSet draft: false when ready; the Notes list updates automatically.`);
