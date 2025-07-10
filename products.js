document.addEventListener('DOMContentLoaded', function () {
    const productsContainer = document.getElementById('all-products');
    const applyFiltersBtn = document.getElementById('apply-filters');
    const resetFiltersBtn = document.getElementById('reset-filters');
    const sortSelect = document.getElementById('sort');
    const priceSlider = document.getElementById('price-slider');
    const minPriceDisplay = document.getElementById('min-price');
    const maxPriceDisplay = document.getElementById('max-price');

    let allProducts = [];
    let filteredProducts = [];

    // Charger les produits
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            allProducts = products;
            filteredProducts = [...products];
            displayProducts(filteredProducts);

            // Initialiser le slider de prix
            const minPrice = 20; // Valeur minimale fixe (ou utiliser Math.min(...products.map(p => p.price)))
            const maxPrice = 100; // Valeur maximale fixe

            priceSlider.min = minPrice;
            priceSlider.max = maxPrice;
            priceSlider.value = maxPrice;

            minPriceDisplay.textContent = `${minPrice}€`;
            maxPriceDisplay.textContent = `${maxPrice}€`;

            priceSlider.addEventListener('input', () => {
                maxPriceDisplay.textContent = `${priceSlider.value}€`;
            });
        });

    // Afficher les produits
    function displayProducts(products) {
        productsContainer.innerHTML = '';

        if (products.length === 0) {
            productsContainer.innerHTML = '<p class="no-results">Aucun produit trouvé.</p>';
            return;
        }

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <a href="product-detail.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <div class="product-price">${product.price}€</div>
                    <button class="btn add-to-cart" data-id="${product.id}">Ajouter au panier</button>
                </a>
            `;
            productsContainer.appendChild(productCard);
        });

        // Gestion du panier
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault();
                addToCart(parseInt(this.getAttribute('data-id')));
            });
        });
    }

    // Ajouter au panier
    function addToCart(productId) {
        const product = allProducts.find(p => p.id === productId);
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCounter();
        alert(`${product.name} ajouté au panier !`);
    }

    // Mettre à jour le compteur du panier
    function updateCartCounter() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelectorAll('#cart-count').forEach(el => el.textContent = totalItems);
    }

    // Appliquer les filtres
    applyFiltersBtn.addEventListener('click', function () {
        const maxPrice = parseFloat(priceSlider.value);
        const selectedCategories = Array.from(
            document.querySelectorAll('input[name="category"]:checked')
        ).map(checkbox => checkbox.value);

        filteredProducts = allProducts.filter(product => {
            const matchesPrice = product.price <= maxPrice;
            const matchesCategory = selectedCategories.length === 0 || 
                                  selectedCategories.includes(product.category);
            return matchesPrice && matchesCategory;
        });

        applySort();
    });

    // Réinitialiser les filtres
    resetFiltersBtn.addEventListener('click', function () {
        document.querySelectorAll('input[name="category"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        priceSlider.value = priceSlider.max;
        maxPriceDisplay.textContent = `${priceSlider.max}€`;
        filteredProducts = [...allProducts];
        displayProducts(filteredProducts);
    });

    // Trier les produits
    sortSelect.addEventListener('change', applySort);

    function applySort() {
        switch (sortSelect.value) {
            case 'price-asc':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }
        displayProducts(filteredProducts);
    }

    // Initialiser le compteur du panier
    updateCartCounter();
});
