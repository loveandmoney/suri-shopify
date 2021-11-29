import { fetchConfig } from "../utils/helpers";

const Cart = () => {
  if (typeof window === `undefined`) {
    return;
  }

  const cartItemInputs = document.querySelectorAll(`.cart-item-quantity`);
  const cartItemAdjustUp = document.querySelectorAll(`.cart-item-adjust--up`);
  const cartItemAdjustDown = document.querySelectorAll(`.cart-item-adjust--down`);
  const quantityAdjustors = document.querySelectorAll(`.main-cart__quantity`);
  const cartSummary = document.getElementById(`main-cart-summary`);
  const liveElements = document.querySelectorAll(`.js-bound`);

  let updateTimeout;

  let inputsById = {};

  const updateLiveElements = ({
    items_subtotal_price,
    total_price
  }) => {
    if (!liveElements?.[0]) {
      return;
    }

    if (updateTimeout) {
      clearTimeout(updateTimeout);
    }

    liveElements.forEach(liveElement => {
      const bindingId = liveElement.getAttribute(`data-binding-id`);

      switch(bindingId) {
        case `cart-subtotal`:
          liveElement.innerHTML = `£${parseFloat(items_subtotal_price / 100).toFixed(2)}`;
          break;
        
        case `cart-tax`:
          liveElement.innerHTML = `£${parseFloat(total_price * .001).toFixed(2)}`;
          break;

        case `cart-total`:
          liveElement.innerHTML = `£${parseFloat(total_price / 100).toFixed(2)}`;
          break;

        default:
          break;
      }
    });

    if (cartSummary) {
      updateTimeout = setTimeout(() => {
        if (quantityAdjustors?.[0]) {
          quantityAdjustors.forEach(adjustor => {
            adjustor.classList.remove(`updating`);
          });
        }

        if (cartSummary) {
          cartSummary.classList.remove(`updating`);
        }
      }, 500);
    }
  }

  const updateQuantity = (line, quantity) => {
    console.log(`line: `, line);
    console.log(`quantity: `, quantity);

    const body = JSON.stringify({
      line,
      quantity,
      sections_url: window.location.pathname
    });

    if (quantityAdjustors?.[0]) {
      quantityAdjustors.forEach(adjustor => {
        adjustor.classList.add(`updating`);
      });
    }

    if (cartSummary) {
      cartSummary.classList.add(`updating`);
    }

    fetch(`${routes.cart_change_url}`, {
      ...fetchConfig(),
      ...{ body }
    }).then((response) => {
      return response.text()
    }).then(state => {
      const parsedState = JSON.parse(state);

      updateLiveElements(parsedState);
    });
  }

  //

  const parseData = () => {
    if (!cartItemInputs?.[0]) {
      return;
    }

    cartItemInputs.forEach(cartItemInput => {
      const variantId = cartItemInput.getAttribute(`data-id`);

      inputsById = {
        ...inputsById,
        [variantId]: cartItemInput
      };
    });

    console.log(inputsById);
  }

  const addListeners = () => {
    if (cartItemAdjustUp?.[0]) {
      cartItemAdjustUp.forEach((cartItemAdjust, adjustIndex) => {
        cartItemAdjust.addEventListener(`click`, e => {
          const variantId = cartItemAdjust.getAttribute(`data-id`);
          const input = inputsById?.[variantId];

          if (!variantId || !input) {
            return;
          }

          input.stepUp();
          input.dispatchEvent(new Event(`change`));
        });
      });
    }
    
    if (cartItemAdjustDown?.[0]) {
      cartItemAdjustDown.forEach(cartItemAdjust => {
        cartItemAdjust.addEventListener(`click`, e => {
          const variantId = cartItemAdjust.getAttribute(`data-id`);
          const input = inputsById?.[variantId];
  
          if (!variantId || !input || parseInt(input?.value) === 1) {
            return;
          }

          input.stepDown();
          input.dispatchEvent(new Event(`change`));
        });
      });
    }

    if (cartItemInputs?.[0]) {
      cartItemInputs.forEach((cartItemInput) => {
        cartItemInput.addEventListener(`change`, e => {
          console.log(`onChange`);

          const line = e.currentTarget.getAttribute(`data-index`);
          const quantity = parseInt(e.currentTarget.value);

          updateQuantity(line, quantity);
        });
      });
    }
  }

  //

  const main = () => {
    parseData();
    addListeners();
  }

  main();
};

export default Cart;