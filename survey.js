<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sondage - Chaussures Élite</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <div class="container">
            <h1>Chaussures Élite</h1>
            <nav>
                <a href="index.html">Accueil</a>
                <a href="panier.html">Panier (<span id="cart-count">0</span>)</a>
            </nav>
        </div>
    </header>

    <main class="survey-page">
        <div class="container">
            <div class="survey-container">
                <h1>Votre avis compte!</h1>
                <p>Aidez-nous à améliorer votre expérience Chaussures Élite en répondant à ce court sondage.</p>
                
                <form id="survey-form">
                    <div class="form-group">
                        <label>Comment évaluez-vous votre expérience globale sur notre site?</label>
                        <div class="rating">
                            <input type="radio" id="star1" name="rating" value="5">
                            <label for="star1">★</label>
                            <input type="radio" id="star2" name="rating" value="4">
                            <label for="star2">★</label>
                            <input type="radio" id="star3" name="rating" value="3">
                            <label for="star3">★</label>
                            <input type="radio" id="star4" name="rating" value="2">
                            <label for="star4">★</label>
                            <input type="radio" id="star5" name="rating" value="1">
                            <label for="star5">★</label>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="easy-to-use">Le site était-il facile à utiliser?</label>
                        <select id="easy-to-use">
                            <option value="">-- Sélectionnez --</option>
                            <option value="5">Très facile</option>
                            <option value="4">Facile</option>
                            <option value="3">Neutre</option>
                            <option value="2">Difficile</option>
                            <option value="1">Très difficile</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="product-selection">Comment évaluez-vous notre sélection de produits?</label>
                        <select id="product-selection">
                            <option value="">-- Sélectionnez --</option>
                            <option value="5">Excellente</option>
                            <option value="4">Bonne</option>
                            <option value="3">Moyenne</option>
                            <option value="2">Médiocre</option>
                            <option value="1">Mauvaise</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="comments">Avez-vous des commentaires ou suggestions pour améliorer notre site?</label>
                        <textarea id="comments" rows="4"></textarea>
                    </div>
                    
                    <div class="form-actions">
                        <button type="submit" class="btn">Envoyer</button>
                    </div>
                </form>
            </div>
        </div>
    </main>

    <footer>
        <p>&copy; 2025 Chaussures Élite. Tous droits réservés.</p>
    </footer>

    <script src="survey.js"></script>
</body>
</html>
