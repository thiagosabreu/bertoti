document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  const path = window.location.pathname;

  if (path.includes('index.html') || path.endsWith('/') || path.endsWith('/frontend/')) {
    loadAllTenis();
  }

  if (path.includes('create.html')) {
    const form = document.getElementById('tenis-form');
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        createTenis();
      });
    }
  }

  if (path.includes('edit.html')) {
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
  }
});

const API_URL = 'http://localhost:8080/tenis';

function loadAllTenis() {
  const productsContainer = document.getElementById('products-container');
  const loadingSpinner = document.getElementById('loading-spinner');
  
  if (!productsContainer) return;

  if (loadingSpinner) {
    loadingSpinner.style.display = 'flex';
  }

  productsContainer.innerHTML = '';
  if (loadingSpinner) {
    productsContainer.appendChild(loadingSpinner);
  }

  fetch(API_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro ao carregar tênis: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (loadingSpinner) {
        loadingSpinner.style.display = 'none';
      }

      if (!data || data.length === 0) {
        productsContainer.innerHTML = `
          <div class="no-products">
            <i class="fas fa-exclamation-circle"></i>
            <h3>Nenhum tênis encontrado</h3>
            <p>Adicione novos tênis para vê-los aqui.</p>
            <a href="create.html" class="btn btn-primary">Adicionar Tênis</a>
          </div>
        `;
        return;
      }
      
      data.forEach(tenis => {
        const tenisCard = document.createElement('div');
        tenisCard.className = 'product-card';
        tenisCard.innerHTML = `
          <img src="${tenis.imagemUrl}" alt="${tenis.nome}" class="product-image">
          <div class="product-info">
            <h3 class="product-name">${tenis.nome}</h3>
            <div class="product-price">R$ ${parseFloat(tenis.preco).toFixed(2)}</div>
            <div class="product-actions">
              <button onclick="editTenis('${tenis.id}')" class="btn btn-sm btn-primary">
                <i class="fas fa-edit"></i> Editar
              </button>
              <button onclick="deleteTenis('${tenis.id}')" class="btn btn-sm btn-danger">
                <i class="fas fa-trash"></i> Excluir
              </button>
            </div>
          </div>
        `;
        productsContainer.appendChild(tenisCard);
      });
    })
    .catch(error => {
      console.error('Erro:', error);
      if (loadingSpinner) {
        loadingSpinner.style.display = 'none';
      }
      productsContainer.innerHTML = `
        <div class="error-message">
          <i class="fas fa-exclamation-triangle"></i>
          <h3>Erro ao carregar tênis</h3>
          <p>${error.message}</p>
          <button onclick="loadAllTenis()" class="btn btn-primary">Tentar novamente</button>
        </div>
      `;
    });
}

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

function editTenis(id) {
  window.location.href = `edit.html?id=${id}`;
}

function deleteTenis(id) {
  if (!confirm('Tem certeza que deseja excluir este tênis?')) {
    return;
  }
  
  fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro ao excluir tênis: ${response.status}`);
      }
      alert('Tênis excluído com sucesso!');
      loadAllTenis();
    })
    .catch(error => {
      console.error('Erro:', error);
      alert(`Erro ao excluir tênis: ${error.message}`);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = `
    .loading-spinner {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 2rem;
      color: var(--primary);
      font-size: 1.5rem;
    }
    
    .loading-spinner i {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    
    .error-message, .no-products {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 3rem;
      text-align: center;
      background-color: var(--white);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
    }
    
    .error-message i, .no-products i {
      font-size: 3rem;
      margin-bottom: 1rem;
      color: var(--danger);
    }
    
    .no-products i {
      color: var(--gray);
    }
    
    .error-message h3, .no-products h3 {
      margin-bottom: 1rem;
    }
    
    .error-message p, .no-products p {
      margin-bottom: 1.5rem;
      color: var(--gray);
    }
  `;
  document.head.appendChild(style);
});
