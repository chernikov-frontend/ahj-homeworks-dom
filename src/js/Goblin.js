export default class Goblin {
    constructor() {
        this.goblinElement = document.createElement('div');
        this.goblinElement.classList.add('goblin');
        this.isVisible = false;
        }
    
    show(cell) {
    if (this.isVisible) {
        this.hide();
    }
    cell.appendChild(this.goblinElement);
    this.isVisible = true;
    }

    hide() {
    if (this.goblinElement.parentElement) {
        this.goblinElement.parentElement.replaceChildren();
    }
    this.isVisible = false;
    }

    getElement() {
    return this.goblinElement;
    }
}