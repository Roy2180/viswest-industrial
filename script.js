const menuButton = document.querySelector('.menu-btn');
const nav = document.querySelector('.site-nav');

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const form = document.querySelector('#interest-form');
const note = document.querySelector('#form-note');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  note.textContent = 'Draft only — submissions are disabled until VisWest is formally established and a privacy process is in place.';
  note.setAttribute('role', 'status');
});
