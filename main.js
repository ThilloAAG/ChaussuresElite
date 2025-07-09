// Gestion du panier
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('#cart-count').forEach(el => el.textContent = count);
}

// Charger les produits vedettes
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    
    const productsGrid = document.getElementById('featured-products-grid');
    if (!productsGrid) return;

    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            const featured = products.filter(p => p.featured);
            
            featured.forEach(product => {
                productsGrid.innerHTML += `
                    <div class="product-card">
                        <a href="product-detail.html?id=${product.id}">
                            <div class="product-image">
                                <img src="${product.image}" alt="${product.name}">
                            </div>
                            <div class="product-info">
                                <h3>${product.name}</h3>
                                <div class="product-price">${product.price}€</div>
                                <button class="btn add-to-cart" data-id="${product.id}">Ajouter au panier</button>
                            </div>
                        </a>
                    </div>
                `;
            });

            // Gestion des clics sur "Ajouter au panier"
            productsGrid.addEventListener('click', e => {
                if (!e.target.classList.contains('add-to-cart')) return;
                e.preventDefault();
                
                const productId = parseInt(e.target.dataset.id);
                const product = products.find(p => p.id === productId);
                
                const existingItem = cart.find(item => item.id === productId);
                existingItem 
                    ? existingItem.quantity++ 
                    : cart.push({...product, quantity: 1});
                
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                alert(`${product.name} ajouté au panier !`);
            });
        });
});
