const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

window.addEventListener('load', () => setTimeout(() => $('#loader')?.classList.add('hidden'), 650));

// Mobile navigation
$('#menuToggle')?.addEventListener('click', () => $('#navMenu').classList.toggle('open'));
$$('#navMenu a').forEach(a => a.addEventListener('click', () => $('#navMenu').classList.remove('open')));

// Dark/light mode
const savedTheme = localStorage.getItem('rijan-theme');
if (savedTheme === 'light') document.body.classList.add('light');
$('#themeToggle')?.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('rijan-theme', document.body.classList.contains('light') ? 'light' : 'dark');
  $('#themeToggle').textContent = document.body.classList.contains('light') ? '☾' : '☼';
});
$('#themeToggle').textContent = document.body.classList.contains('light') ? '☾' : '☼';

// Typing animation
const words = ['a BIT student.', 'learning new things.', 'interested in technology.', 'building my future.'];
let wi = 0, ci = 0, deleting = false;
function typeLoop(){
  const el = $('#typingText'); if (!el) return;
  const word = words[wi];
  el.textContent = deleting ? word.slice(0, --ci) : word.slice(0, ++ci);
  let delay = deleting ? 45 : 75;
  if (!deleting && ci === word.length) { delay = 1200; deleting = true; }
  else if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % words.length; delay = 350; }
  setTimeout(typeLoop, delay);
}
typeLoop();

// Scroll reveal
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) entry.target.classList.add('visible');
}), {threshold: .12});
$$('.reveal').forEach(el => observer.observe(el));

// Counters
const counterObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!entry.isIntersecting) return;
  const el = entry.target; const target = Number(el.dataset.count); let n = 0;
  const step = Math.max(1, Math.ceil(target / 20));
  const timer = setInterval(() => { n += step; if (n >= target) { n = target; clearInterval(timer); } el.textContent = n; }, 45);
  counterObserver.unobserve(el);
}), {threshold: .7});
$$('[data-count]').forEach(el => counterObserver.observe(el));

// Local visitor counter (not a global website analytics counter)
let visits = Number(localStorage.getItem('rijan-visits') || 0) + 1;
localStorage.setItem('rijan-visits', visits);
$('#visitorCount').textContent = visits;

// Clock
function clock(){
  const now = new Date();
  $('#clock').textContent = now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit', second:'2-digit'});
}
clock(); setInterval(clock, 1000);
$('#year').textContent = new Date().getFullYear();

// Cursor glow for desktop
const glow = $('.cursor-glow');
window.addEventListener('mousemove', e => { if (glow) { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; } });

// Background particles
const particleBox = $('.particles');
for(let i=0;i<22;i++){
  const p=document.createElement('span');
  p.style.left = Math.random()*100+'%';
  p.style.animationDuration = (8+Math.random()*12)+'s';
  p.style.animationDelay = (-Math.random()*15)+'s';
  particleBox.appendChild(p);
}

// Mini quiz
$$('.quiz-options button').forEach(btn => btn.addEventListener('click', () => {
  const result = $('#quizResult');
  if (btn.dataset.answer === 'correct') { result.textContent = 'Correct! 🎉 You know me well.'; result.style.color = '#9a78ff'; }
  else { result.textContent = 'Not quite — I am currently studying BIT.'; result.style.color = '#ff9c9c'; }
}));

// Gallery button
$('#galleryTip')?.addEventListener('click', () => showToast('You can add more JPG/PNG photos to the folder and duplicate the gallery card in index.html.'));

// Contact form -> mail client
$('#contactForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const name = $('#name').value.trim(), email = $('#email').value.trim(), message = $('#message').value.trim();
  const subject = encodeURIComponent(`Website message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:khatririjan111@gmail.com?subject=${subject}&body=${body}`;
});

function showToast(text){
  const t=$('#toast'); t.textContent=text; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),4000);
}
