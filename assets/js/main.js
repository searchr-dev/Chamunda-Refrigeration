/* ============================================
   CHAMUNDA REFRIGERATION — main.js
   Barba.js page transitions + UI logic
   ============================================ */

// ── INLINE DATA FALLBACK (works with file:// protocol) ──
const INLINE_DATA = {
  "company": {
    "name": "Chamunda Refrigeration",
    "tagline": "Premium Cooling. Elite Comfort.",
    "description": "Experience the ultimate in residential and commercial cooling. With 6+ years of certified excellence, we deliver rapid, reliable AC solutions that keep your space perfectly chilled.",
    "phone": "9484821494",
    "email": "chamundarefrigeration@gmail.com",
    "address": {
      "line1": "F-203, Prahlad Residency",
      "line2": "Nr. Mevada Green Party Plot",
      "city": "New Naroda, Ahmedabad",
      "pincode": "382330",
      "state": "Gujarat, India"
    },
    "experience": "6+",
    "projectsDone": "1200+",
    "happyClients": "900+",
    "rating": "4.9"
  },
  "services": [
    {
      "id": "installation",
      "icon": "hvac",
      "title": "AC Installation",
      "short": "Expert fitting for all brands & tons",
      "description": "Professional installation of split, window, cassette, and inverter ACs. We handle all brands — Daikin, Voltas, LG, Samsung, Hitachi, and more. Proper copper piping, bracket mounting, and gas charging included.",
      "features": ["All brands supported", "Same-day installation", "Warranty on workmanship", "Free site inspection"],
      "price": "Starting ₹799"
    },
    {
      "id": "repair",
      "icon": "build",
      "title": "AC Repair & Service",
      "short": "Fast diagnostics, lasting fixes",
      "description": "From compressor failures to PCB faults, we diagnose and fix all AC issues with precision. Our technicians carry original-grade spare parts for quick, reliable repairs that last.",
      "features": ["90-day repair warranty", "Genuine spare parts", "Emergency call-out", "Transparent billing"],
      "price": "Starting ₹299"
    },
    {
      "id": "gas-refilling",
      "icon": "gas_meter",
      "title": "Gas Refilling (Regassing)",
      "short": "R22, R32, R410A & all refrigerants",
      "description": "If your AC isn't cooling properly, low refrigerant might be the cause. We offer precise gas filling using calibrated gauges — no overcharging, no shortcuts. All refrigerant types handled.",
      "features": ["Leak check included", "Pressure testing", "All refrigerant types", "Eco-friendly disposal"],
      "price": "Starting ₹999"
    },
    {
      "id": "deep-cleaning",
      "icon": "cleaning_services",
      "title": "Deep Cleaning & Sanitization",
      "short": "Bacteria-free, allergen-free air",
      "description": "Foam jet cleaning of indoor unit, outdoor unit, filters, evaporator coil, and drain pan. Anti-bacterial treatment kills mold and allergens. Your AC runs 15–20% more efficiently after a deep clean.",
      "features": ["Foam jet technology", "Anti-bacterial spray", "Filter washing", "Drain line flush"],
      "price": "Starting ₹499"
    },
    {
      "id": "amc",
      "icon": "verified_user",
      "title": "AMC – Annual Maintenance",
      "short": "Year-round protection plans",
      "description": "Our Annual Maintenance Contracts cover scheduled servicing, priority breakdowns, and discounted parts replacement. Residential and commercial plans available. Peace of mind, all year long.",
      "features": ["2–4 service visits/year", "Priority response", "Parts discount 20%", "Free checkups"],
      "price": "From ₹1,499/year"
    },
    {
      "id": "commercial",
      "icon": "factory",
      "title": "Commercial HVAC",
      "short": "Offices, shops & industrial units",
      "description": "We service cassette ACs, central air conditioning, ductable units, and VRF/VRV systems for commercial spaces. Scheduled maintenance contracts for offices, restaurants, hospitals, and factories.",
      "features": ["Ductable & cassette AC", "VRF/VRV systems", "Chiller maintenance", "24/7 contract support"],
      "price": "Custom Quote"
    }
  ],
  "testimonials": [
    {
      "name": "Rakesh Patel",
      "location": "Naroda, Ahmedabad",
      "rating": 5,
      "text": "Same-day repair service was absolutely brilliant. Technician arrived within 2 hours, diagnosed the issue quickly, and fixed it at a fair price. Highly recommended!"
    },
    {
      "name": "Priya Shah",
      "location": "Chandkheda, Ahmedabad",
      "rating": 5,
      "text": "Took an AMC plan for my 2 ACs. The cleaning visit made a huge difference — AC cools much faster now and electricity bill dropped noticeably. Very professional team."
    },
    {
      "name": "Mehul Desai",
      "location": "New Naroda, Ahmedabad",
      "rating": 5,
      "text": "Gas refilling was done properly with pressure gauge, not guesswork. First time someone explained the whole process to me. Trustworthy service!"
    }
  ],
  "whyUs": [
    { "icon": "verified", "title": "Certified Technicians", "desc": "All our staff are trained, certified, and background-verified professionals." },
    { "icon": "schedule", "title": "On-Time Service", "desc": "We value your time. Technicians arrive within the scheduled window, every time." },
    { "icon": "currency_rupee", "title": "Transparent Pricing", "desc": "No hidden charges. You get a quote before any work begins." },
    { "icon": "star", "title": "6+ Years Experience", "desc": "Over 1,200 successful jobs across Ahmedabad and surrounding areas." }
  ]
};

