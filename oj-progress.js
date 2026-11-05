// Published solution rows determine progress; keep numeric ordering as new notes are added.
document.querySelectorAll('.project-list').forEach(list => {
  const rows = [...list.querySelectorAll(':scope > [data-problem-id]')];
  rows.sort((a, b) => Number(a.dataset.problemId) - Number(b.dataset.problemId));
  rows.forEach(row => list.append(row));
});
document.querySelectorAll('[data-progress-platform]').forEach(panel => {
  const solved = document.querySelectorAll('.project-list [data-problem-id]').length;
  const chart = panel.querySelector('[role="img"]');
  const total = Number(panel.querySelector('.oj-progress-center span').textContent.replace(/[^0-9]/g, ''));
  // A zero-entry platform is valid and remains an empty ring.
  panel.querySelector('.oj-progress-fill').setAttribute('stroke-dasharray', `${solved / total * 100} 100`);
  panel.querySelector('.oj-progress-center strong').textContent = solved;
  panel.querySelector('h2').textContent = `${solved} / ${total.toLocaleString('en-US')} problems`;
  panel.querySelector('.oj-progress-legend').innerHTML = `<span>Published solutions · ${solved}</span><span>Remaining · ${(total - solved).toLocaleString('en-US')}</span>`;
  chart.setAttribute('aria-label', `${solved} published solutions out of ${total} problems`);
});
