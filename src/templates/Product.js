const Product = () => {
  if (typeof window === `undefined`) {
    return;
  }

  // ---------------------------------------------------------------------------
  // DOM
  
  const allVariantData = JSON.parse(document.getElementById(`variant-data`).textContent);
  const activeVariant = document.getElementById(`buy-button-identifier`);

  const buyButton = document.getElementById(`buy-button`);;
  const buyButtonText = buyButton.querySelector(`.button-text`);
  const expanders = document.querySelectorAll(`.main-product__expander`);
  const quantityInput = document.getElementById(`product-quantity`);
  const quantityUp = document.getElementById(`product-quantity-up`);
  const quantityDown = document.getElementById(`product-quantity-down`);
  const variantPickers = document.querySelectorAll(`.variant-picker`);

  // ---------------------------------------------------------------------------
  // variables

  const displayedVariantText = {};
  const selectedOptions = [];
  
  let activeExpander = null;

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
    if (!activeVariant) {
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

    activeVariant.value = matchedVariant.id;
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
  }

  const addListeners = () => {
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