// ── GLOBAL DATA ──
let appData = null;

// ── LOAD DATA (inline fallback if fetch fails) ──
async function loadData() {
  const isInSubfolder = window.location.pathname.includes('/pages/');
  const dataPath = isInSubfolder ? '../assets/data/data.json' : 'assets/data/data.json';
  try {
    const res = await fetch(dataPath);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    appData = await res.json();
    return appData;
  } catch (e) {
    // file:// protocol or network error — use inline data
    appData = INLINE_DATA;
    return appData;
  }
}

// ── NAVBAR ──
let navInitialized = false;
function initNav() {
  // Always update active link highlighting on every page change
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href')?.split('/').pop() || '';
    if (href === currentPage || (currentPage === '' && href === 'index.html') ||
      (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  if (navInitialized) return; // Prevent duplicating event listeners

  const nav = document.querySelector('nav');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    document.querySelector('nav')?.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  hamburger?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    const spans = hamburger.querySelectorAll('span');
    if (spans.length >= 3) {
      spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
      spans[1].style.opacity = isOpen ? '0' : '1';
      spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
    }
  });

  // Close mobile menu on nav link click
  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger?.setAttribute('aria-expanded', 'false');
      const spans = hamburger?.querySelectorAll('span');
      if (spans && spans.length >= 3) {
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
      }
    });
  });

  navInitialized = true;
}

// ── SCROLL ANIMATIONS ──
let scrollObserver = null;
function initScrollAnimations() {
  if (scrollObserver) {
    scrollObserver.disconnect();
  }
  scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.09, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => scrollObserver.observe(el));
}

