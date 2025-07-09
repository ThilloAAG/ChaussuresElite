// Gestion du panier
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('#cart-count').forEach(el => el.textContent = count);
}

// Charger les produits vedettes
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    if (document.getElementById('featured-products-grid')) {
        fetch('data/products.json')
            .then(response => response.json())
            .then(products => {
                const featured = products.filter(p => p.featured);
                const container = document.getElementById('featured-products-grid');
                
                featured.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.className = 'product-card';
                    productCard.innerHTML = `
                        <a href="product-detail.html?id=${product.id}">
                            <div class="product-image">
                                <img src="images/${product.image}" alt="${product.name}">
                            </div>
                            <div class="product-info">
                                <h3>${product.name}</h3>
                                <div class="product-price">${product.price}€</div>
                                <button class="btn add-to-cart" data-id="${product.id}">Ajouter au panier</button>
                            </div>
                        </a>
                    `;
                    container.appendChild(productCard);
                });
                
                // Gestion des clics sur "Ajouter au panier"
                document.querySelectorAll('.add-to-cart').forEach(button => {
                    button.addEventListener('click', function(e) {
                        e.preventDefault();
                        const productId = parseInt(this.getAttribute('data-id'));
                        const product = products.find(p => p.id === productId);
                        
                        const existingItem = cart.find(item => item.id === productId);
                        if (existingItem) {
                            existingItem.quantity += 1;
                        } else {
                            cart.push({
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                image: product.image,
                                quantity: 1
                            });
                        }
                        
                        localStorage.setItem('cart', JSON.stringify(cart));
                        updateCartCount();
                        
                        alert(`${product.name} a été ajouté à votre panier!`);
                    });
                });
            });
    }
});