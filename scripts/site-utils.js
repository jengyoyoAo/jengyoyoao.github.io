const fs = require('node:fs');
const path = require('node:path');
const katex = require('katex');
const matter = require('gray-matter');
const platforms = new Set(['project-euler','leetcode','cses','zerojudge']);
const escape = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
function sourceFile(file) {
  const root = path.resolve('solutions');
  const full = path.resolve(file);
  if (!full.startsWith(root+path.sep) || !/\.(py|c)$/.test(full) || !fs.existsSync(full)) throw new Error(`Invalid solution source: ${file}`);
  if (!fs.realpathSync(full).startsWith(fs.realpathSync(root)+path.sep)) throw new Error(`Solution source escapes solutions/: ${file}`);
  return full;
}
function mathPlugin(md) {
  md.inline.ruler.after('escape','math-inline',(state,silent) => {
    const start=state.pos;
    if(state.src[start]!=='$' || state.src[start+1]==='$')return false;
    let end=start+1;
    while((end=state.src.indexOf('$',end))!==-1) {if(state.src[end-1]!=='\\')break;end++;}
    if(end===-1 || state.src.slice(start+1,end).includes('\n'))return false;
    const content=state.src.slice(start+1,end);
    if(!content.trim())return false;
    if(!silent){const token=state.push('math_inline','math',0);token.content=content;}
    state.pos=end+1;return true;
  });
  md.renderer.rules.math_inline=(tokens,i)=>katex.renderToString(tokens[i].content,{throwOnError:true,strict:'error'});
  md.block.ruler.before('fence','math-block',(state,start,end,silent)=>{
    const opening=state.src.slice(state.bMarks[start]+state.tShift[start],state.eMarks[start]).trim();
    if(!opening.startsWith('$$'))return false;
    if(silent)return true;
    let content='',next=start+1;
    if(opening.length>4 && opening.endsWith('$$'))content=opening.slice(2,-2);
    else {
      content=opening.slice(2)+'\n';let closed=false;
      for(;next<end;next++){
        const line=state.src.slice(state.bMarks[next]+state.tShift[next],state.eMarks[next]);
        if(line.trim().endsWith('$$')) {content+=line.slice(0,line.lastIndexOf('$$'));next++;closed=true;break;}
        content+=line+'\n';
      }
      if(!closed)throw new Error('Unclosed display math block');
    }
    const token=state.push('math_block','math',0);token.block=true;token.content=content;token.map=[start,next];state.line=next;return true;
  });
  md.renderer.rules.math_block=(tokens,i)=>katex.renderToString(tokens[i].content,{displayMode:true,throwOnError:true,strict:'error'})+'\n';
}
function validateArticles(items) {
 const seen = new Set();
 for(const {data:d,inputPath} of items){
  if(!platforms.has(d.platform)||!Number.isInteger(d.problem_id)||d.problem_id<1||!d.title||!d.summary||!d.problem_url)throw new Error(`Missing or invalid article metadata: ${inputPath}`);
  if(d.platform==='leetcode'&&!['easy','medium','hard'].includes(d.difficulty))throw new Error(`Invalid difficulty: ${inputPath}`);
  const key=d.platform+'/'+d.problem_id;if(seen.has(key))throw new Error(`Duplicate problem: ${key}`);seen.add(key);
  if(d.permalink!==`online-judge/${d.platform}/problem-${d.problem_id}.html`)throw new Error(`Unexpected article URL: ${inputPath}`);
 }
}
function publishedFiles() {
 const walk = dir => fs.readdirSync(dir,{withFileTypes:true}).flatMap(f=>f.isDirectory()?walk(path.join(dir,f.name)):[path.join(dir,f.name)]);
 const files=new Set();
 for(const file of walk('solutions').filter(f=>f.endsWith('.md'))){
  const {data}=matter(fs.readFileSync(file,'utf8'));
  if(data.draft===true)continue;
  files.add(file);
  if(data.tags?.includes('solution')) {
   for(const value of Object.values(data)) {
    if(Array.isArray(value))for(const source of value)if(source && typeof source==='object' && source.path){sourceFile(source.path);files.add(source.path);}
   }
  }
 }
 return [...files];
}
module.exports={mathPlugin,escape,sourceFile,validateArticles,publishedFiles};
