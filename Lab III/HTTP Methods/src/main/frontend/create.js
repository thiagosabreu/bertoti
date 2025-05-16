document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  const form = document.getElementById('tenis-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      createTenis();
    });
  }
});

const API_URL = 'http://localhost:8080/tenis';

function createTenis() {
  const nome = document.getElementById('tenis-name').value.trim();
  const precoInput = document.getElementById('tenis-price').value.trim();
  const imagemUrl = document.getElementById('tenis-image').value.trim();
  
  if (!nome || !precoInput || !imagemUrl) {
    alert('Por favor, preencha todos os campos.');
    return;
  }
  
  const preco = parseFloat(precoInput);
  if (isNaN(preco) || preco <= 0) {
    alert('Por favor, insira um preço válido.');
    return;
  }
  
  const tenis = { nome, preco, imagemUrl };
  
  fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tenis)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro ao criar tênis: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      alert('Tênis adicionado com sucesso!');
      window.location.href = 'index.html';
    })
    .catch(error => {
      console.error('Erro:', error);
      alert(`Erro ao adicionar tênis: ${error.message}`);
    });
}
