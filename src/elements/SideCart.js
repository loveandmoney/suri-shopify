import { fetchConfig } from '../utils/helpers';

class SideCart extends HTMLElement {
  //
  // 1. init
  constructor() {
    super();

    this.initialSideCartTemplate = document.getElementById(
      `initial-side-cart-template`
    );
    this.cartListTemplate = document.getElementById(`cart-list-template`);
    this.emptyCartListTemplate = document.getElementById(
      `empty-cart-list-template`
    );
    this.sideCartItemTemplate = document.getElementById(
      `side-cart-item-template`
    );

    this._contents = new DocumentFragment();
    this._contents.appendChild(
      this.initialSideCartTemplate.content.cloneNode(true)
    );

    this.sideCart = this._contents.getElementById(`side-cart`);
    this.closeButton = this._contents.getElementById(`side-cart-close`);
    this.sideCartOverlay = this._contents.getElementById(`side-cart-overlay`);
    this.sideCartContent = this._contents.getElementById(`side-cart-content`);
    this.mainCartListEmpty =
      this._contents.getElementById(`main-cart-list-empty`);
  }

  //
  // 2. (add) listeners

  connectedCallback() {
    this.appendChild(this._contents);
    this.addListeners();
  }

  addListeners = () => {
    if (!this?.sideCart) {
      return;
    }

    this.addEventListener(`lam:cart-open`, () => {
      this.sideCart.setAttribute('aria-hidden', 'false');
    });

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
      this.onAddToCart();
    });
  };

  //
  // 3. (on) refresh live areas

  onAddToCart = async () => {
    const cartResponse = await this.fetchCart();

    console.log(`cartResponse`, cartResponse);

    if (this.mainCartListEmpty) {
      this.mainCartListEmpty.remove();

      this.sideCartContent.appendChild(
        this.cartListTemplate.content.cloneNode(true)
      );
    }

    this.cartList = document.getElementById(`cart-list`);

    cartResponse.items.map(cartItem => {
      const item = document.createElement(`side-cart-item`);
      item.cartItem = cartItem;

      this.cartList.appendChild(item);
    });
  };

  onDeleteFromCart = () => {};

  //
  // 4. (do) all general stuff

  closeCart = () => {
    this.sideCart.setAttribute(`aria-hidden`, `true`);
  };

  fetchCart = () => {
    return fetch(routes.cart_url, {
      ...fetchConfig()
    }).then(res => res.json());
  };
}

customElements.define(`side-cart`, SideCart);
