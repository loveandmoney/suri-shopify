const SideCart = () => {
  if (typeof window === `undefined`) {
    return;
  }

  // ---------------------------------------------------------------------------
  // DOM

  const sideCart = document.getElementById(`side-cart`);
  const closeButton = document.getElementById(`side-cart-close`);
  const sideCartOverlay = document.getElementById(`side-cart-overlay`);

  // ---------------------------------------------------------------------------
  // initialization

  const addListeners = () => {
    if (closeButton) {
      closeButton.addEventListener(`click`, e => {
        sideCart.setAttribute('aria-hidden', 'true');
      });
    }

    if (sideCartOverlay) {
      sideCartOverlay.addEventListener(`click`, e => {
        sideCart.setAttribute('aria-hidden', 'true');
      });
    }
  };

  // ---------------------------------------------------------------------------
  // execution
  const main = () => {
    addListeners();
  };

  main();
};

export default SideCart;
