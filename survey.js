class Survey {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.form = this.container.querySelector('#survey-form');
        this.resultsBox = this.container.querySelector('#survey-results');
        this.storageKeys = {
            votes: 'surveyResponses',
            userVote: 'surveyVote'
        };
        this.responses = { oui: 0, non: 0 };

        this.initSurvey();
    }

    initSurvey() {
        this.loadVotes();
        
        if (localStorage.getItem(this.storageKeys.userVote)) {
            this.displayResults();
            return;
        }

        this.form?.addEventListener('submit', this.handleVote.bind(this));
    }

    handleVote(e) {
        e.preventDefault();
        const selected = this.form.querySelector('input[name="response"]:checked');
        
        if (!selected) {
            alert('Veuillez sélectionner une option.');
            return;
        }

        this.registerVote(selected.value);
        this.displayResults();
    }

    loadVotes() {
        const savedVotes = localStorage.getItem(this.storageKeys.votes);
        if (savedVotes) this.responses = JSON.parse(savedVotes);
    }

    registerVote(vote) {
        this.responses[vote] = (this.responses[vote] || 0) + 1;
        
        localStorage.setItem(this.storageKeys.votes, JSON.stringify(this.responses));
        localStorage.setItem(this.storageKeys.userVote, 'voted');
    }

    displayResults() {
        if (!this.form || !this.resultsBox) return;

        this.form.style.display = 'none';
        this.resultsBox.style.display = 'block';

        const total = this.calculateTotalVotes();
        this.resultsBox.innerHTML = this.generateResultsHTML(total);
    }

    calculateTotalVotes() {
        return Object.values(this.responses).reduce((sum, count) => sum + count, 0);
    }

    generateResultsHTML(totalVotes) {
        return `
            <h3>Résultats du sondage :</h3>
            <ul>
                ${Object.entries(this.responses).map(([option, count]) => `
                    <li>
                        <strong>${option}:</strong> 
                        ${count} vote(s) - ${this.calculatePercentage(count, totalVotes)}%
                    </li>
                `).join('')}
            </ul>
        `;
    }

    calculatePercentage(count, total) {
        return total > 0 ? ((count / total) * 100).toFixed(1) : 0;
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => new Survey('survey-container'));