// ── RENDER HOME ──
function renderHome(data) {
  const c = data.company;

  // Stats
  document.querySelectorAll('[data-stat]').forEach(el => {
    const key = el.dataset.stat;
    if (c[key] !== undefined) el.textContent = c[key];
  });

  // Desc
  const descEl = document.querySelector('[data-desc]');
  if (descEl) descEl.textContent = c.description;

  // Why Us cards
  const whyGrid = document.getElementById('why-grid');
  if (whyGrid && data.whyUs) {
    whyGrid.innerHTML = data.whyUs.map((item, i) => `
      <div class="why-card fade-up delay-${i + 1}">
        <div class="why-card-num">0${i + 1}</div>
        <div class="icon">
          <span class="material-symbols-outlined">${item.icon}</span>
        </div>
        <h4>${item.title}</h4>
        <p>${item.desc}</p>
      </div>
    `).join('');
    initScrollAnimations();
  }

  // Services preview (first 3)
  const servicesPreview = document.getElementById('services-preview');
  if (servicesPreview && data.services) {
    servicesPreview.innerHTML = data.services.slice(0, 3).map((s, i) => `
      <div class="service-card fade-up delay-${i + 1}" onclick="window.location.href='${window.location.pathname.includes('/pages/') ? '' : 'pages/'}services.html'">
        <div class="service-card-top">
          <div class="service-icon">
            <span class="material-symbols-outlined">${s.icon}</span>
          </div>
          <div class="service-price-tag">${s.price}</div>
        </div>
        <h3>${s.title}</h3>
        <p class="service-short">${s.short}</p>
        <p class="service-desc">${s.description}</p>
        <ul class="service-features">
          ${s.features.slice(0, 3).map(f => `<li><span class="material-symbols-outlined">check_circle</span>${f}</li>`).join('')}
        </ul>
        <div class="service-cta">
          <span>Book Now</span>
          <span class="material-symbols-outlined">arrow_forward</span>
        </div>
      </div>
    `).join('');
    initScrollAnimations();
  }

  // Testimonials
  const testGrid = document.getElementById('testimonials-grid');
  if (testGrid && data.testimonials) {
    testGrid.innerHTML = data.testimonials.map((t, i) => `
      <div class="testimonial-card fade-up delay-${i + 1}">
        <div class="stars">${'<span class="material-symbols-outlined">star</span>'.repeat(t.rating)}</div>
        <p class="testimonial-text">"${t.text}"</p>
        <div class="testimonial-author">
          <div class="author-avatar">${t.name.charAt(0)}</div>
          <div>
            <div class="author-name">${t.name}</div>
            <div class="author-loc">${t.location}</div>
          </div>
        </div>
      </div>
    `).join('');
    initScrollAnimations();
  }
}

// ── RENDER SERVICES PAGE ──
function renderServices(data) {
  const grid = document.getElementById('all-services-grid');
  if (!grid || !data?.services) return;

  grid.innerHTML = data.services.map((s, i) => `
    <div class="service-card fade-up delay-${(i % 3) + 1}">
      <div class="service-card-top">
        <div class="service-icon">
          <span class="material-symbols-outlined">${s.icon}</span>
        </div>
        <div class="service-price-tag">${s.price}</div>
      </div>
      <h3>${s.title}</h3>
      <p class="service-short">${s.short}</p>
      <p class="service-desc">${s.description}</p>
      <ul class="service-features">
        ${s.features.map(f => `<li><span class="material-symbols-outlined">check_circle</span>${f}</li>`).join('')}
      </ul>
      <div class="service-cta">
        <a href="tel:9484821494">
          <span>Book This Service</span>
          <span class="material-symbols-outlined">call</span>
        </a>
      </div>
    </div>
  `).join('');

  initScrollAnimations();
}

