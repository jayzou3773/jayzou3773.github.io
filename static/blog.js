// Keep the original article's switchDemo function and visualization intact.
const demoButtons = [...document.querySelectorAll('#demo-buttons button')];
for (const [index, button] of demoButtons.entries()) {
  button.setAttribute('aria-pressed', String(index === 0));
  button.addEventListener('click', () => {
    for (const other of demoButtons) other.setAttribute('aria-pressed', String(other === button));
  });
}
const demoFrame = document.querySelector('#demo-frame');
if (demoFrame) demoFrame.title = 'Interactive organized group behavior model';
for (const link of document.querySelectorAll('a[target="_blank"]')) {
  link.rel = 'noopener noreferrer';
}
