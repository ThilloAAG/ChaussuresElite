class Survey {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.form = this.container.querySelector('#survey-form');
        this.resultsBox = this.container.querySelector('#survey-results');
        this.localStorageKey = 'surveyVote';
        this.responses = {
            oui: 0,
            non: 0
        };

        this.loadVotes();
        this.init();
    }

    init() {
        if (localStorage.getItem(this.localStorageKey)) {
            this.displayResults();
            return;
        }

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            const selected = this.form.querySelector('input[name="response"]:checked');
            if (!selected) {
                alert('Veuillez sélectionner une option.');
                return;
            }
            const vote = selected.value;
            this.saveVote(vote);
            this.displayResults();
        });
    }

    loadVotes() {
        const saved = localStorage.getItem('surveyResponses');
        if (saved) {
            this.responses = JSON.parse(saved);
        }
    }

    saveVote(vote) {
        if (this.responses[vote] !== undefined) {
            this.responses[vote] += 1;
        } else {
            this.responses[vote] = 1;
        }
        localStorage.setItem('surveyResponses', JSON.stringify(this.responses));
        localStorage.setItem(this.localStorageKey, 'voted');
    }

    displayResults() {
        this.form.style.display = 'none';
        this.resultsBox.style.display = 'block';

        const totalVotes = Object.values(this.responses).reduce((a, b) => a + b, 0);

        let html = '<h3>Résultats du sondage :</h3><ul>';
        for (const [key, value] of Object.entries(this.responses)) {
            const percent = ((value / totalVotes) * 100).toFixed(1);
            html += `<li><strong>${key}:</strong> ${value} vote(s) - ${percent}%</li>`;
        }
        html += '</ul>';

        this.resultsBox.innerHTML = html;
    }
}

// Initialisation après chargement
document.addEventListener('DOMContentLoaded', function () {
    new Survey('survey-container');
});