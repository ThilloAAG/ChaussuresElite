document.addEventListener('DOMContentLoaded', function() {
    // Mettre à jour le compteur du panier
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('#cart-count').forEach(el => el.textContent = totalItems);

    // Gestion du formulaire
    const checkoutForm = document.getElementById('checkout-form');
    
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Valider le formulaire
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const zipCode = document.getElementById('zip-code').value;
        
        if (!firstName || !lastName || !email || !address || !city || !zipCode) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }
        
        // Enregistrer les informations de commande
        const order = {
            customer: {
                firstName,
                lastName,
                email,
                address,
                city,
                zipCode,
                phone: document.getElementById('phone').value
            },
            paymentMethod: document.querySelector('input[name="payment"]:checked').value,
            cart: cart,
            date: new Date().toISOString(),
            orderNumber: Math.floor(Math.random() * 1000000)
        };
        
        localStorage.setItem('currentOrder', JSON.stringify(order));
        localStorage.removeItem('cart');
        
        // Rediriger vers la page de confirmation
        window.location.href = 'confirmation.html';
    });
});