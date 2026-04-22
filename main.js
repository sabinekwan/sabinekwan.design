(function () {

  /* ─────────────────────────────────────────────────────────────────────
     Shared header & mobile overlay
     Injected at runtime so every page stays in sync automatically.
     ───────────────────────────────────────────────────────────────────── */

  const page = location.pathname.split('/').pop() || 'index.html';
  const isAbout = page === 'about.html';

  const chatIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>`;

  const closeIcon = `<svg width="47" height="47" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M18 6L6 18" stroke="#000634" stroke-width="2" stroke-linecap="round"/><path d="M6 6L18 18" stroke="#000634" stroke-width="2" stroke-linecap="round"/></svg>`;

  const externalLinkIcon = `<svg class="nav-external-icon" width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M2 9L9 2M9 2H4M9 2V7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  const headerHTML = `
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <div class="page-bg" aria-hidden="true"></div>

    <header class="site-header">
      <div class="header-inner">

        <div class="header-logo">
          <a href="index.html" aria-label="Sabine Kwan — Home">
            <img class="logo-full" src="SABINE KWAN.svg" alt="Sabine Kwan" width="178" height="92">
            <img class="logo-small" src="SK.svg" alt="Sabine Kwan" width="67" height="38">
          </a>
        </div>

        <nav class="desktop-nav" aria-label="Main navigation">
          <a href="about.html" class="nav-link"${isAbout ? ' aria-current="page"' : ''}>About</a>
          <a
            href="https://drive.google.com/file/d/1NmzHvv1UU78Ubu3FrCxYTFcnHChqmB3J/view?usp=sharing"
            class="nav-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Resume (opens in new tab)"
          >Resume</a>
          <a
            href="https://www.linkedin.com/in/sabinekwan/"
            class="nav-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn (opens in new tab)"
          >LinkedIn</a>
          <a
            href="https://calendly.com/sabinekwandesign"
            class="btn-chat"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Let's Chat! — Book a call (opens in new tab)"
          >Let's Chat! ${chatIcon}</a>
        </nav>

        <button
          class="hamburger-btn"
          id="hamburger-btn"
          aria-label="Open navigation menu"
          aria-expanded="false"
          aria-controls="mobile-overlay"
        >
          <svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <rect x="10" y="14" width="27" height="2.5" rx="1.25" fill="#000634"/>
            <rect x="10" y="22.25" width="27" height="2.5" rx="1.25" fill="#000634"/>
            <rect x="10" y="30.5" width="27" height="2.5" rx="1.25" fill="#000634"/>
          </svg>
        </button>

      </div>
    </header>

    <div
      id="mobile-overlay"
      class="mobile-overlay"
      hidden
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <div class="mobile-overlay-header">
        <div class="header-logo">
          <a href="index.html" aria-label="Sabine Kwan — Home">
            <img src="SK.svg" alt="Sabine Kwan" width="67" height="38">
          </a>
        </div>
        <button class="mobile-overlay-close" id="mobile-overlay-close" aria-label="Close navigation menu">
          ${closeIcon}
        </button>
      </div>
      <nav class="mobile-overlay-nav" aria-label="Mobile navigation">
        <a href="about.html" class="mobile-nav-link"${isAbout ? ' aria-current="page"' : ''}>About</a>
        <a
          href="https://drive.google.com/file/d/1NmzHvv1UU78Ubu3FrCxYTFcnHChqmB3J/view?usp=sharing"
          class="mobile-nav-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Resume (opens in new tab)"
        >Resume</a>
        <a
          href="https://www.linkedin.com/in/sabinekwan/"
          class="mobile-nav-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn (opens in new tab)"
        >LinkedIn</a>
        <a
          href="https://calendly.com/sabinekwandesign"
          class="btn-chat"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Let's Chat! — Book a call (opens in new tab)"
        >Let's Chat! ${chatIcon}</a>
      </nav>
    </div>
  `;

  document.body.insertAdjacentHTML('afterbegin', headerHTML);


  /* ─────────────────────────────────────────────────────────────────────
     Mobile overlay interactions
     ───────────────────────────────────────────────────────────────────── */

  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileOverlayClose = document.getElementById('mobile-overlay-close');

  function openOverlay() {
    mobileOverlay.hidden = false;
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    hamburgerBtn.setAttribute('aria-label', 'Close navigation menu');
    mobileOverlayClose.focus();
  }

  function closeOverlay() {
    mobileOverlay.hidden = true;
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    hamburgerBtn.setAttribute('aria-label', 'Open navigation menu');
    hamburgerBtn.focus();
  }

  hamburgerBtn.addEventListener('click', openOverlay);
  mobileOverlayClose.addEventListener('click', closeOverlay);

  mobileOverlay.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeOverlay);
  });

  document.addEventListener('keydown', (e) => {
    if (mobileOverlay.hidden) return;

    if (e.key === 'Escape') {
      closeOverlay();
      return;
    }

    if (e.key === 'Tab') {
      const focusable = Array.from(
        mobileOverlay.querySelectorAll('a[href], button:not([disabled])')
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });

})();
