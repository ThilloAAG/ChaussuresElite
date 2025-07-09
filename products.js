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
    fetch('data/products.json')
        .then(response => response.json())
        .then(products => {
            allProducts = products;
            filteredProducts = [...products];
            displayProducts(filteredProducts);

            // Initialiser le slider de prix
            const prices = products.map(p => p.price);
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);

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
            productsContainer.innerHTML = '<p class="no-results">Aucun produit ne correspond à vos critères.</p>';
            return;
        }

        products.forEach(product => {
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
            productsContainer.appendChild(productCard);
        });

        // Gestion des clics sur "Ajouter au panier"
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault();
                const productId = parseInt(this.getAttribute('data-id'));
                const product = allProducts.find(p => p.id === productId);

                let cart = JSON.parse(localStorage.getItem('cart')) || [];
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

                // Mettre à jour le compteur du panier
                const cartCountElements = document.querySelectorAll('#cart-count');
                const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
                cartCountElements.forEach(el => el.textContent = totalItems);

                alert(`${product.name} a été ajouté au panier.`);
            });
        });
    }

    // Appliquer les filtres
   
applyFiltersBtn.addEventListener('click', function () {
    const maxPrice = parseFloat(priceSlider.value);
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
                                  .map(checkbox => checkbox.value);

    filteredProducts = allProducts.filter(p => {
        const priceMatch = p.price <= maxPrice;
        const categoryMatch = selectedCategories.includes(p.category);
        return priceMatch && categoryMatch;
    });
    
    applySort();
});

    // Réinitialiser les filtres
    resetFiltersBtn.addEventListener('click', function () {
        filteredProducts = [...allProducts];

        const prices = allProducts.map(p => p.price);
        const maxPrice = Math.max(...prices);
        priceSlider.value = maxPrice;
        maxPriceDisplay.textContent = `${maxPrice}€`;

        sortSelect.value = 'default';
        displayProducts(filteredProducts);
    });

    // Trier les produits
    sortSelect.addEventListener('change', applySort);

    function applySort() {
        const sortValue = sortSelect.value;

        if (sortValue === 'price-asc') {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortValue === 'price-desc') {
            filteredProducts.sort((a, b) => b.price - a.price);
        } else if (sortValue === 'name-asc') {
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortValue === 'name-desc') {
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        }

        displayProducts(filteredProducts);
    }
});