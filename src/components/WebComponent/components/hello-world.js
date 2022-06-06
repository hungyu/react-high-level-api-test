class HelloWorld extends HTMLElement {
    constructor() {
        super();
        this.name = 'Josh';
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'closed' });
        const msg = `hello, my name is ${this.name}`;
        const template = document.getElementById('hello-world').content.cloneNode(true);
        Array.from( template.querySelectorAll('.hw-text') )
            .forEach( n => n.textContent = msg );
    
        shadow.append(template)
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }
}

window.customElements.define('hello-world', HelloWorld);
