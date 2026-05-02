(() => {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('primary-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open', !expanded);
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
    });
  });
})();

(() => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeRxqGJbIOWbt7Z-Wb_sYaA6DTj1smxrAMXlcFZi53UfdmIyQ/formResponse';
  const GOOGLE_FORM_ENTRY_IDS = {
    parentName: 'entry.1209008278',
    email: 'entry.1662912245',
    phone: 'entry.972912350',
    numberOfChildren: 'entry.74903763',
    childrenInformation: 'entry.1984705636',
    preferredLocation: 'entry.188894792',
    inquiryType: 'entry.1026874148',
    message: 'entry.452556170'
  };

  const childrenCountInput = document.getElementById('children-count');
  const childrenFieldsContainer = document.getElementById('children-fields');
  const submitButton = document.getElementById('contact-submit');
  const formMessage = document.getElementById('contact-form-message');
  if (!childrenCountInput || !childrenFieldsContainer || !submitButton || !formMessage) return;

  const defaultSubmitText = submitButton.textContent || 'Submit Message';
  const SUCCESS_MESSAGE = 'Thank you. Your message has been successfully submitted. If you do not receive a response from us within 48 hours by phone or email, please contact our office at (843) 225-1004.';
  const ERROR_MESSAGE = 'We were unable to submit your message. Please call Poplar Christian Learning Academy directly at (843) 225-1004.';

  const setMessage = (type, text) => {
    formMessage.className = 'form-message';
    formMessage.textContent = text || '';
    if (!type || !text) return;
    formMessage.classList.add(type === 'success' ? 'is-success' : 'is-error');
  };

  const getChildrenCount = () => {
    const parsed = Number.parseInt(childrenCountInput.value, 10);
    const safeCount = Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
    if (String(safeCount) !== childrenCountInput.value) {
      childrenCountInput.value = String(safeCount);
    }
    return safeCount;
  };

  const renderChildrenFields = (count) => {
    const previousValues = new Map();
    childrenFieldsContainer.querySelectorAll('.child-fields-row').forEach((row) => {
      const index = row.dataset.childIndex;
      const nameInput = row.querySelector('[data-child-name]');
      const ageInput = row.querySelector('[data-child-age]');
      previousValues.set(index, {
        name: nameInput ? nameInput.value : '',
        age: ageInput ? ageInput.value : ''
      });
    });

    childrenFieldsContainer.innerHTML = '';

    for (let i = 1; i <= count; i += 1) {
      const previous = previousValues.get(String(i)) || { name: '', age: '' };
      const row = document.createElement('div');
      row.className = 'child-fields-row';
      row.dataset.childIndex = String(i);
      row.innerHTML = `
        <div class="form-field">
          <label for="child-name-${i}">Child ${i} Name <span aria-hidden="true">*</span></label>
          <input id="child-name-${i}" name="childName${i}" data-child-name type="text" autocomplete="off" required value="${previous.name.replace(/"/g, '&quot;')}" />
        </div>
        <div class="form-field">
          <label for="child-age-${i}">Child ${i} Age <span aria-hidden="true">*</span></label>
          <input id="child-age-${i}" name="childAge${i}" data-child-age type="number" min="0" step="1" inputmode="numeric" autocomplete="off" required value="${previous.age.replace(/"/g, '&quot;')}" />
        </div>
      `;
      childrenFieldsContainer.appendChild(row);
    }
  };

  const collectChildrenInfo = (count) => {
    const details = [];
    for (let i = 1; i <= count; i += 1) {
      const nameInput = form.querySelector(`#child-name-${i}`);
      const ageInput = form.querySelector(`#child-age-${i}`);
      const name = nameInput ? nameInput.value.trim() : '';
      const age = ageInput ? ageInput.value.trim() : '';
      if (!name || !age) return null;
      details.push(`Child ${i}: ${name}, Age: ${age}`);
    }
    return details.join('\n');
  };

  renderChildrenFields(getChildrenCount());

  childrenCountInput.addEventListener('input', () => {
    renderChildrenFields(getChildrenCount());
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    setMessage(null, '');

    const childCount = getChildrenCount();
    renderChildrenFields(childCount);

    if (!form.reportValidity()) return;

    const childrenInformation = collectChildrenInfo(childCount);
    if (!childrenInformation) {
      setMessage('error', ERROR_MESSAGE);
      return;
    }

    const payload = new FormData();
    payload.append(GOOGLE_FORM_ENTRY_IDS.parentName, form.parentName.value.trim());
    payload.append(GOOGLE_FORM_ENTRY_IDS.email, form.email.value.trim());
    payload.append(GOOGLE_FORM_ENTRY_IDS.phone, form.phone.value.trim());
    payload.append(GOOGLE_FORM_ENTRY_IDS.numberOfChildren, String(childCount));
    payload.append(GOOGLE_FORM_ENTRY_IDS.childrenInformation, childrenInformation);
    payload.append(GOOGLE_FORM_ENTRY_IDS.preferredLocation, form.preferredLocation.value.trim());
    payload.append(GOOGLE_FORM_ENTRY_IDS.inquiryType, form.inquiryType.value.trim());
    payload.append(GOOGLE_FORM_ENTRY_IDS.message, form.message.value.trim());

    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';

    try {
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: payload
      });
      setMessage('success', SUCCESS_MESSAGE);
      form.reset();
      childrenCountInput.value = '1';
      renderChildrenFields(1);
    } catch (error) {
      setMessage('error', ERROR_MESSAGE);
    }

    submitButton.disabled = false;
    submitButton.textContent = defaultSubmitText;
  });
})();

(() => {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { reveals.forEach((el) => el.classList.add('is-visible')); return; }
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); obs.unobserve(entry.target); } });
  }, { threshold: 0.15 });
  reveals.forEach((el) => observer.observe(el));
})();
