document.addEventListener('DOMContentLoaded', function () {
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total');
    const cartCountEls = document.querySelectorAll('#cart-count');
    const checkoutBtn = document.getElementById('checkout-btn');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Votre panier est vide</p>';
            subtotalEl.textContent = '0€';
            totalEl.textContent = '0€';
            checkoutBtn.style.display = 'none';
            updateCartCount();
            return;
        }

        checkoutBtn.style.display = 'block';
        let subtotal = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            const itemEl = document.createElement('div');
            itemEl.classList.add('cart-item');
            itemEl.innerHTML = `
                <div class="item-image">
                    <img src="images/${item.image}" alt="${item.name}">
                </div>
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>Prix: ${item.price}€</p>
                    <div class="quantity-controls">
                        <button class="btn quantity-btn minus" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="btn quantity-btn plus" data-index="${index}">+</button>
                    </div>
                    <p>Total: ${itemTotal.toFixed(2)}€</p>
                    <button class="btn remove-btn" data-index="${index}">Supprimer</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemEl);
        });

        subtotalEl.textContent = `${subtotal.toFixed(2)}€`;
        totalEl.textContent = `${subtotal.toFixed(2)}€`; // Livraison gratuite

        updateCartCount();

        // Gestion des boutons
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', function () {
                const index = parseInt(this.getAttribute('data-index'));
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartDisplay();
            });
        });

        document.querySelectorAll('.quantity-btn.minus').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCartDisplay();
                }
            });
        });

        document.querySelectorAll('.quantity-btn.plus').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                cart[index].quantity += 1;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartDisplay();
            });
        });
    }

    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountEls.forEach(el => el.textContent = totalItems);
    }

    updateCartDisplay();
});