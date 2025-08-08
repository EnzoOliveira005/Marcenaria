// Animação de scroll no header
window.addEventListener('scroll', function () {
  const header = document.querySelector('header');
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Animações de scroll para elementos
function animateOnScroll() {
  const elements = document.querySelectorAll('.animate-on-scroll');

  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('animated');
    }
  });
}

window.addEventListener('scroll', animateOnScroll);

// Smooth scroll para links de navegação
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Validação e envio do formulário
document.getElementById("formOrcamento").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = this.querySelector('input[placeholder="Nome"]').value.trim();
  const tel = this.querySelector('input[placeholder="WhatsApp"]').value.trim();
  const ambiente = this.querySelector('select').value;
  const desc = this.querySelector('textarea').value.trim();

  // Validações
  if (!nome) {
    showNotification('Por favor, preencha seu nome.', 'error');
    return;
  }

  if (!tel) {
    showNotification('Por favor, preencha seu WhatsApp.', 'error');
    return;
  }

  // Validação básica do telefone (apenas números e alguns caracteres especiais)
  const phoneRegex = /^[\d\s\(\)\-\+]+$/;
  if (!phoneRegex.test(tel)) {
    showNotification('Por favor, insira um número de WhatsApp válido.', 'error');
    return;
  }

  if (!ambiente) {
    showNotification('Por favor, selecione o tipo de ambiente.', 'error');
    return;
  }

  if (!desc) {
    showNotification('Por favor, descreva seu projeto.', 'error');
    return;
  }

  // Animação no botão
  const button = this.querySelector('button');
  button.style.transform = 'scale(0.95)';
  setTimeout(() => {
    button.style.transform = '';
  }, 150);

  // Criar mensagem para WhatsApp
  const msg = `Olá! Me chamo ${nome} e gostaria de um orçamento para ${ambiente}. 

Detalhes do projeto: ${desc}

Aguardo retorno. Obrigado!`;

  const link = `https://wa.me/5512992489226?text=${encodeURIComponent(msg)}`;

  showNotification('Redirecionando para o WhatsApp...', 'success');

  setTimeout(() => {
    window.open(link, '_blank');
  }, 1000);
});

// Sistema de notificações
function showNotification(message, type = 'info') {
  // Remove notificação existente se houver
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span>${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;

  // Estilos da notificação
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    padding: 15px 20px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 300px;
  `;

  // Cores baseadas no tipo
  const colors = {
    success: '#4CAF50',
    error: '#f44336',
    info: '#2196F3'
  };

  notification.style.background = colors[type] || colors.info;

  document.body.appendChild(notification);

  // Animar entrada
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  // Botão de fechar
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.style.cssText = `
    background: none;
    border: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
    margin-left: 10px;
    padding: 0;
  `;

  closeBtn.addEventListener('click', () => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => notification.remove(), 300);
  });

  // Auto remover após 5 segundos
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Efeito parallax sutil no banner
window.addEventListener('scroll', function () {
  const banner = document.querySelector('.banner');
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;

  if (banner) {
    banner.style.transform = `translateY(${rate}px)`;
  }
});

// Adicionar classes de animação aos elementos quando a página carrega
document.addEventListener('DOMContentLoaded', function () {
  // Adicionar classe animate-on-scroll aos elementos que devem animar
  const elementsToAnimate = [
    '#sobre p',
    '.galeria img',
    '#contato p'
  ];

  elementsToAnimate.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      element.classList.add('animate-on-scroll');
    });
  });

  // Executar animação inicial
  animateOnScroll();

  // Adicionar efeito hover nas imagens da galeria
  const galeriaImages = document.querySelectorAll('.galeria img');
  galeriaImages.forEach(img => {
    img.addEventListener('mouseenter', function () {
      this.style.filter = 'brightness(1.1) contrast(1.1)';
    });

    img.addEventListener('mouseleave', function () {
      this.style.filter = '';
    });
  });
});

// Preloader simples
window.addEventListener('load', function () {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';

  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});
