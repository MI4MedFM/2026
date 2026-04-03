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

/* ═══════════════════════════════════════════════════════════ */
/*  PILLAR CONTENT                                             */
/* ═══════════════════════════════════════════════════════════ */

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

/* ═══════════════════════════════════════════════════════════ */
/*  MOBILE NAV                                                 */
/* ═══════════════════════════════════════════════════════════ */

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

/* ═══════════════════════════════════════════════════════════ */
/*  SCROLL REVEAL                                              */
/* ═══════════════════════════════════════════════════════════ */

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

/* ═══════════════════════════════════════════════════════════ */
/*  ACTIVE NAV                                                 */
/* ═══════════════════════════════════════════════════════════ */

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

/* ═══════════════════════════════════════════════════════════ */
/*  PROGRESS BAR                                               */
/* ═══════════════════════════════════════════════════════════ */

function updateProgress() {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;
}

updateProgress();
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);

/* ═══════════════════════════════════════════════════════════ */
/*  ORGANIZER FILTERS                                          */
/* ═══════════════════════════════════════════════════════════ */

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

/* ═══════════════════════════════════════════════════════════ */
/*  PILLAR TABS                                                */
/* ═══════════════════════════════════════════════════════════ */

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

/* ═══════════════════════════════════════════════════════════ */
/*  HERO CANVAS — Neural Network Particle Animation            */
/* ═══════════════════════════════════════════════════════════ */

(function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height, particles, animFrame;

  const PARTICLE_COUNT = 60;
  const CONNECTION_DIST = 140;
  const COLORS = [
    'rgba(65, 94, 243, 0.4)',
    'rgba(14, 165, 233, 0.4)',
    'rgba(191, 79, 232, 0.3)',
    'rgba(19, 185, 129, 0.3)'
  ];

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2.5 + 1.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)]
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DIST) {
          const alpha = (1 - dist / CONNECTION_DIST) * 0.15;
          ctx.strokeStyle = `rgba(65, 94, 243, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      // Glow
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
      grad.addColorStop(0, p.color.replace(/[\d.]+\)$/, '0.08)'));
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fill();
    }
  }

  function update() {
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
      p.x = Math.max(0, Math.min(width, p.x));
      p.y = Math.max(0, Math.min(height, p.y));
    }
  }

  function animate() {
    update();
    draw();
    animFrame = requestAnimationFrame(animate);
  }

  // Respect reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    canvas.style.display = 'none';
    return;
  }

  resize();
  createParticles();
  animate();

  window.addEventListener('resize', () => {
    resize();
    // Re-distribute particles on large resize
    if (particles.length !== PARTICLE_COUNT) createParticles();
  });
})();
