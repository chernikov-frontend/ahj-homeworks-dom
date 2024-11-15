export default class Score {
    constructor() {
        this.score = 0;
        this.scoreElement = document.getElementById('score');
    }

    increment() {
        this.score++;
        this.updateScore();
    }

    getScore() {
        return this.score;
    }

    updateScore() {
        this.scoreElement.textContent = `Счет: ${this.score}`;
    }
}
