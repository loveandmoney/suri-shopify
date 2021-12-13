
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
    
    // dynamic DOM objects that change and require re-query sometimes
    // this.cartList = document.getElementById(`side-cart-list`);

    // add listeners for all of these objects
    this.addListeners();
  }

  //
  // 2. (add) listeners
  
  addListeners = () => {
    // listen for cart_add
    // todo: test
    // document.body.addEventListener(`lam:cart-add`, this.onAddToCart, false);

    if (!this?.sideCart) {
      return;
    }

    if (this?.closeButton) {
      this.closeButton.addEventListener(`click`, e => {
        this.sideCart.setAttribute(`aria-hidden`, `true`);
      });
    }

    if (this?.sideCartOverlay) {
      this.sideCartOverlay.addEventListener(`click`, e => {
        this.sideCart.setAttribute('aria-hidden', 'true');
      });
    }

    //
    // broadcast receiver that an add happened somewhere
  }

  //
  // 3. (on) refresh live areas

  onAddToCart = () => {
    this.refreshCartList();
    // do things unique to the add operation
  }
  
  onDeleteFromCart = () => {
    this.refreshCartList();
    // do things unique to the delete operation
  }

  //
  // 4. (do) all general stuff

  refreshCartList = () => {
    // refetch maybe? or ignore, maybe it doesn't exist anymore etc.
    // this.cartList = document.getElementById(`side-cart-list`);
    console.log(`refreshCartList`);
  }
}

customElements.define(`side-cart`, SideCart);
