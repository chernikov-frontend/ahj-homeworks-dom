

import Score from '../Score';

describe('Score', () => {
  let score;
  beforeEach(() => {
    document.body.innerHTML = '<div id="score"></div>';
    score = new Score();
  });

  test('должен инициализировать счет с нуля', () => {
    expect(score.getScore()).toBe(0);
  });

  test('должен увеличивать счет', () => {
    score.increment();
    expect(score.getScore()).toBe(1);
    expect(document.getElementById('score').textContent).toBe('Счет: 1');
  });
});
