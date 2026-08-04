'use strict';

const elementToggleFunc = function (elem) {
  if (elem) elem.classList.toggle('active');
};

const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');

if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener('click', function () {
    elementToggleFunc(sidebar);
  });
}

const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');

const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const testimonialsModalFunc = function () {
  if (!modalContainer || !overlay) return;
  modalContainer.classList.toggle('active');
  overlay.classList.toggle('active');
};

for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener('click', function () {
    if (!modalImg || !modalTitle || !modalText) return;

    const avatar = this.querySelector('[data-testimonials-avatar]');
    const title = this.querySelector('[data-testimonials-title]');
    const text = this.querySelector('[data-testimonials-text]');

    if (!avatar || !title || !text) return;

    modalImg.src = avatar.src;
    modalImg.alt = avatar.alt || '';
    modalTitle.innerHTML = title.innerHTML;
    modalText.innerHTML = text.innerHTML;

    testimonialsModalFunc();
  });
}

if (modalCloseBtn) modalCloseBtn.addEventListener('click', testimonialsModalFunc);
if (overlay) overlay.addEventListener('click', testimonialsModalFunc);

const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-selecct-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');

if (select) {
  select.addEventListener('click', function () {
    elementToggleFunc(this);
  });
}

const filterItems = document.querySelectorAll('[data-filter-item]');

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === 'all' || selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add('active');
    } else {
      filterItems[i].classList.remove('active');
    }
  }
};

for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener('click', function () {
    const selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

let lastClickedBtn = filterBtn.length ? filterBtn[0] : null;

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener('click', function () {
    const selectedValue = this.innerText.toLowerCase();

    if (selectValue) selectValue.innerText = this.innerText;

    filterFunc(selectedValue);

    if (lastClickedBtn) lastClickedBtn.classList.remove('active');

    this.classList.add('active');
    lastClickedBtn = this;
  });
}

const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');
const formStatus = document.querySelector('[data-form-status]');

const showFormStatus = function (message, isError = false) {
  if (!formStatus) return;
  formStatus.textContent = message;
  formStatus.classList.toggle('error', isError);
  formStatus.classList.toggle('success', !isError && Boolean(message));
};

const validateContactPayload = function (payload) {
  if (!payload.name || !payload.name.trim()) {
    return { ok: false, message: 'Please enter your full name.' };
  }

  if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return { ok: false, message: 'Please provide a valid email address.' };
  }

  if (!payload.message || !payload.message.trim()) {
    return { ok: false, message: 'Please enter a message before submitting.' };
  }

  return { ok: true, message: 'Your message looks good.' };
};

if (form) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener('input', function () {
      if (form.checkValidity()) {
        formBtn?.removeAttribute('disabled');
        showFormStatus('');
      } else {
        formBtn?.setAttribute('disabled', '');
      }
    });
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const payload = {
      name: (form.querySelector('[name="fullname"]')?.value || '').trim(),
      email: (form.querySelector('[name="email"]')?.value || '').trim(),
      phone: (form.querySelector('[name="phone"]')?.value || '').trim(),
      message: (form.querySelector('[name="message"]')?.value || '').trim()
    };

    const validation = validateContactPayload(payload);
    if (!validation.ok) {
      showFormStatus(validation.message, true);
      return;
    }

    showFormStatus('Sending your message...', false);

    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(async function (response) {
        const result = await response.json().catch(function () {
          return { ok: false, message: 'Could not parse server response.' };
        });

        if (!response.ok || !result.ok) {
          throw new Error(result.message || 'Could not send your message.');
        }

        form.reset();
        formBtn?.setAttribute('disabled', '');
        showFormStatus(result.message, false);
      })
      .catch(function (error) {
        showFormStatus(error.message || 'Something went wrong while sending your message. Please try again or use the direct email link.', true);
      });
  });
}

const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener('click', function () {
    const currentPage = this.textContent.trim().toLowerCase();

    for (let j = 0; j < pages.length; j++) {
      if (currentPage === pages[j].dataset.page) {
        pages[j].classList.add('active');
        navigationLinks[j]?.classList.add('active');
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove('active');
        navigationLinks[j]?.classList.remove('active');
      }
    }
  });
}