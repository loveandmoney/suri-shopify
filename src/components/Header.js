import { fetchConfig } from '../utils/helpers';

const Header = () => {
  if (typeof window === `undefined`) {
    return;
  }

  // ---------------------------------------------------------------------------
  // DOM

  const cartButton = document.getElementById(`header-cart-button`);
  const sideCartComponent = document.getElementById(`side-cart-component`);

  // ---------------------------------------------------------------------------
  // initialization

  const addListeners = () => {
    if (cartButton) {
      cartButton.addEventListener(`click`, e => {
        sideCartComponent.dispatchEvent(new Event(`lam:cart-open`));
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
