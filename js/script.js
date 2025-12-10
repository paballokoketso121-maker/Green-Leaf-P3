/* Main site JS: navigation, accordion, lightbox, search, contact form, simple cart */
(function () {
  'use strict';

  // helpers
  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  // set years
  const y = new Date().getFullYear();
  $('#year') && ($('#year').textContent = y);
  $('#year2') && ($('#year2').textContent = y);
  $('#year3') && ($('#year3').textContent = y);
  $('#year4') && ($('#year4').textContent = y);
  $('#year5') && ($('#year5').textContent = y);
  $('#year6') && ($('#year6').textContent = y);
  $('#year7') && ($('#year7').textContent = y);
  $('#year8') && ($('#year8').textContent = y);

  // Hamburger toggles
  $$('.hamburger').forEach(btn => {
    btn.addEventListener('click', () => {
      const nav = document.getElementById('main-nav');
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if (nav) nav.classList.toggle('open');
    });
  });

  // Daily tip
  const dailyTipEl = document.getElementById('daily-tip');
  if (dailyTipEl) {
    const tips = [
      "Buy seasonal produce — better taste and price.",
      "Store herbs wrapped in a damp paper towel to keep them fresh longer.",
      "Rinse root vegetables only when you're ready to use them to extend shelf life.",
      "Swap one processed snack for fresh fruit this week."
    ];
    dailyTipEl.textContent = tips[Math.floor(Math.random() * tips.length)];
  }

  // Accordion
  $$('.accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('aria-controls');
      const panel = document.getElementById(id);
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if (panel) panel.hidden = expanded;
    });
  });

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbCaption = document.getElementById('lightbox-caption');
  const lbClose = document.getElementById('lightbox-close');

  $$('.gallery-img').forEach(img => {
    img.addEventListener('click', () => {
      lbImg.src = img.src;
      lbImg.alt = img.alt || '';
      lbCaption.textContent = img.dataset.caption || '';
      lightbox.hidden = false;
      lightbox.setAttribute('aria-hidden', 'false');
      lbClose.focus();
    });
    img.setAttribute('tabindex', '0');
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') img.click();
    });
  });

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    lightbox.setAttribute('aria-hidden', 'true');
    lbImg.src = '';
  }
  lbClose && lbClose.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && !lightbox.hidden) closeLightbox();
  });

  // Search + suggestions
  (function initSearch() {
    const products = [
      "Tomatoes","Spinach","Cucumber","Apples","Herbs","Potatoes","Carrots","Lettuce","Bananas","Peppers"
    ];
    const input = document.getElementById('searchInput');
    const suggestions = document.getElementById('suggestions');
    const results = document.getElementById('searchResults');
    if (!input) return;

    function renderSuggestions(list) {
      suggestions.innerHTML = '';
      if (!list.length) return;
      const ul = document.createElement('ul');
      list.slice(0,6).forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        li.tabIndex = 0;
        li.addEventListener('click', () => { input.value = item; doSearch(item); suggestions.innerHTML = ''; });
        li.addEventListener('keydown', (e) => { if (e.key === 'Enter') li.click(); });
        ul.appendChild(li);
      });
      suggestions.appendChild(ul);
    }

    function doSearch(q) {
      const term = (q || input.value || '').toString().trim().toLowerCase();
      if (!term) {
        results.innerHTML = '<p>Please enter a search term.</p>';
        return;
      }
      const matched = products.filter(p => p.toLowerCase().includes(term));
      if (!matched.length) results.innerHTML = '<p>No results found.</p>';
      else results.innerHTML = matched.map(m => `<div class="card">${m}</div>`).join('');
    }

    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      if (!q) { suggestions.innerHTML = ''; results && (results.innerHTML = ''); return; }
      const matched = products.filter(p => p.toLowerCase().includes(q));
      renderSuggestions(matched);
    });
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') doSearch(); });
  })();

  // Tabs (if any)
  $$( '[role="tab"]' ).forEach(btn => {
    btn.addEventListener('click', () => {
      $$( '[role="tab"]' ).forEach(b => b.setAttribute('aria-selected','false'));
      btn.setAttribute('aria-selected','true');
      $$( '[role="tabpanel"]' ).forEach(p => p.hidden = true);
      const id = btn.getAttribute('aria-controls');
      const panel = document.getElementById(id);
      if (panel) panel.hidden = false;
    });
  });

  // Contact form submit via fetch with client validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const statusEl = document.getElementById('formStatus');
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      statusEl.textContent = '';
      const fd = new FormData(contactForm);
      const name = (fd.get('name') || '').toString().trim();
      const email = (fd.get('email') || '').toString().trim();
      const message = (fd.get('message') || '').toString().trim();
      if (!name || !email || !message) {
        statusEl.textContent = 'Please fill in all required fields.';
        return;
      }
      const emailRE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRE.test(email)) { statusEl.textContent = 'Please enter a valid email address.'; return; }

      statusEl.textContent = 'Sending...';
      fetch(contactForm.action, { method: 'POST', body: fd })
        .then(res => res.text())
        .then(txt => { statusEl.textContent = txt || 'Message sent successfully!'; contactForm.reset(); })
        .catch(err => { console.error(err); statusEl.textContent = 'There was an error sending your message.'; });
    });
  }

  // Add-to-cart quick visual feedback
  $$('.add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const label = btn.dataset.product || 'Item';
      btn.textContent = 'Added ✓';
      btn.disabled = true;
      setTimeout(() => { btn.textContent = 'Add to cart'; btn.disabled = false; }, 1200);
      // TODO: integrate real cart / storage
    });
  });

})();