class FancyButton extends HTMLButtonElement {
    constructor() {
        super();
        this.addEventListener('click', function (e) {this.innerText = 'I was clicked'});
    }
}

customElements.define('fancy-button', FancyButton, { extends: 'button' });