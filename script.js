const header = document.getElementById('siteHeader');
const burger = document.getElementById('burger');
const drawer = document.getElementById('mobileDrawer');

const setActiveNav = () => {
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  const currentFile = currentPath.split('/').filter(Boolean).pop() || 'index.html';

  document.querySelectorAll('header .nav-link, .mobile-drawer a').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:')) return;

    const targetFile = new URL(href, window.location.href).pathname.split('/').filter(Boolean).pop() || 'index.html';
    const isActive = targetFile === currentFile;
    link.classList.toggle('active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
};

setActiveNav();

if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
  });
}

if (burger && drawer) {
  burger.addEventListener('click', () => drawer.classList.toggle('open'));
  drawer.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => drawer.classList.remove('open')));
}

const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });
  revealEls.forEach((el) => revealObserver.observe(el));
}

const canvas = document.getElementById('stars');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W = 0, H = 0, stars = [];
  const initStars = () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight * 1.8;
    stars = Array.from({ length: 110 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.2,
      a: Math.random(),
      da: Math.random() * 0.008 + 0.002
    }));
  };
  const drawStars = () => {
    ctx.clearRect(0, 0, W, H);
    stars.forEach((s) => {
      s.a += s.da;
      const alpha = (Math.sin(s.a) + 1) / 2 * 0.8 + 0.1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212,175,55,${alpha * 0.75})`;
      ctx.fill();
    });
    requestAnimationFrame(drawStars);
  };
  initStars();
  drawStars();
  window.addEventListener('resize', initStars);
}
