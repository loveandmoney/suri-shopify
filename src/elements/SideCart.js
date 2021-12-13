import { fetchConfig } from '../utils/helpers';

class SideCart extends HTMLElement {
  //
  // 1. init

  // global consts go here (not DOM stuff; requires execution)
  example = `example`; // not const

  // reserved function name constructor()
  constructor() {
    // reserved function name super()
    super();
    // assign member variables (this.*) for all DOM operations we might want later
    // static DOM objects that are never deleted
    this.sideCart = document.getElementById(`side-cart`);
    this.closeButton = document.getElementById(`side-cart-close`);
    this.sideCartOverlay = document.getElementById(`side-cart-overlay`);

    this.mainCartListEmpty = document.getElementById(`main-cart-list-empty`);
    this.mainCartListTemplate = document.getElementById(
      `main-cart-list-template`
    );
    this.sideCartItemTemplate = document.getElementById(
      `side-cart-item-template`
    );

    // dynamic DOM objects that change and require re-query sometimes
    // this.cartList = document.getElementById(`side-cart-list`);
  }

  //
  // 2. (add) listeners

  // componentDidMount
  connectedCallback() {
    this.addListeners();
  }

  addListeners = () => {
    if (!this?.sideCart) {
      return;
    }

    if (this?.closeButton) {
      this.closeButton.addEventListener(`click`, e => {
        this.closeCart();
      });
    }

    if (this?.sideCartOverlay) {
      this.sideCartOverlay.addEventListener(`click`, e => {
        this.closeCart();
      });
    }

    this.addEventListener(`lam:cart-add`, () => {
      console.log(`lam:cart-add`);
      this.onAddToCart();
    });
  };

  //
  // 3. (on) refresh live areas

  closeCart = () => {
    this.sideCart.setAttribute(`aria-hidden`, `true`);
  };

  onAddToCart = async () => {
    const cartResponse = await this.fetchCart();

    console.log(`cartResponse`, cartResponse);
    // do things unique to the add operation

    if (mainCartListEmpty) {
      this.mainCartListEmpty.remove();
    }
  };

  // onDeleteFromCart = () => {
  //   // this.refreshCartList();
  //   // do things unique to the delete operation
  // };

  //
  // 4. (do) all general stuff

  fetchCart = () => {
    return fetch(routes.cart_url, {
      ...fetchConfig()
    }).then(res => res.json());
  };
}

customElements.define(`side-cart`, SideCart);
