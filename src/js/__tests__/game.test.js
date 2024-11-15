import Game from '../Game';
import Goblin from '../Goblin';
import Score from '../Score';

jest.mock('../Goblin');
jest.mock('../Score');

describe('Game', () => {
  let game;
  beforeEach(() => {
    document.body.innerHTML = '<div id="game-board"></div>';
    Goblin.mockClear();
    Score.mockClear();
    game = new Game();
  });

  test('должен инициализировать игровое поле', () => {
    game.createBoard();
    expect(document.querySelectorAll('.cell').length).toBe(game.boardSize * game.boardSize);
  });

  test('должен запускать игру', () => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setInterval');
    game.startGame();
    expect(setInterval).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });

  test('должен завершать игру после превышения количества промахов', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    game.missedClicks = game.maxMissed;
    game.endGame();
    expect(window.alert).toHaveBeenCalledWith(`Игра окончена! Ваш счет: ${game.score.getScore()}`);
  });
});