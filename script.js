const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const stats = document.querySelectorAll('[data-count]');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const element = entry.target;
    const target = Number(element.dataset.count);
    const duration = 1400;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      element.textContent = Math.floor(progress * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
    statsObserver.unobserve(element);
  });
}, { threshold: 0.5 });

stats.forEach((stat) => statsObserver.observe(stat));

const testimonials = document.querySelectorAll('.testimonial');
let activeTestimonial = 0;

function showTestimonial(index) {
  testimonials[activeTestimonial].classList.remove('active');
  activeTestimonial = (index + testimonials.length) % testimonials.length;
  testimonials[activeTestimonial].classList.add('active');
}

document.querySelector('.next').addEventListener('click', () => showTestimonial(activeTestimonial + 1));
document.querySelector('.prev').addEventListener('click', () => showTestimonial(activeTestimonial - 1));
setInterval(() => showTestimonial(activeTestimonial + 1), 6000);

document.querySelectorAll('.faq-item button').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach((faq) => faq.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

document.querySelector('.contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  event.currentTarget.querySelector('.form-note').textContent = 'Thank you. Please email or call TRVPFX directly for the fastest response.';
  event.currentTarget.reset();
});

document.getElementById('year').textContent = new Date().getFullYear();
