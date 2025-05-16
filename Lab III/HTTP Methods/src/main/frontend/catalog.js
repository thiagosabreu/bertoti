document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  loadCatalog();
});

const API_URL = 'http://localhost:8080/tenis';

function loadCatalog() {
  const catalogContainer = document.getElementById('catalog-container');
  const loadingSpinner = document.getElementById('loading-spinner');

  if (!catalogContainer) return;

  if (loadingSpinner) {
    loadingSpinner.style.display = 'flex';
  }

  catalogContainer.innerHTML = '';
  if (loadingSpinner) {
    catalogContainer.appendChild(loadingSpinner);
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
        catalogContainer.innerHTML = `
          <div class="no-products">
            <i class="fas fa-exclamation-circle"></i>
            <h3>Nenhum tênis disponível no momento</h3>
            <p>Volte em breve para conferir nossos novos modelos.</p>
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
          </div>
        `;
        catalogContainer.appendChild(tenisCard);
      });
    })
    .catch(error => {
      console.error('Erro:', error);
      if (loadingSpinner) {
        loadingSpinner.style.display = 'none';
      }
      catalogContainer.innerHTML = `
        <div class="error-message">
          <i class="fas fa-exclamation-triangle"></i>
          <h3>Erro ao carregar tênis</h3>
          <p>${error.message}</p>
          <button onclick="loadCatalog()" class="btn btn-primary">Tentar novamente</button>
        </div>
      `;
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = `
    .features {
      padding: 4rem 0;
      background-color: var(--light);
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }
    
    .feature-card {
      background-color: var(--white);
      padding: 2rem;
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      text-align: center;
      transition: transform 0.3s;
    }
    
    .feature-card:hover {
      transform: translateY(-10px);
    }
    
    .feature-card i {
      font-size: 2.5rem;
      color: var(--primary);
      margin-bottom: 1rem;
    }
    
    .feature-card h3 {
      margin-bottom: 1rem;
      color: var(--dark);
    }
    
    .feature-card p {
      color: var(--gray);
    }
    
    @media (max-width: 768px) {
      .features-grid {
        grid-template-columns: 1fr;
      }
    }
  `;
  document.head.appendChild(style);
});
