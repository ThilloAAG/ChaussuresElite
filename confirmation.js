document.addEventListener('DOMContentLoaded', function() {
    const order = JSON.parse(localStorage.getItem('currentOrder'));
    const orderNumberEl = document.getElementById('order-number');
    const customerEmailEl = document.getElementById('customer-email');
    const orderSummaryEl = document.getElementById('order-summary');

    if (order) {
        orderNumberEl.textContent = order.orderNumber;
        customerEmailEl.textContent = order.customer.email;

        let html = '';
        let subtotal = 0;

        order.cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            html += `
                <div class="order-item">
                    <p>${item.name} x ${item.quantity}</p>
                    <p>${itemTotal.toFixed(2)}€</p>
                </div>
            `;
        });

        html += `
            <div class="order-total">
                <p>Sous-total</p>
                <p>${subtotal.toFixed(2)}€</p>
            </div>
            <div class="order-total">
                <p>Livraison</p>
                <p>Gratuite</p>
            </div>
            <div class="order-total grand-total">
                <p>Total</p>
                <p>${subtotal.toFixed(2)}€</p>
            </div>
            <div class="shipping-info">
                <h4>Adresse de livraison</h4>
                <p>${order.customer.firstName} ${order.customer.lastName}</p>
                <p>${order.customer.address}</p>
                <p>${order.customer.zipCode} ${order.customer.city}</p>
            </div>
        `;

        orderSummaryEl.innerHTML = html;

        // Mettre à jour le compteur du panier (maintenant vide)
        document.querySelectorAll('#cart-count').forEach(el => el.textContent = '0');
    } else {
        // Rediriger si aucune commande n'est enregistrée
        window.location.href = 'index.html';
    }
});