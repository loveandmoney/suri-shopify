class SideCartItem extends HTMLElement {
  constructor() {
    super();

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);

    this.sideCartItemTemplate = document.getElementById(
      `side-cart-item-template`
    );

    this._contents = new DocumentFragment();
    this._contents.appendChild(
      this.sideCartItemTemplate.content.cloneNode(true)
    );

    this.quantityDownBtn = this._contents.querySelector(
      `#cart-item-quantity-down`
    );
    this.quantityUpBtn = this._contents.querySelector(`#cart-item-quantity-up`);
    this.quantityInput = this._contents.querySelector(`input`);
  }

  connectedCallback() {
    this.addEventListeners();
    this.appendChild(this._contents);
  }

  addEventListeners = () => {
    this.quantityUpBtn.addEventListener(`click`, this.increment);
    this.quantityDownBtn.addEventListener(`click`, this.decrement);
  };

  increment() {
    const newVal = +this.quantity + 1;
    this.quantity = +newVal;
  }

  decrement() {
    const newVal = +this.quantity - 1;
    this.quantity = +newVal;
  }

  get quantity() {
    return this.getAttribute('quantity');
  }

  set quantity(value) {
    this.setAttribute('quantity', value);
  }

  static get observedAttributes() {
    return ['quantity'];
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (attr === `quantity`) this.quantityInput.value = this.quantity;
  }

  disconnectedCallback() {
    this.quantityUpBtn.removeEventListener('click', this.increment);
    this.quantityDownBtn.removeEventListener('click', this.decrement);
  }
}

customElements.define(`side-cart-item`, SideCartItem);
