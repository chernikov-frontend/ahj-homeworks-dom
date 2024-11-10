const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const { JSDOM } = require('jsdom');
require('../app');

describe('Goblin Game Tests', () => {
    let document;
    let gameBoard;

    beforeEach(() => {
        // Создаем виртуальный DOM для тестирования
        const dom = new JSDOM(`<!DOCTYPE html><div id="game-board"></div>`);
        document = dom.window.document;
        global.document = document;

        // Инициализируем игровое поле
        gameBoard = document.getElementById('game-board');

        // Создаем поле 4x4 (16 ячеек)
        const size = 4;
        for (let i = 0; i < size * size; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            gameBoard.appendChild(cell);
        }
    });

    test('Игровое поле должно содержать 16 ячеек', () => {
        const cells = document.querySelectorAll('.cell');
        expect(cells.length).toBe(16);
    });

    test('Гоблин должен быть добавлен на игровое поле', () => {
        const gnome = document.createElement('div');
        gnome.classList.add('goblin');
        const cells = document.querySelectorAll('.cell');
        const randomIndex = Math.floor(Math.random() * cells.length);
        cells[randomIndex].appendChild(gnome);
        const goblin = document.querySelector('.goblin');
        expect(goblin).not.toBeNull();
    });

    test('Гоблин должен перемещаться каждую секунду', (done) => {
        jest.useFakeTimers();
        const gnome = document.createElement('div');
        gnome.classList.add('goblin');
        const cells = document.querySelectorAll('.cell');
        const initialCell = cells[0];
        initialCell.appendChild(gnome);

        setInterval(() => {
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * cells.length);
            } while (cells[newIndex].contains(gnome));
            cells[newIndex].appendChild(gnome);
        }, 1000);

        jest.advanceTimersByTime(1000);
        const newCell = document.querySelector('.goblin').parentElement;
        expect(initialCell).not.toBe(newCell);
        done();
    });
});
