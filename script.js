/* ================================================
   Gulsum Begam — Portfolio JavaScript
   Cursor · Typing · Particles · 3D Tilt · Canvas
================================================ */
 
// ── CURSOR ──
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animateCursor() {
  rx += (mx - rx) * 0.15;
  ry += (my - ry) * 0.15;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();
document.querySelectorAll('a, button, .project-card, .mini-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    ring.style.width = '60px';
    ring.style.height = '60px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '12px';
    cursor.style.height = '12px';
    ring.style.width = '36px';
    ring.style.height = '36px';
  });
});
 
// ── TYPING EFFECT ──
const words = ['Full Stack Developer', 'AI & ML Engineer', 'IoT Builder', 'UI/UX Designer', 'Problem Solver', 'MCA Graduate 2026'];
let wi = 0, ci = 0, deleting = false;
const el = document.getElementById('typed-text');
function type() {
  const word = words[wi];
  if (!deleting) {
    el.textContent = word.substring(0, ci + 1);
    ci++;
    if (ci === word.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    el.textContent = word.substring(0, ci - 1);
    ci--;
    if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
  }
  setTimeout(type, deleting ? 60 : 100);
}
setTimeout(type, 1500);
 
// ── COUNTER ANIMATION ──
function animateCount(el) {
  const target = parseInt(el.dataset.count);
  const duration = 2000;
  const start = performance.now();
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }
  requestAnimationFrame(update);
}
const counters = document.querySelectorAll('.hero-stat-num');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { animateCount(e.target); counterObserver.unobserve(e.target); } });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));
 
// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
reveals.forEach(r => revealObserver.observe(r));
 
// ── SKILL BARS ──
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(bar => bar.classList.add('animate'));
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skills-group').forEach(g => skillObserver.observe(g));
 
// ── 3D CARD TILT ──
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (y - 0.5) * 12;
    const tiltY = (x - 0.5) * -12;
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px)`;
    card.style.setProperty('--mx', (x * 100) + '%');
    card.style.setProperty('--my', (y * 100) + '%');
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
 
// ── PARTICLES ──
const particleContainer = document.getElementById('particles');
for (let i = 0; i < 40; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  p.style.left = Math.random() * 100 + 'vw';
  p.style.animationDuration = (8 + Math.random() * 15) + 's';
  p.style.animationDelay = (Math.random() * 15) + 's';
  p.style.setProperty('--drift', (Math.random() * 100 - 50) + 'px');
  p.style.opacity = Math.random() * 0.5;
  particleContainer.appendChild(p);
}
 
// ── CANVAS STAR FIELD ──
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let stars = [];
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = Array.from({length: 120}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.2,
    o: Math.random() * 0.4 + 0.05,
    speed: Math.random() * 0.3 + 0.05,
    twinkle: Math.random() * Math.PI * 2
  }));
}
window.addEventListener('resize', resize);
resize();
let frame = 0;
function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  frame += 0.008;
  stars.forEach(s => {
    s.twinkle += s.speed * 0.02;
    const opacity = s.o * (0.6 + 0.4 * Math.sin(s.twinkle));
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(212,168,67,${opacity})`;
    ctx.shadowBlur = 4;
    ctx.shadowColor = 'rgba(212,168,67,0.5)';
    ctx.fill();
    s.y -= s.speed * 0.1;
    if (s.y < 0) s.y = canvas.height;
  });
  // Grid lines subtle
  ctx.strokeStyle = 'rgba(212,168,67,0.02)';
  ctx.lineWidth = 0.5;
  for (let x = 0; x < canvas.width; x += 80) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += 80) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
  }
  requestAnimationFrame(drawStars);
}
drawStars();
 
// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
 
// ── GOLD GLOW ON SCROLL ──
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  document.documentElement.style.setProperty('--glow-intensity', scrolled);
});
