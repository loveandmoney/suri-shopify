import { fetchConfig } from "../utils/helpers";

const Product = () => {
  if (typeof window === `undefined`) {
    return;
  }

  // ---------------------------------------------------------------------------
  // DOM
  
  const allVariantData = JSON.parse(document.getElementById(`variant-data`).textContent);
  const activeVariantInput = document.getElementById(`buy-button-identifier`);
  
  let activeVariant = allVariantData?.[0];

  //

  const addToCartForm = document.getElementById(`product-form-add`);
  const addWidget = document.getElementById(`add-widget`);
  const addWidgetItem = document.getElementById(`add-widget-item`);
  const addWidgetQuantity = document.getElementById(`add-widget-quantity`);
  const buyButton = document.getElementById(`buy-button`);
  const buyButtonText = buyButton.querySelector(`.button-text`);
  const expanders = document.querySelectorAll(`.main-product__expander`);
  const quantityInput = document.getElementById(`product-quantity`);
  const quantityUp = document.getElementById(`product-quantity-up`);
  const quantityDown = document.getElementById(`product-quantity-down`);
  const variantImage = document.getElementById(`product-variant-image`);
  const variantPickers = document.querySelectorAll(`.variant-picker`);

  // ---------------------------------------------------------------------------
  // variables

  const displayedVariantText = {};
  const selectedOptions = [];
  
  let activeExpander = null;
  let widgetShowTimeout;
  let widgetHideTimeout;
  let widgetResetTimeout;

  // ---------------------------------------------------------------------------
  // methods

  const collapseAllExpanders  = () => {
    expanders.forEach((expander, expanderIndex) => {
      expander.classList.remove(`expanded`);
    });
  }

  const deSelectVariantPickersByName  = name => {
    variantPickers.forEach((picker, pickerIndex) => {
      if (picker?.name === name) {
        picker.parentNode.classList.remove(`active`);
      }
    });
  }

  const expandItem = (node, index) => {
    collapseAllExpanders();

    if (activeExpander === index) {
      activeExpander = null;
      node.classList.remove(`expanded`);
    } else {
      activeExpander = index;
      node.classList.add(`expanded`);
    }
  }

  const refreshQuantityStatus = (quantity) => {
    if (quantity === 1) {
      quantityDown.classList.add(`opacity-25`);
      quantityDown.classList.add(`pointer-events-none`);
    } else {
      quantityDown.classList.remove(`opacity-25`);
      quantityDown.classList.remove(`pointer-events-none`);
    }
  }

  const setQuantity = quantity => {
    if (!quantityInput || quantity < 1) {
      return;
    }

    refreshQuantityStatus(quantity);

    quantityInput.value = quantity;
  }

  const matchOptionsToVariant = () => {
    if (!activeVariantInput) {
      return;
    }

    let matchedVariant = null;

    allVariantData.forEach(variant => {
      if (matchedVariant) {
        return;
      }

      variant.options.forEach(option => {
        if (matchedVariant) {
          return;
        }

        if (option === selectedOptions?.[0]?.value) {
          matchedVariant = variant;
        }
      });
    });

    if (!matchedVariant?.id) {
      return;
    }

    if (matchedVariant?.available) {
      buyButton.disabled = false;
      buyButton.classList.remove(`button--disabled`);
      buyButtonText.innerHTML = `Pre-order Now`;
    } else {
      buyButton.disabled = true;
      buyButton.classList.add(`button--disabled`);
      buyButtonText.innerHTML = `Sold Out`;
    }
    
    activeVariant = matchedVariant;

    if (variantImage && matchedVariant?.featured_image?.src) {
      variantImage.src = matchedVariant.featured_image.src;
    }

    activeVariantInput.value = matchedVariant.id;
  }

  const resetWidgetTimeouts = () => {
    if (widgetShowTimeout) {
      clearTimeout(widgetShowTimeout);
    }
    
    if (widgetHideTimeout) {
      clearTimeout(widgetHideTimeout);
    }
    
    if (widgetResetTimeout) {
      clearTimeout(widgetResetTimeout);
    }
  }

  const selectOption = ({ name, value }) => {
    let changeIndex = null;

    selectedOptions.forEach((selectedOption, selectedOptionIndex) => {
      if (changeIndex !== null || selectedOption?.name !== name) {
        return;
      }

      changeIndex = selectedOptionIndex;
    });

    if (changeIndex !== null) {
      selectedOptions[changeIndex] = {
        name,
        value
      };

      matchOptionsToVariant();
    }
  }

  // ---------------------------------------------------------------------------
  // initialization

  const parseData = () => {
    variantPickers.forEach((picker, pickerIndex) => {
      const { checked, name, value } = picker;

      const displayedValue = document.getElementById(`variant-value-${name?.toLowerCase()?.replaceAll(` `, `-`)}`);

      if (displayedValue) {
        displayedVariantText[name] = displayedValue;
      }

      if (checked) {
        displayedValue.innerHTML = value;

        selectedOptions.push({
          name,
          value
        });
      }
    });

    if (variantImage && activeVariant?.featured_image?.src) {
      variantImage.src = activeVariant.featured_image.src;
    }
  }

  const addListeners = () => {
    if (addToCartForm) {
      console.log("here: ", addToCartForm);

      addToCartForm.addEventListener(`submit`, e => {
        e.preventDefault();

        if (buyButton?.classList?.contains(`button--disabled`)) {
          return false;
        }

        if (buyButton) {
          buyButton.classList.add(`button--disabled`);
          buyButton.setAttribute(`aria-disabled`, true);
        }

        resetWidgetTimeouts();

        const config = fetchConfig(`javascript`);
        config.headers[`X-Requested-With`] = `XMLHttpRequest`;
        delete config.headers[`Content-Type`];

        const formData = new FormData(addToCartForm);
        config.body = formData;

        console.log(config);

        fetch(`${routes.cart_add_url}`, config)
          .then((response) => response.json())
          .then((response) => {
            if (response.status) {
              console.log(`error: `, response.description);
              return;
            }

            console.log(`res: `, response);

            const { title, quantity } = response;

            if (addWidget && addWidgetItem && addWidgetQuantity) {
              addWidgetItem.innerHTML = title;
              addWidgetQuantity.innerHTML = quantity;

              widgetShowTimeout = setTimeout(() => {
                addWidget.classList.add(`active`);
              }, 100);

              widgetHideTimeout = setTimeout(() => {
                addWidget.classList.remove(`active`);
              }, 4000);

              widgetResetTimeout = setTimeout(() => {
                addWidgetItem.innerHTML = ``;
                addWidgetQuantity.innerHTML = ``;
              }, 4500);
            }
          })
          .catch((e) => {
            console.error(e);
          })
          .finally(() => {
            buyButton.classList.remove(`button--disabled`);
            buyButton.setAttribute(`aria-disabled`, false);
          });
        
        return true;
      });
    }

    if (expanders?.[0]) {
      expanders.forEach((expander, expanderIndex) => {
        expander.addEventListener(`click`, e => {
          expandItem(expander, expanderIndex);
        });
      });
    }

    if (quantityUp) {
      quantityUp.addEventListener(`click`, e => {
        if (!quantityInput) {
          return;
        }

        const currentQuantity = parseInt(quantityInput.value);

        setQuantity(currentQuantity + 1);
      });
    }

    if (quantityDown) {
      quantityDown.addEventListener(`click`, e => {
        if (!quantityInput) {
          return;
        }

        const currentQuantity = parseInt(quantityInput.value);

        setQuantity(currentQuantity - 1);
      });
    }

    if (quantityInput) {
      quantityInput.addEventListener(`change`, e => {
        let newQuantity = e.currentTarget.value;

        if (!newQuantity) {
          newQuantity = 1;
          quantityInput.value = 1;
        }

        refreshQuantityStatus(parseInt(newQuantity));
      });
    }
    
    if (variantPickers?.[0]) {
      variantPickers.forEach((picker) => {
        picker.addEventListener(`change`, e => {
          const { name, value } = picker;

          deSelectVariantPickersByName(name);

          picker.parentNode.classList.add(`active`);
          
          if (displayedVariantText?.[name]) {
            displayedVariantText[name].innerHTML = value;
          }

          selectOption({ name, value });
        });
      });
    }
  }

  // ---------------------------------------------------------------------------
  // execution

  const main = () => {
    parseData();
    addListeners();
  }

  main();
};

export default Product;