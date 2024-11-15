// Тест для модуля Goblin
import Goblin from '../Goblin';

describe('Goblin', () => {
  let goblin;
  beforeEach(() => {
    goblin = new Goblin();
  });

  test('должен создавать элемент гоблина', () => {
    expect(goblin.getElement().classList.contains('goblin')).toBe(true);
  });

  test('должен показывать гоблина в указанной ячейке', () => {
    const cell = document.createElement('div');
    goblin.show(cell);
    expect(cell.contains(goblin.getElement())).toBe(true);
    expect(goblin.isVisible).toBe(true);
  });

  test('должен скрывать гоблина', () => {
    const cell = document.createElement('div');
    goblin.show(cell);
    goblin.hide();
    expect(goblin.isVisible).toBe(false);
    expect(cell.children.length).toBe(0);
  });
});


