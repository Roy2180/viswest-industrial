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

const cfg = window.VISWEST_CONFIG || { demoMode: true };
const modal = document.querySelector('#demo-modal');
const modalMessage = document.querySelector('#modal-message');
const modalClose = document.querySelector('.modal-close');
const modalOk = document.querySelector('.modal-ok');

function showModal(message) {
  if (!modal) return;
  modalMessage.textContent = message;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  modalOk?.focus();
}
function closeModal() {
  if (!modal) return;
  modal.hidden = true;
  document.body.style.overflow = '';
}
modalClose?.addEventListener('click', closeModal);
modalOk?.addEventListener('click', closeModal);
modal?.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal?.hidden) closeModal(); });

function validateForm(form, note) {
  if (!form.checkValidity()) {
    form.reportValidity();
    note.textContent = 'Please complete the required fields before continuing.';
    note.className = 'form-note error';
    return false;
  }
  note.textContent = 'Details checked successfully.';
  note.className = 'form-note success';
  return true;
}

async function handleForm(formId, noteId, endpointKey, typeLabel) {
  const form = document.querySelector(formId);
  const note = document.querySelector(noteId);
  if (!form || !note) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!validateForm(form, note)) return;

    const endpoint = cfg[endpointKey];
    if (cfg.demoMode || !endpoint) {
      showModal(`Your ${typeLabel} form is complete. This pre-launch version validated the information, but nothing was sent or stored. When VisWest is registered, the same form can be activated by changing the secure endpoint in config.js.`);
      return;
    }

    try {
      note.textContent = 'Sending…';
      note.className = 'form-note';
      const data = new FormData(form);
      const response = await fetch(endpoint, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } });
      if (!response.ok) throw new Error('Submission failed');
      form.reset();
      note.textContent = 'Thank you. Your details were sent successfully.';
      note.className = 'form-note success';
      showModal(`Thank you. Your ${typeLabel} details were sent successfully.`);
    } catch (err) {
      note.textContent = 'We could not send the form. Please try again later.';
      note.className = 'form-note error';
    }
  });
}

handleForm('#workforce-form', '#workforce-note', 'workforceEndpoint', 'workforce interest');
handleForm('#client-form', '#client-note', 'clientEndpoint', 'client enquiry');
