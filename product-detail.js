document.addEventListener('DOMContentLoaded', function() {
    const productContainer = document.getElementById('product-detail');
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    fetch('data/products.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id === productId);
            if (product) {
                displayProduct(product);
            } else {
                productContainer.innerHTML = '<p>Produit non trouvé</p>';
            }
        });

    function displayProduct(product) {
        productContainer.innerHTML = `
            <div class="product-detail-grid">
                <div class="product-images">
                    <img src="images/${product.image}" alt="${product.name}" class="main-image">
                </div>
                <div class="product-info">
                    <h1>${product.name}</h1>
                    <div class="price">${product.price}€</div>
                    <div class="description">
                        <p>Des chaussures de haute qualité pour un style incomparable.</p>
                    </div>
                    <div class="product-actions">
                        <button class="btn add-to-cart" data-id="${product.id}">Ajouter au panier</button>
                    </div>
                </div>
            </div>
        `;

        // Gestion de l'ajout au panier
        document.querySelector('.add-to-cart').addEventListener('click', function() {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingItem = cart.find(item => item.id === product.id);

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
            
            // Mettre à jour le compteur du panier
            const cartCountElements = document.querySelectorAll('#cart-count');
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCountElements.forEach(el => el.textContent = totalItems);

            alert(`${product.name} a été ajouté à votre panier!`);
        });
    }
});