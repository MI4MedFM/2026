document.documentElement.classList.add('js-enabled');

const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const progressBar = document.querySelector('.progress-bar');
const reveals = document.querySelectorAll('.reveal');
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.site-nav a');
const filterButtons = document.querySelectorAll('.filter-btn');
const organizerCards = document.querySelectorAll('.organizer-card');
const pillarTabs = document.querySelectorAll('.pillar-tab');

const pillarContent = {
  inspect: {
    label: 'Pillar 1',
    title: 'Inspect internal model mechanisms',
    text: 'Understand what features, subcircuits, and latent representations medical foundation models rely on when producing clinically relevant behavior.',
    points: [
      'Sparse autoencoders and feature discovery',
      'Circuit analysis and causal tracing',
      'Activation-level understanding of decision pathways'
    ],
    core: 'Inspect'
  },
  validate: {
    label: 'Pillar 2',
    title: 'Validate whether mechanisms are clinically meaningful',
    text: 'Move beyond appealing visual explanations and ask whether discovered mechanisms actually align with trusted medical concepts, task structure, and downstream behavior.',
    points: [
      'Faithfulness and concept alignment',
      'Robustness under domain shift and shortcut pressure',
      'Clinically grounded benchmarks and evaluation protocols'
    ],
    core: 'Validate'
  },
  debug: {
    label: 'Pillar 3',
    title: 'Debug failure modes that matter in practice',
    text: 'Use mechanism-level insight to trace brittle predictions, multimodal hallucinations, spurious cues, and unsafe model states.',
    points: [
      'Tracing shortcut learning and hidden biases',
      'Analyzing hallucination and calibration errors',
      'Understanding unreliable behavior before deployment'
    ],
    core: 'Debug'
  },
  intervene: {
    label: 'Pillar 4',
    title: 'Intervene for safer and more controllable models',
    text: 'Translate understanding into action through editing, steering, debiasing, monitoring, and other targeted interventions for medical foundation models.',
    points: [
      'Feature steering and mechanism-aware editing',
      'Robustness and bias-reduction strategies',
      'Interpretability-guided monitoring at inference time'
    ],
    core: 'Intervene'
  }
};

const pillarLabel = document.getElementById('pillar-label');
const pillarTitle = document.getElementById('pillar-title');
const pillarText = document.getElementById('pillar-text');
const pillarPoints = document.getElementById('pillar-points');
const pillarCoreTitle = document.getElementById('pillar-core-title');

function renderPillar(key) {
  const item = pillarContent[key];
  if (!item) return;

  pillarLabel.textContent = item.label;
  pillarTitle.textContent = item.title;
  pillarText.textContent = item.text;
  pillarCoreTitle.textContent = item.core;
  pillarPoints.innerHTML = item.points.map((point) => `<li>${point}</li>`).join('');
}

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

reveals.forEach((element) => revealObserver.observe(element));

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

function updateProgress() {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;
}

updateProgress();
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => {
      const active = btn === button;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', String(active));
    });

    organizerCards.forEach((card) => {
      const category = card.dataset.category;
      const show = filter === 'all' || category === filter;
      card.classList.toggle('hidden', !show);
    });
  });
});

pillarTabs.forEach((button) => {
  button.addEventListener('click', () => {
    const pillar = button.dataset.pillar;

    pillarTabs.forEach((tab) => {
      const active = tab === button;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
    });

    renderPillar(pillar);
  });
});

renderPillar('inspect');
