document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderMathInElement !== 'function') return;
  const article = document.querySelector('.solution-article');
  if (article) renderMathInElement(article, {throwOnError: true});
});
