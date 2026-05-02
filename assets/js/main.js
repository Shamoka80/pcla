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

  const GOOGLE_FORM_ACTION_URL = 'REPLACE_WITH_GOOGLE_FORM_ACTION_URL';
  const GOOGLE_FORM_ENTRY_IDS = {
    parentName: 'REPLACE_WITH_ENTRY_PARENT_NAME',
    email: 'REPLACE_WITH_ENTRY_EMAIL',
    phone: 'REPLACE_WITH_ENTRY_PHONE',
    numberOfChildren: 'REPLACE_WITH_ENTRY_NUMBER_OF_CHILDREN',
    childrenInformation: 'REPLACE_WITH_ENTRY_CHILDREN_INFORMATION',
    preferredLocation: 'REPLACE_WITH_ENTRY_PREFERRED_LOCATION',
    inquiryType: 'REPLACE_WITH_ENTRY_INQUIRY_TYPE',
    message: 'REPLACE_WITH_ENTRY_MESSAGE'
  };

  const childrenCountSelect = document.getElementById('children-count');
  const childrenFieldsContainer = document.getElementById('children-fields');
  const submitButton = document.getElementById('contact-submit');
  const formMessage = document.getElementById('contact-form-message');
  const defaultSubmitText = submitButton ? submitButton.textContent : 'Submit Message';

  const SUCCESS_MESSAGE = 'Thank you. Your message has been successfully submitted. If you do not receive a response from us within 48 hours by phone or email, please contact our office at (843) 225-1004.';
  const ERROR_MESSAGE = 'We were unable to submit your message. Please call Poplar Christian Learning Academy directly at (843) 225-1004.';

  const setMessage = (type, text) => {
    if (!formMessage) return;
    formMessage.className = 'form-message';
    if (!type || !text) {
      formMessage.textContent = '';
      return;
    }
    formMessage.classList.add(type === 'success' ? 'is-success' : 'is-error');
    formMessage.textContent = text;
  };

  const renderChildrenFields = (count) => {
    if (!childrenFieldsContainer) return;
    childrenFieldsContainer.innerHTML = '';

    for (let i = 1; i <= count; i += 1) {
      const row = document.createElement('div');
      row.className = 'child-fields-row';
      row.innerHTML = `
        <div class="form-field">
          <label for="child-name-${i}">Child ${i} Name <span aria-hidden="true">*</span></label>
          <input id="child-name-${i}" name="childName${i}" type="text" autocomplete="off" required />
        </div>
        <div class="form-field">
          <label for="child-age-${i}">Child ${i} Age <span aria-hidden="true">*</span></label>
          <input id="child-age-${i}" name="childAge${i}" type="text" inputmode="numeric" autocomplete="off" required />
        </div>
      `;
      childrenFieldsContainer.appendChild(row);
    }
  };

  const collectChildrenInfo = () => {
    const count = Number(childrenCountSelect.value);
    const details = [];

    for (let i = 1; i <= count; i += 1) {
      const nameInput = form.querySelector(`#child-name-${i}`);
      const ageInput = form.querySelector(`#child-age-${i}`);
      details.push(`Child ${i}: ${nameInput.value.trim()}, Age: ${ageInput.value.trim()}`);
    }

    return details.join('\n');
  };

  renderChildrenFields(Number(childrenCountSelect.value));

  childrenCountSelect.addEventListener('change', () => {
    renderChildrenFields(Number(childrenCountSelect.value));
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    setMessage(null, '');

    if (!form.reportValidity()) return;

    const childrenInformation = collectChildrenInfo();
    const payload = new FormData();
    payload.append(GOOGLE_FORM_ENTRY_IDS.parentName, form.parentName.value.trim());
    payload.append(GOOGLE_FORM_ENTRY_IDS.email, form.email.value.trim());
    payload.append(GOOGLE_FORM_ENTRY_IDS.phone, form.phone.value.trim());
    payload.append(GOOGLE_FORM_ENTRY_IDS.numberOfChildren, form.childrenCount.value);
    payload.append(GOOGLE_FORM_ENTRY_IDS.childrenInformation, childrenInformation);
    payload.append(GOOGLE_FORM_ENTRY_IDS.preferredLocation, form.preferredLocation.value);
    payload.append(GOOGLE_FORM_ENTRY_IDS.inquiryType, form.inquiryType.value);
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
      childrenCountSelect.value = '1';
      renderChildrenFields(1);
    } catch (error) {
      setMessage('error', ERROR_MESSAGE);
      submitButton.disabled = false;
      submitButton.textContent = defaultSubmitText;
      return;
    }

    submitButton.disabled = false;
    submitButton.textContent = defaultSubmitText;
  });
})();
