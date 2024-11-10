// TODO: write code here

// Логика перемещения элемента
window.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const size = 4;

    // Создание поля 4x4
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        gameBoard.appendChild(cell);
    }

    const cells = document.querySelectorAll('.cell');
    const gnome = document.createElement('div');
    gnome.classList.add('goblin');

    // Функция для случайного выбора ячейки
    function getRandomCell() {
        let index;
        do {
            index = Math.floor(Math.random() * cells.length);
        } while (cells[index].contains(gnome));
        return cells[index];
    }

    // Установка персонажа в случайную ячейку при загрузке
    const initialCell = getRandomCell();
    initialCell.appendChild(gnome);

    // Перемещение персонажа каждые 1000 мс
    setInterval(() => {
        const newCell = getRandomCell();
        newCell.appendChild(gnome);
    }, 1000);
});

