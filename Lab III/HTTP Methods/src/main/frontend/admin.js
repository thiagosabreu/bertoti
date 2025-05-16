document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  loadAllTenis();
});

// URL da API
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
        tenisCard.className = 'product-card admin-card';
        tenisCard.innerHTML = `
          <div class="admin-badge"><i class="fas fa-cog"></i> Gerenciável</div>
          <img src="${tenis.imagemUrl}" alt="${tenis.nome}" class="product-image">
          <div class="product-info">
            <h3 class="product-name">${tenis.nome}</h3>
            <div class="product-price">R$ ${parseFloat(tenis.preco).toFixed(2)}</div>
            <div class="product-id">ID: ${tenis.id}</div>
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
    .admin-header {
      background-color: var(--dark);
      color: var(--white);
      padding: 2rem 0;
    }
    
    .admin-header .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .admin-welcome h2 {
      font-size: 1.8rem;
      margin-bottom: 0.5rem;
    }
    
    .admin-welcome p {
      opacity: 0.8;
    }
    
    .admin-actions {
      display: flex;
      gap: 1rem;
    }
    
    .admin-card {
      position: relative;
    }
    
    .admin-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: var(--dark);
      color: var(--white);
      padding: 0.3rem 0.6rem;
      border-radius: 4px;
      font-size: 0.8rem;
      z-index: 1;
    }
    
    .product-id {
      font-size: 0.8rem;
      color: var(--gray);
      margin-bottom: 0.5rem;
    }
    
    @media (max-width: 768px) {
      .admin-header .container {
        flex-direction: column;
        text-align: center;
      }
      
      .admin-welcome {
        margin-bottom: 1rem;
      }
    }
  `;
  document.head.appendChild(style);
});
