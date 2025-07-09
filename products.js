document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('all-products');
    const priceSlider = document.getElementById('price-slider');
    const maxPriceDisplay = document.getElementById('max-price');
    let allProducts = [], filteredProducts = [];

    // Charger les produits
    fetch('products.json')
        .then(res => res.json())
        .then(products => {
            allProducts = products;
            filteredProducts = [...products];
            displayProducts(filteredProducts);

            // Initialiser le slider de prix
            const prices = products.map(p => p.price);
            priceSlider.min = Math.min(...prices);
            priceSlider.max = Math.max(...prices);
            priceSlider.value = priceSlider.max;
            maxPriceDisplay.textContent = `${priceSlider.value}€`;
            
            priceSlider.addEventListener('input', () => {
                maxPriceDisplay.textContent = `${priceSlider.value}€`;
            });
        });

    // Afficher les produits
    const displayProducts = products => {
        productsContainer.innerHTML = products.length ? 
            products.map(product => `
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
            `).join('') : 
            '<p class="no-results">Aucun produit ne correspond à vos critères.</p>';

        // Gestion des clics sur "Ajouter au panier" avec event delegation
        productsContainer.addEventListener('click', e => {
            if (!e.target.classList.contains('add-to-cart')) return;
            e.preventDefault();
            
            const productId = parseInt(e.target.dataset.id);
            const product = allProducts.find(p => p.id === productId);
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const item = cart.find(item => item.id === productId);

            item ? item.quantity++ : cart.push({...product, quantity: 1});
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount(cart);
            alert(`${product.name} ajouté au panier.`);
        });
    };

    // Mettre à jour le compteur du panier
    const updateCartCount = cart => {
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelectorAll('#cart-count').forEach(el => el.textContent = total);
    };

    // Appliquer les filtres
    document.getElementById('apply-filters').addEventListener('click', () => {
        const maxPrice = parseFloat(priceSlider.value);
        const categories = [...document.querySelectorAll('input[name="category"]:checked')]
                         .map(checkbox => checkbox.value);

        filteredProducts = allProducts.filter(p => 
            p.price <= maxPrice && (!categories.length || categories.includes(p.category))
        );
        applySort();
    });

    // Réinitialiser les filtres
    document.getElementById('reset-filters').addEventListener('click', () => {
        filteredProducts = [...allProducts];
        priceSlider.value = priceSlider.max;
        maxPriceDisplay.textContent = `${priceSlider.value}€`;
        document.getElementById('sort').value = 'default';
        displayProducts(filteredProducts);
    });

    // Trier les produits
    document.getElementById('sort').addEventListener('change', applySort);

    const applySort = () => {
        const sortValue = document.getElementById('sort').value;
        const sorts = {
            'price-asc': (a, b) => a.price - b.price,
            'price-desc': (a, b) => b.price - a.price,
            'name-asc': (a, b) => a.name.localeCompare(b.name),
            'name-desc': (a, b) => b.name.localeCompare(a.name)
        };
        if (sorts[sortValue]) filteredProducts.sort(sorts[sortValue]);
        displayProducts(filteredProducts);
    };
});
