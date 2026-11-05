const fs = require('node:fs');
const crypto = require('node:crypto');
const MarkdownIt = require('markdown-it');
const hljs = require('highlight.js');
const { parseHTML } = require('linkedom');
const { mathPlugin, escape, sourceFile, validateArticles, publishedFiles } = require('./scripts/site-utils');

module.exports = function (config) {
  config.setNunjucksEnvironmentOptions({autoescape: true});
  config.addPreprocessor('drafts', 'md', (data) => data.draft === true ? false : undefined);
  const md = new MarkdownIt({ html: true, typographer: false });
  md.use(mathPlugin);
  md.use(require('./scripts/math-preamble').theoremPlugin);
  config.setLibrary('md', md);
  config.ignores.add('README.md');
  config.ignores.add('docs/**');
  config.ignores.add('tests/**');
  config.ignores.add('solutions/**/README.md');
  config.ignores.add('solutions/README.md');
  config.ignores.add('solutions/TEMPLATE.md');
  config.ignores.add('_site/**');

  for (const name of ['index.html', 'about.html', 'community.html', 'notes.html', '404.html', 'images', 'favicon.svg', 'site.css', 'solution-tabs.js', 'journal', 'online-judge/index.html', 'online-judge/progress-data.json']) config.addPassthroughCopy(name);
  config.addPassthroughCopy({'node_modules/katex/dist/katex.min.css': 'assets/katex/katex.min.css', 'node_modules/katex/dist/fonts': 'assets/katex/fonts'});
  config.addPassthroughCopy({'node_modules/highlight.js/styles/github-dark.css': 'assets/code.css'});
  // Preserve direct links to downloadable source files and Markdown notes.
  for (const file of publishedFiles()) config.addPassthroughCopy(file);
  config.addWatchTarget('solutions/**/*.{py,c}');
  config.addWatchTarget('online-judge/progress-data.json');

  config.addCollection('notes', api => api.getFilteredByTag('note').sort((a,b) => new Date(b.date)-new Date(a.date)));
  config.addCollection('solutions', api => {
    const articles = api.getFilteredByTag('solution');
    validateArticles(articles);
    return articles.sort((a,b) => a.data.platform.localeCompare(b.data.platform) || a.data.problem_id-b.data.problem_id);
  });
  config.addFilter('notesByTopic', (items, topic) => (items || []).filter(item => item.data.topic === topic).sort((a,b) => a.data.title.localeCompare(b.data.title)));
  config.addFilter('platformSolutions', (items, platform) => items.filter(item => item.data.platform === platform));
  config.addFilter('number', value => Number(value).toLocaleString('en-US'));
  config.addFilter('dateLabel', value => new Intl.DateTimeFormat('en-US', {year:'numeric', month:'long', day:'numeric',timeZone:'UTC'}).format(new Date(value)));
  config.addFilter('dateISO', value => new Date(value).toISOString().slice(0,10));
  config.addFilter('percentage', (count,total) => total ? (count/total*100).toFixed(6) : '0');

  config.addShortcode('solution', function (sources) {
    if (!Array.isArray(sources) || !sources.length) throw new Error('solution shortcode needs a nonempty source-file list');
    const id = 'code-'+crypto.createHash('sha256').update(this.page.inputPath+JSON.stringify(sources)).digest('hex').slice(0,12);
    const tabs = [], panels = [];
    sources.forEach((source,i) => {
      const file = sourceFile(source.path);
      const text = fs.readFileSync(file,'utf8').replace(/\n+$/,'');
      const language = source.path.endsWith('.py') ? 'python' : 'c';
      const tab = `${id}-${i}-tab`, panel = `${id}-${i}-panel`;
      tabs.push(`<button id="${tab}" type="button" role="tab" aria-selected="${i===0}" aria-controls="${panel}" tabindex="${i===0?0:-1}">${escape(source.label)}</button>`);
      panels.push(`<div id="${panel}" class="solution-code-panel" role="tabpanel" aria-labelledby="${tab}" tabindex="0"${i?' hidden':''}><pre><code class="hljs language-${language}">${hljs.highlight(text,{language}).value.replaceAll('\n','&#10;')}</code></pre></div>`);
    });
    return `<div class="solution-code-card" data-code-switcher><div class="solution-code-toolbar"><div class="code-tabs" role="tablist" aria-label="Choose solution language or approach">${tabs.join('')}</div><div class="code-copy-group"><button class="code-copy" type="button" data-copy-code>Copy</button><span class="code-copy-status" data-copy-status aria-live="polite"></span></div></div>${panels.join('')}</div>`;
  });
  config.addTransform('article-sections', function (html) {
    if (!this.page.outputPath?.endsWith('.html')) return html;
    const { document } = parseHTML(html);
    const body = document.querySelector('.solution-content');
    if (!body) return html;
    const nodes = [...body.childNodes];
    let section, n = 0;
    for (const node of nodes) {
      if (node.nodeName === 'H2') {
        section = document.createElement('section');
        section.className = 'solution-section';
        const id = `section-${++n}`;
        node.id = id; section.setAttribute('aria-labelledby',id);
        body.insertBefore(section,node); section.append(node);
        if (node.textContent === 'Solution') {
          const label = document.createElement('div'); label.className='eyebrow-small';label.textContent='Implementation';section.prepend(label);
        }
      } else if (section) section.append(node);
    }
    body.querySelectorAll('section').forEach(s => {if(s.querySelector('.solution-code-card'))s.classList.add('solution-code-section');});
    return '<!doctype html>\n'+document.documentElement.outerHTML;
  });
  return {dir:{input:'.',includes:'_includes',data:'_data',output:'_site'},templateFormats:['md','njk'],markdownTemplateEngine:'njk',htmlTemplateEngine:false};
};
