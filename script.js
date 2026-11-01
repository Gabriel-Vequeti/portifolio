/**
 * Portfolio - Gabriel Lopes Vequeti
 * JavaScript puro para interações e microinterações
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initParticleTrail();
  initNavigationMenu();
  initSmoothScroll();
  initScrollReveal();
  initContactForm();
});

/**
 * Alternância de Tema Claro / Escuro com persistência local e detecção de preferência
 * (Item 6 de funcionalidades.md)
 */
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  // 1. Verifica preferência salva ou preferência do sistema
  const savedTheme = localStorage.getItem('theme-preference');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (!prefersDark) {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  // 2. Alterna entre claro e escuro no clique
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme-preference', newTheme);
  });
}

/**
 * Validação do Formulário de Contato no Navegador
 * Formata os dados e prepara a abertura do cliente de e-mail via mailto
 * (Item 5 de funcionalidades.md)
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const messageInput = document.getElementById('form-message');
  const errorName = document.getElementById('error-name');
  const errorEmail = document.getElementById('error-email');
  const errorMessage = document.getElementById('error-message');
  const formStatus = document.getElementById('form-status');

  if (!form) return;

  function validateEmail(email) {
    // Validação de e-mail com regex segura
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function clearErrors() {
    errorName.textContent = '';
    errorEmail.textContent = '';
    errorMessage.textContent = '';
    nameInput.classList.remove('is-invalid');
    emailInput.classList.remove('is-invalid');
    messageInput.classList.remove('is-invalid');
    formStatus.className = 'form-status-alert';
    formStatus.textContent = '';
    formStatus.style.display = 'none';
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    let isValid = true;
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // Validação do nome
    if (!name) {
      errorName.textContent = 'Por favor, informe seu nome.';
      nameInput.classList.add('is-invalid');
      isValid = false;
    } else if (name.length < 2) {
      errorName.textContent = 'O nome deve ter no mínimo 2 caracteres.';
      nameInput.classList.add('is-invalid');
      isValid = false;
    }

    // Validação do e-mail
    if (!email) {
      errorEmail.textContent = 'Por favor, informe seu e-mail.';
      emailInput.classList.add('is-invalid');
      isValid = false;
    } else if (!validateEmail(email)) {
      errorEmail.textContent = 'Insira um endereço de e-mail válido (ex: seu@email.com).';
      emailInput.classList.add('is-invalid');
      isValid = false;
    }

    // Validação da mensagem
    if (!message) {
      errorMessage.textContent = 'Por favor, digite sua mensagem.';
      messageInput.classList.add('is-invalid');
      isValid = false;
    } else if (message.length < 10) {
      errorMessage.textContent = 'A mensagem deve conter pelo menos 10 caracteres.';
      messageInput.classList.add('is-invalid');
      isValid = false;
    }

    if (!isValid) {
      formStatus.className = 'form-status-alert is-error';
      formStatus.textContent = 'Por favor, corrija os campos destacados acima.';
      formStatus.style.display = 'block';
      return;
    }

    // Sucesso na validação: Monta mailto e notifica o usuário
    const targetEmail = 'bielvequeti@gmail.com';
    const emailSubject = encodeURIComponent(`Contato pelo Portfólio - ${name}`);
    const emailBody = encodeURIComponent(
      `Olá Gabriel,\n\nMeu nome é ${name} (${email}).\n\nMensagem:\n${message}\n\nEnviado através do formulário do portfólio.`
    );
    const mailtoUrl = `mailto:${targetEmail}?subject=${emailSubject}&body=${emailBody}`;

    formStatus.className = 'form-status-alert is-success';
    formStatus.textContent = 'Dados validados com sucesso! Abrindo seu aplicativo de e-mail padrão para concluir o envio...';
    formStatus.style.display = 'block';

    // Dispara mailto
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 450);
  });
}

/**
 * Revelação progressiva de elementos conforme a rolagem da página
 * Inspirado em CartoonEast (Item 4 de funcionalidades.md)
 * Utiliza IntersectionObserver com suporte a fallback e prefers-reduced-motion
 */
function initScrollReveal() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    // Se o usuário prefere movimento reduzido ou navegador antigo, exibe diretamente
    revealElements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target); // Revela apenas uma vez para manter a experiência fluida
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => observer.observe(el));
}

/**
 * Menu de navegação fixo hambúrguer
 * Inspirado em CartoonEast (Item 1 de funcionalidades.md)
 * Suporte a teclado (ESC para fechar), acessibilidade ARIA e foco gerenciado
 * Animação hambúrguer → X via classe is-open no botão
 */
function initNavigationMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!menuToggle || !mainNav) return;

  function openMenu() {
    mainNav.classList.add('is-active');
    mainNav.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.classList.add('is-open');       // ← animação hambúrguer → X
    document.body.style.overflow = 'hidden';
    if (menuClose) menuClose.focus();
  }

  function closeMenu() {
    mainNav.classList.remove('is-active');
    mainNav.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.classList.remove('is-open');    // ← reverte X → hambúrguer
    document.body.style.overflow = '';
    menuToggle.focus();
  }

  menuToggle.addEventListener('click', openMenu);
  if (menuClose) menuClose.addEventListener('click', closeMenu);

  // Fechar ao clicar fora do conteúdo
  mainNav.addEventListener('click', (e) => {
    if (e.target === mainNav) {
      closeMenu();
    }
  });

  // Fechar com tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('is-active')) {
      closeMenu();
    }
  });

  // Fechar ao clicar em qualquer link da navegação
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });
}

/**
 * Rastro discreto de partículas/pontos ao mover o mouse
 * Inspirado na referência Sandeep Kumar (funcionalidades.md item complementar)
 * Desativado em telas sensíveis ao toque e com preferência de movimento reduzido
 */
function initParticleTrail() {
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isTouchDevice || prefersReducedMotion) {
    return;
  }

  const canvas = document.getElementById('trail-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const maxParticles = 24;

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 2.5 + 1.2;
      this.alpha = 0.55;
      this.decay = Math.random() * 0.02 + 0.015;
    }

    update() {
      this.alpha -= this.decay;
      this.size = Math.max(0, this.size - 0.02);
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle = '#C6F36A'; // Verde-lima da identidade visual
      ctx.shadowBlur = 6;
      ctx.shadowColor = 'rgba(198, 243, 106, 0.4)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  let mouseX = -100;
  let mouseY = -100;
  let lastSpawn = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    const now = performance.now();
    // Limita a frequência para manter efeito sutil e boa performance
    if (now - lastSpawn > 35) {
      if (particles.length < maxParticles) {
        particles.push(new Particle(mouseX, mouseY));
      }
      lastSpawn = now;
    }
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      p.draw();

      if (p.alpha <= 0 || p.size <= 0) {
        particles.splice(i, 1);
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/**
 * Rolagem suave acessível e preparada para o link de projetos
 */
function initSmoothScroll() {
  const btnProjects = document.getElementById('btn-projects');
  if (!btnProjects) return;

  btnProjects.addEventListener('click', (e) => {
    const target = document.querySelector('#projetos');
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
    // Caso a seção #projetos ainda não exista, mantém comportamento padrão de ancoragem
  });
}
