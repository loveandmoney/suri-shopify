import { fetchConfig } from '../utils/helpers';

const Header = () => {
  if (typeof window === `undefined`) {
    return;
  }

  // ---------------------------------------------------------------------------
  // DOM

  const cartButton = document.getElementById(`header-cart-button`);
  const checkoutButton = document.getElementById(`header-checkout-button`);
  const sideCart = document.getElementById(`side-cart`);

  // ---------------------------------------------------------------------------
  // initialization

  const addListeners = () => {
    if (cartButton) {
      cartButton.addEventListener(`click`, e => {
        sideCart.setAttribute('aria-hidden', 'false');
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

export default Header;
