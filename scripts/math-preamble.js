// Shared Mathematics-note preamble. Add reusable KaTeX macros here.
const macros = {
  '\\R': '\\mathbb{R}',
  '\\N': '\\mathbb{N}',
  '\\Z': '\\mathbb{Z}',
  '\\Q': '\\mathbb{Q}',
  '\\C': '\\mathbb{C}',
  '\\vect': '\\mathbf{#1}',
  '\\norm': '\\left\\lVert #1 \\right\\rVert',
};
const environments = {
  definition: 'Definition', lemma: 'Lemma', proposition: 'Proposition',
  theorem: 'Theorem', remark: 'Remark',
};
function theoremPlugin(md) {
  md.block.ruler.before('fence', 'theorem-environment', (state, start, end, silent) => {
    const line = n => state.src.slice(state.bMarks[n] + state.tShift[n], state.eMarks[n]).trim();
    const match = /^:::\s*(definition|lemma|proposition|theorem|remark)(?:\s+(.+))?$/.exec(line(start));
    if (!match) return false;
    if (silent) return true;
    let close = start + 1, depth = 1;
    for (; close < end; close++) {
      if (/^:::\s*(definition|lemma|proposition|theorem|remark)(?:\s|$)/.test(line(close))) depth++;
      else if (line(close) === ':::') { if (--depth === 0) break; }
    }
    if (close === end) throw new Error(`Unclosed ${match[1]} environment at line ${start + 1}`);
    const kind = match[1];
    const heading = match[2] || '';
    const numbered = /^\[([0-9]+(?:\.[0-9]+)*)\]\s*(.*)$/.exec(heading);
    const counters = state.env.theoremCounters ||= {};
    const number = counters[kind] = (counters[kind] || 0) + 1;
    const opening = state.push('theorem_open', 'aside', 1);
    opening.block = true;
    opening.meta = {kind, number: numbered ? numbered[1] : number, title: numbered ? numbered[2] : heading};
    state.md.block.tokenize(state, start + 1, close);
    state.push('theorem_close', 'aside', -1).block = true;
    state.line = close + 1;
    return true;
  });
  md.renderer.rules.theorem_open = (tokens, i) => {
    const {kind, number, title} = tokens[i].meta;
    const label = `${environments[kind]} ${number}${title ? ` (${title})` : ''}`;
    return `<aside class="math-statement math-${kind}" aria-label="${md.utils.escapeHtml(label)}"><p class="math-statement-title">${md.utils.escapeHtml(label)}</p>\n`;
  };
  md.renderer.rules.theorem_close = () => '</aside>\n';
}
module.exports = {macros, environments, theoremPlugin};
