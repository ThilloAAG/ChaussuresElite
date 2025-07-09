document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-detail');
    const productId = new URLSearchParams(window.location.search).get('id');
    if (!productId) return productContainer.innerHTML = '<p>Produit non trouvé</p>';

    fetch('products.json')
        .then(res => res.json())
        .then(products => {
            const product = products.find(p => p.id == productId);
            product ? displayProduct(product) : productContainer.innerHTML = '<p>Produit non trouvé</p>';
        });

    const displayProduct = product => {
        productContainer.innerHTML = `
            <div class="product-detail-grid">
                <div class="product-images">
                    <img src="${product.image}" alt="${product.name}" class="main-image">
                </div>
                <div class="product-info">
                    <h1>${product.name}</h1>
                    <div class="price">${product.price}€</div>
                    <p class="description">Des chaussures de haute qualité pour un style incomparable.</p>
                    <button class="btn add-to-cart" data-id="${product.id}">Ajouter au panier</button>
                </div>
            </div>
        `;

        document.querySelector('.add-to-cart').addEventListener('click', () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const item = cart.find(item => item.id == product.id);
            
            item ? item.quantity++ : cart.push({
                ...product,
                quantity: 1
            });

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount(cart);
            alert(`${product.name} ajouté au panier !`);
        });
    };

    const updateCartCount = cart => {
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelectorAll('#cart-count').forEach(el => el.textContent = total);
    };
});
