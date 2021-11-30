import { fetchConfig } from "../utils/helpers";

const Header = () => {
  if (typeof window === `undefined`) {
    return;
  }

  // ---------------------------------------------------------------------------
  // DOM

  const checkoutButton = document.getElementById(`header-checkout-button`);

  // ---------------------------------------------------------------------------
  // initialization

  const addListeners = () => {
    if (checkoutButton) {
      checkoutButton.addEventListener(`click`, e => {
        // todo : insert analytics triggers if required
        // window.location.href = `/checkout`;
      });
    }
  }

  // ---------------------------------------------------------------------------
  // execution

  const main = () => {
    addListeners();
  }

  main();
};

export default Header;