// ── RENDER CONTACT PAGE ──
function renderContact(data) {
  const c = data?.company;
  if (!c) return;

  document.querySelectorAll('[data-phone]').forEach(el => {
    el.textContent = c.phone;
    if (el.tagName === 'A') el.href = `tel:${c.phone}`;
  });

  const a = c.address;
  document.querySelectorAll('[data-address]').forEach(el => {
    el.textContent = `${a.line1}, ${a.line2}, ${a.city} – ${a.pincode}`;
  });

  const serviceSelect = document.getElementById('service-select');
  if (serviceSelect && data.services) {
    serviceSelect.innerHTML = `<option value="">Select a service...</option>` +
      data.services.map(s => `<option value="${s.id}">${s.title}</option>`).join('');
  }

  const dateInput = document.getElementById('f-date');
  if (dateInput) {
    dateInput.min = new Date().toISOString().split('T')[0];
  }

  const form = document.getElementById('contact-form');
  if (form) {
    // Clone form to remove existing listeners to prevent duplicate triggers
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);

    newForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('f-name')?.value.trim() || '';
      const phone = document.getElementById('f-phone')?.value.trim() || '';
      const model = document.getElementById('f-model')?.value.trim() || '';
      const date = document.getElementById('f-date')?.value || '';
      const msg = document.getElementById('f-msg')?.value.trim() || '';

      let text = `Hello Chamunda Refrigeration,\n`;
      text += `I found your website and would like to book a service.\n\n`;
      text += `*Booking Details:*\n`;
      text += `- Name: ${name}\n`;
      text += `- Phone: ${phone}\n`;
      if (model) text += `- AC Model: ${model}\n`;
      if (date) text += `- Preferred Date: ${date}\n`;
      if (msg) text += `- Message: ${msg}\n`;
      text += `\nPlease let me know when we can schedule this.`;

      const waUrl = `https://wa.me/919484821494?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank');

      showToast('✓ Redirecting to WhatsApp!');
      newForm.reset();
    });
  }
}

// ── TOAST ──
function showToast(msg) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="material-symbols-outlined">check_circle</span>${msg}`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// ── BARBA.JS SETUP ──
function initBarba() {
  if (typeof barba === 'undefined') return;

  barba.init({
    transitions: [{
      name: 'premium-shutter-transition',
      async leave(data) {
        const done = this.async();

        // 1. Fade out current content
        gsap.to(data.current.container, { opacity: 0, y: 30, duration: 0.5, ease: 'power2.inOut' });

        // 2. Shutters close (slide UP from bottom)
        gsap.to('.shutter-layer', {
          y: '0%',
          duration: 0.8,
          ease: 'power4.inOut',
          stagger: 0.1,
          onComplete: () => {
            // 3. Show logo once shutters are closed
            gsap.fromTo('.transition-content',
              { opacity: 0, scale: 0.8, y: 20 },
              { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power2.out', onComplete: done }
            );
          }
        });
      },
      async enter(data) {
        // Prepare next container
        gsap.set(data.next.container, { opacity: 0, y: 30 });

        // 4. Logo fades out
        await gsap.to('.transition-content', { opacity: 0, scale: 1.1, duration: 0.4, delay: 0.2 });

        // 5. Shutters open (reveal content)
        gsap.to('.shutter-layer', {
          y: '-100%',
          duration: 0.9,
          ease: 'power4.inOut',
          stagger: 0.1,
          onComplete: () => {
            // Reset for next time
            gsap.set('.shutter-layer', { y: '100%' });

            // 6. Reveal new page content and hero text
            gsap.to(data.next.container, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });

            const reveals = data.next.container.querySelectorAll('.reveal-inner');
            if (reveals.length) {
              gsap.to(reveals, {
                y: 0,
                duration: 1,
                ease: 'power4.out',
                stagger: 0.12,
                delay: 0.1
              });
            }
          }
        });
      }
    }],
    views: [
      { namespace: 'home', afterEnter() { initPage('home'); } },
      { namespace: 'services', afterEnter() { initPage('services'); } },
      { namespace: 'contact', afterEnter() { initPage('contact'); } }
    ]
  });

  barba.hooks.afterEnter(() => {
    initNav();
    initScrollAnimations();
    window.scrollTo(0, 0);
  });
}

// ── PAGE INIT ──
async function initPage(page) {
  if (!appData) appData = await loadData();
  if (!appData) return;

  const p = page || document.body.dataset.page;
  if (p === 'home') renderHome(appData);
  if (p === 'services') renderServices(appData);
  if (p === 'contact') renderContact(appData);
}

// ── BOOT ──
document.addEventListener('DOMContentLoaded', async () => {
  // 1. Setup initial state
  gsap.set('.shutter-layer', { y: '0%' });
  gsap.set('.transition-content', { opacity: 1 });
  gsap.set('nav', { y: -100 });

  // 2. Pre-render content
  appData = await loadData();
  initNav();
  const page = document.body.dataset.page;
  if (page) await initPage(page);
  if (typeof barba !== 'undefined') initBarba();

  // 3. The Professional Reveal Sequencer
  const tl = gsap.timeline({ delay: 0.4 });

  tl.to('.transition-content', {
    opacity: 0,
    duration: 0.4,
    ease: 'power2.in'
  })
    .to('.shutter-layer', {
      y: '-100%',
      duration: 1,
      ease: 'power4.inOut',
      stagger: 0.12
    }, '-=0.1')
    .to('nav', {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      ease: 'power4.out'
    }, '-=0.6') // Navbar slides in while shutters are half-way up
    .to('.reveal-inner', {
      y: 0,
      duration: 1,
      ease: 'power4.out',
      stagger: 0.1
    }, '-=0.8')
    .set('.shutter-layer', { y: '100%' }); // Prepare for Barba
});

