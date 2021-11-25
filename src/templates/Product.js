const Product = () => {
  if (typeof window === `undefined`) {
    return;
  }

  console.log(`[template] Product`);
  
  //
  
  const expanders = document.querySelectorAll(`.main-product__expander`);
  const selectedOptions = [];
  const variantPickers = document.querySelectorAll(`.variant-picker`);
  const displayedVariantText = {};

  let activeExpander = null;

  //

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

  const expandItem  = (node, index) => {
    collapseAllExpanders();

    if (activeExpander === index) {
      activeExpander = null;
      node.classList.remove(`expanded`);
    } else {
      activeExpander = index;
      node.classList.add(`expanded`);
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
      }
    }
  }

  //

  const parseData = () => {
    variantPickers.forEach((picker, pickerIndex) => {
      const { checked, name, value } = picker;

      const displayedValue = document.getElementById(`variant-value-${name?.toLowerCase()?.replaceAll(` `, `-`)}`);

      if (displayedValue) {
        displayedVariantText[name] = displayedValue;
      }

      if (checked) {
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
    
    if (variantPickers?.[0]) {
      variantPickers.forEach((picker, pickerIndex) => {
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

  const main = () => {
    parseData();
    addListeners();
  }

  main();
};

export default Product;