document.documentElement.classList.add('js-enabled');

const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const progressBar = document.querySelector('.progress-bar');
const revealElements = document.querySelectorAll('.reveal');
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.site-nav a');
const filterButtons = document.querySelectorAll('.filter-btn');
const organizerCards = document.querySelectorAll('.organizer-card');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav.classList.toggle('open');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      siteNav.classList.remove('open');
    });
  });
}

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  }
);

revealElements.forEach((el) => revealObserver.observe(el));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    });
  },
  {
    threshold: 0.45,
    rootMargin: '-20% 0px -35% 0px'
  }
);

sections.forEach((section) => sectionObserver.observe(section));

const updateProgress = () => {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  if (progressBar) progressBar.style.width = `${progress}%`;
};

updateProgress();
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);

const setupTabs = (group) => {
  const buttons = group.querySelectorAll('[data-tab]');
  const panels = group.querySelectorAll('[data-panel]');
  if (!buttons.length || !panels.length) return;

  const activate = (targetId) => {
    buttons.forEach((button) => {
      const isActive = button.dataset.tab === targetId;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-selected', String(isActive));
      button.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach((panel) => {
      const isActive = panel.dataset.panel === targetId;
      panel.classList.toggle('active', isActive);
      panel.hidden = !isActive;
    });
  };

  let activeButton = Array.from(buttons).find((button) => button.classList.contains('active')) || buttons[0];
  if (activeButton) activate(activeButton.dataset.tab);

  buttons.forEach((button) => {
    button.addEventListener('click', () => activate(button.dataset.tab));
    button.addEventListener('keydown', (event) => {
      const currentIndex = Array.from(buttons).indexOf(button);
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault();
        const next = buttons[(currentIndex + 1) % buttons.length];
        next.focus();
        activate(next.dataset.tab);
      }
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault();
        const prev = buttons[(currentIndex - 1 + buttons.length) % buttons.length];
        prev.focus();
        activate(prev.dataset.tab);
      }
      if (event.key === 'Home') {
        event.preventDefault();
        buttons[0].focus();
        activate(buttons[0].dataset.tab);
      }
      if (event.key === 'End') {
        event.preventDefault();
        buttons[buttons.length - 1].focus();
        activate(buttons[buttons.length - 1].dataset.tab);
      }
    });
  });
};

document.querySelectorAll('.tab-group').forEach(setupTabs);

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => {
      const isActive = btn === button;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', String(isActive));
    });

    organizerCards.forEach((card) => {
      const category = card.dataset.category;
      const show = filter === 'all' || category === filter;
      card.classList.toggle('hidden', !show);
    });
  });
});
