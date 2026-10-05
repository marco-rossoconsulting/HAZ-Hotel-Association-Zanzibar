/**
 * Netlify Forms with progressive enhancement.
 * Without JavaScript the form posts normally and Netlify redirects to the form's action page.
 * With JavaScript we submit in the background and show an inline confirmation.
 */
const forms = document.querySelectorAll<HTMLFormElement>('form[data-netlify-ajax]');

forms.forEach((form) => {
  const status = form.querySelector<HTMLElement>('[data-form-status]');
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');

  form.addEventListener('submit', async (event) => {
    if (!form.checkValidity()) return; // let the browser show native messages
    event.preventDefault();
    const data = new FormData(form);
    const body = new URLSearchParams();
    data.forEach((value, key) => {
      if (typeof value === 'string') body.append(key, value);
    });
    const label = button?.innerHTML;
    if (button) {
      button.disabled = true;
      button.textContent = 'Sending…';
    }
    try {
      const multipart = form.enctype === 'multipart/form-data';
      const res = await fetch('/', multipart
        ? { method: 'POST', body: data }
        : { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString() });
      if (!res.ok) throw new Error(String(res.status));
      const success = form.dataset.success ?? 'Thank you. We have received your message.';
      form.classList.add('is-sent');
      if (status) {
        status.textContent = success;
        status.dataset.state = 'success';
        status.focus();
      }
      form.reset();
    } catch {
      if (status) {
        status.textContent = 'Sorry, that did not send. Please try again, or email info@haz.or.tz.';
        status.dataset.state = 'error';
        status.focus();
      }
    } finally {
      if (button && label) {
        button.disabled = false;
        button.innerHTML = label;
      }
    }
  });
});
