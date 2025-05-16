document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  const form = document.getElementById('edit-tenis-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      updateTenis();
    });
  }
  
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (id) {
    loadTenisDetails(id);
  } else {
    window.location.href = 'index.html';
  }
});

const API_URL = 'http://localhost:8080/tenis';

function loadTenisDetails(id) {
  fetch(`${API_URL}/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro ao carregar detalhes do tênis: ${response.status}`);
      }
      return response.json();
    })
    .then(tenis => {
      document.getElementById('edit-tenis-name').value = tenis.nome;
      document.getElementById('edit-tenis-price').value = tenis.preco;
      document.getElementById('edit-tenis-image').value = tenis.imagemUrl;
      document.getElementById('edit-tenis-id').value = tenis.id;
    })
    .catch(error => {
      console.error('Erro:', error);
      alert(`Erro ao carregar detalhes do tênis: ${error.message}`);
      window.location.href = 'index.html';
    });
}

function updateTenis() {
  const id = document.getElementById('edit-tenis-id').value;
  const nome = document.getElementById('edit-tenis-name').value.trim();
  const precoInput = document.getElementById('edit-tenis-price').value.trim();
  const imagemUrl = document.getElementById('edit-tenis-image').value.trim();
  
  if (!id || !nome || !precoInput || !imagemUrl) {
    alert('Por favor, preencha todos os campos.');
    return;
  }
  
  const preco = parseFloat(precoInput);
  if (isNaN(preco) || preco <= 0) {
    alert('Por favor, insira um preço válido.');
    return;
  }
  
  const tenis = { nome, preco, imagemUrl };
  
  fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tenis)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro ao atualizar tênis: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      alert('Tênis atualizado com sucesso!');
      window.location.href = 'index.html';
    })
    .catch(error => {
      console.error('Erro:', error);
      alert(`Erro ao atualizar tênis: ${error.message}`);
    });
}
