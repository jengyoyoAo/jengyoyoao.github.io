document.querySelectorAll('[data-code-switcher]').forEach((switcher) => {
  const tabs = [...switcher.querySelectorAll('[role="tab"]')];
  const copyButton = switcher.querySelector('[data-copy-code]');
  const copyStatus = switcher.querySelector('[data-copy-status]');
  let feedbackTimer;

  function activateTab(tab, moveFocus = false) {
    for (const item of tabs) {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
    }

    if (moveFocus) tab.focus();
  }

  for (const [index, tab] of tabs.entries()) {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', (event) => {
      let nextIndex;

      if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') nextIndex = 0;
      else if (event.key === 'End') nextIndex = tabs.length - 1;
      else return;

      event.preventDefault();
      activateTab(tabs[nextIndex], true);
    });
  }

  copyButton?.addEventListener('click', async () => {
    const selectedTab = tabs.find((tab) => tab.getAttribute('aria-selected') === 'true');
    const panel = document.getElementById(selectedTab.getAttribute('aria-controls'));
    const code = panel.querySelector('code');
    const text = `${code.textContent.replace(/\n+$/, '')}\n`;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        copyWithFallback(text);
      }
      announceCopy('Copied!', `${selectedTab.textContent} code copied to clipboard.`);
    } catch {
      try {
        copyWithFallback(text);
        announceCopy('Copied!', `${selectedTab.textContent} code copied to clipboard.`);
      } catch {
        announceCopy('Copy failed', 'Could not copy. Select the code and copy it manually.');
      }
    }
  });

  function announceCopy(buttonText, statusText) {
    copyButton.textContent = buttonText;
    copyStatus.textContent = statusText;
    window.clearTimeout(feedbackTimer);
    feedbackTimer = window.setTimeout(() => {
      copyButton.textContent = 'Copy';
      copyStatus.textContent = '';
    }, 1600);
  }
});

function copyWithFallback(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.append(textarea);
  textarea.select();
  const copied = document.execCommand('copy');
  textarea.remove();
  if (!copied) throw new Error('Clipboard copy failed.');
}
