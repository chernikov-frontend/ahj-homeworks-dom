import Goblin from './Goblin.js';
import Score from './Score.js';

export default class Game {
    constructor(boardSize = 4) {
        this.boardSize = boardSize;
        this.board = document.getElementById('game-board');
        this.goblin = new Goblin();
        this.score = new Score();
        this.missedClicks = 0;
        this.maxMissed = 5;
        this.interval = null;
        this.timeout = null; 
    }

    init() {
        this.createBoard();
        this.startGame();
    }

    createBoard() {
        this.board.innerHTML = '';

        for (let i = 0; i < this.boardSize * this.boardSize; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            this.board.appendChild(cell);
        }

        // Делегирование события клика на уровне контейнера board
        this.board.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('cell') && !target.contains(this.goblin.getElement())) {
                this.missedClicks++;
                console.log(`Промах номер: ${this.missedClicks} (клик по клетке)`); // Логирование на промах при клике по клетке
                if (this.missedClicks >= this.maxMissed) {
                    this.endGame();
                }
            }
        });
    }

    startGame() {
        this.interval = setInterval(() => {
            this.moveGoblin();
        }, 1000);
    }

    moveGoblin() {
        const cells = document.querySelectorAll('.cell');
        const randomIndex = Math.floor(Math.random() * cells.length);
        this.goblin.show(cells[randomIndex]);

        // Очистка предыдущего таймаута, если гоблин был пойман или перемещен
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        this.goblin.getElement().onclick = (event) => {
            event.stopPropagation(); // Остановка всплытия события, чтобы не учитывать успешный клик как промах
            this.score.increment();
            this.goblin.hide();
            console.log('Гоблин пойман и скрыт.'); // Логирование успешного клика на гоблина
            // Сброс missedClicks при успешном клике на гоблина
            this.missedClicks = 0;

            // Очистка таймаута, чтобы предотвратить его выполнение после клика
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
        };

        // Увеличение счетчика промахов, если гоблин не был пойман за 1 секунду
        this.timeout = setTimeout(() => {
            if (this.goblin.isVisible) {
                this.missedClicks++;
                console.log(`Промах номер: ${this.missedClicks} (гоблин не пойман)`); // Логирование на промах при непойманном гоблине
                this.goblin.hide();
            }
            if (this.missedClicks >= this.maxMissed) {
                this.endGame();
            }
        }, 1000);
    }

    endGame() {
        clearInterval(this.interval);
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        alert(`Игра окончена! Ваш счет: ${this.score.getScore()}`);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    game.init();
});