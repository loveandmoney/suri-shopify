import { fetchConfig, findAncestor } from '../utils/helpers';
import Swiper, { Navigation, Pagination } from 'swiper';

import 'swiper/css/bundle';

const Product = () => {
  if (typeof window === `undefined`) {
    return;
  }

  // ---------------------------------------------------------------------------
  // DOM

  //
  // variant parsing

  const allVariantData = JSON.parse(
    document.getElementById(`variant-data`).textContent
  );
  const activeVariantInput = document.getElementById(`buy-button-identifier`);
  const addOnData = JSON.parse(
    document.getElementById(`add-on-data`).textContent
  );
  const activeAddOnInput = document.getElementById(`add-on-button-identifier`);

  let activeVariant = allVariantData?.[0];
  let activeAddOn = addOnData?.variants?.[0];

  //

  const addToCartForm = document.getElementById(`product-form-add`);
  const addOnToCartForm = document.getElementById(`product-form-add-on`);
  const addOnButton = document.getElementById(`add-on-button`);
  const addOnButtonText = document.getElementById(`add-on-button-text`);
  const addOnImage = document.getElementById(`product-add-on-image`);

  // this could be a custom element that also listens for lam:cart-add
  const addWidget = document.getElementById(`add-widget`);
  const addWidgetItem = document.getElementById(`add-widget-item`);
  const addWidgetQuantity = document.getElementById(`add-widget-quantity`);
  //

  const buyButton = document.getElementById(`buy-button`);
  const buyButtonText = buyButton.querySelector(`.button-text`);
  const expanders = document.querySelectorAll(`.main-product__expander`);
  const headerCartQuantity = document.getElementById(`cart-quantity`);
  const headerCartQuantityContainer = document.getElementById(
    `cart-quantity-container`
  );
  const loadableImageTags = document.querySelectorAll(`.loadable-image`);
  const quantityInput = document.getElementById(`product-quantity`);
  const quantityUp = document.getElementById(`product-quantity-up`);
  const quantityDown = document.getElementById(`product-quantity-down`);
  const variantPickers = document.querySelectorAll(`.variant-picker`);
  const xsSwipers = document.querySelectorAll(`.main-product__swiper`);

  const sideCartContent = document.getElementById(`side-cart-content`);
  const mainCartListEmpty = document.getElementById(`main-cart-list-empty`);
  // const mainCartList = document.getElementById(`main-cart-list`);

  const mainCartListTemplate = document.getElementById(
    `main-cart-list-template`
  );
  const sideCartItemTemplate = document.getElementById(
    `side-cart-item-template`
  );

  // ---------------------------------------------------------------------------
  // variables

  const displayedVariantText = {};
  const selectedOptions = [];
  const swipers = {};

  let activeExpander = null;
  let device;
  let widgetShowTimeout;
  let widgetHideTimeout;
  let widgetResetTimeout;

  // ---------------------------------------------------------------------------
  // methods

  const refreshGallery = () => {
    if (!device || !activeVariant) {
      return;
    }

    // add-on section switcher
    if (activeVariant?.featured_image?.src && addOnImage) {
      addOnImage.src = activeVariant.featured_image.src;
    }

    // variant-driven imagery
    const loadableColor = activeVariant?.option1
      ?.replace(` `, `-`)
      ?.toLowerCase()
      ?.trim();

    if (device === `xs`) {
      if (xsSwipers?.[0]) {
        let activeSwiper;

        xsSwipers.forEach(swiper => {
          swiper.classList.add(`invisible`);

          if (activeSwiper) {
            return;
          }

          const key = swiper.getAttribute(`data-key`);

          if (key === loadableColor) {
            activeSwiper = swiper;
          }
        });

        if (activeSwiper) {
          activeSwiper.classList.remove(`invisible`);

          if (!swipers?.[loadableColor]) {
            const swiperImages = activeSwiper.querySelectorAll(`.swiper-image`);

            if (swiperImages?.[0]) {
              swiperImages.forEach(swiperImage => {
                const src = swiperImage.getAttribute(`data-src`);
                const srcSet = swiperImage.getAttribute(`data-srcset`);

                swiperImage.setAttribute(`src`, src);
                swiperImage.setAttribute(`srcset`, srcSet);
              });
            }

            const swiper = new Swiper(
              `.swiper--product-gallery-${loadableColor}`,
              {
                modules: [Navigation, Pagination],
                loop: false,
                pagination: {
                  el: `.swiper-pagination--product-gallery-${loadableColor}`,
                  type: `bullets`
                }
              }
            );

            swipers[loadableColor] = swiper;
          }
        }
      }
    } else if (loadableImageTags?.[0]) {
      const loadableClasses = [
        `xl:${loadableColor}:default`,
        `xl:${loadableColor}:full`
      ];

      const gallery = {};

      loadableImageTags.forEach(img => {
        const loadableKey = img?.getAttribute(`data-loadablekey`);

        if (!gallery?.[loadableKey]) {
          gallery[loadableKey] = [];
        }

        const parent = findAncestor(img, `loadable-image-parent`);

        if (parent) {
          gallery[loadableKey].push({
            img,
            parent
          });
        }
      });

      const galleryKeys = Object.keys(gallery);

      if (galleryKeys?.[0]) {
        galleryKeys.forEach(loadableKey => {
          const galleryItems = gallery?.[loadableKey];

          galleryItems.forEach(({ img, parent }) => {
            if (!img || !parent) {
              return;
            }

            if (!loadableClasses?.includes(loadableKey)) {
              parent.classList.add(`hidden`);
              return;
            }

            const src = img.getAttribute(`data-src`);
            const srcSet = img.getAttribute(`data-srcset`);

            img.setAttribute(`src`, src);
            img.setAttribute(`srcset`, srcSet);

            img.onload = () => {
              img.classList.add(`loaded`);
            };

            parent.classList.remove(`hidden`);
          });
        });
      }
    }
  };

  const onDeviceChange = () => {
    refreshGallery();
  };

  const detectDevice = () => {
    let newDevice = window.matchMedia(`only screen and (max-width: 1023px)`)
      .matches
      ? `xs`
      : `xl`;

    if (newDevice !== device) {
      device = newDevice;
      onDeviceChange();
    } else {
      device = newDevice;
    }
  };

  //

  const collapseAllExpanders = () => {
    expanders.forEach((expander, expanderIndex) => {
      expander.classList.remove(`expanded`);
    });
  };

  const deSelectVariantPickersByName = name => {
    variantPickers.forEach((picker, pickerIndex) => {
      if (picker?.name === name) {
        picker.parentNode.classList.remove(`active`);
      }
    });
  };

  const expandItem = (node, index) => {
    collapseAllExpanders();

    if (activeExpander === index) {
      activeExpander = null;
      node.classList.remove(`expanded`);
    } else {
      activeExpander = index;
      node.classList.add(`expanded`);
    }
  };

  const refreshQuantityStatus = quantity => {
    if (quantity === 1) {
      quantityDown.classList.add(`opacity-25`);
      quantityDown.classList.add(`pointer-events-none`);
    } else {
      quantityDown.classList.remove(`opacity-25`);
      quantityDown.classList.remove(`pointer-events-none`);
    }
  };

  const setQuantity = quantity => {
    if (!quantityInput || quantity < 1) {
      return;
    }

    refreshQuantityStatus(quantity);

    quantityInput.value = quantity;
  };

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
      buyButtonText.innerHTML = `Pre-order now`;
    } else {
      buyButton.disabled = true;
      buyButton.classList.add(`button--disabled`);
      buyButtonText.innerHTML = `Coming Soon`;
    }

    // add on updates
    let matchedAddOn;

    addOnData.variants.forEach(addOnVariant => {
      if (matchedAddOn) {
        return;
      }

      if (
        matchedVariant?.options?.[0]?.toLowerCase().trim() ===
        addOnVariant?.options?.[0]?.toLowerCase().trim()
      ) {
        matchedAddOn = addOnVariant;
      }
    });

    if (matchedAddOn?.available) {
      addOnButton.disabled = false;
      addOnButton.classList.remove(`button--disabled`);
      addOnButtonText.innerHTML = addOnButton.getAttribute(`data-default-text`);
    } else {
      addOnButton.disabled = true;
      addOnButton.classList.add(`button--disabled`);
      addOnButtonText.innerHTML = `Coming Soon`;
    }

    //
    // 'state' update

    activeVariant = matchedVariant;
    activeVariantInput.value = matchedVariant.id;
    activeAddOn = matchedAddOn;
    activeAddOnInput.value = matchedAddOn.id;

    refreshGallery();
  };

  const resetWidgetTimeouts = () => {
    addWidget.classList.remove(`active`);

    if (widgetShowTimeout) {
      clearTimeout(widgetShowTimeout);
    }

    if (widgetHideTimeout) {
      clearTimeout(widgetHideTimeout);
    }

    if (widgetResetTimeout) {
      clearTimeout(widgetResetTimeout);
    }
  };

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
  };

  // ---------------------------------------------------------------------------
  // initialization

  const parseData = () => {
    variantPickers.forEach((picker, pickerIndex) => {
      const { checked, name, value } = picker;

      const displayedValue = document.getElementById(
        `variant-value-${name?.toLowerCase()?.replaceAll(` `, `-`)}`
      );

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

    refreshGallery();
  };

  const addListeners = () => {
    window.addEventListener(`resize`, detectDevice, false);

    if (addToCartForm) {
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

        fetch(`${routes.cart_add_url}`, config)
          .then(response => response.json())
          .then(response => {
            if (response.status) {
              console.error(response.description);
              return;
            }

            // yes, the add_to_cart form was submitted properly
            // 
            // what are the ways we can get from here to SideCart.onAddToCart?
            // 1. SideCart.onAddToCart, but we need the singleton already attached to <side-cart>
            //    - can we document.getElementsByTagName(`side-cart`)
            //    - does that object have some information about the attached class instance?
            // 2. Event broadcast
            //    - document.body.dispatchEvent(new CustomEvent(`lam:cart-add`));

            //
            // product.js live area stuff which we could improve later

            const { title, quantity } = response;

            if (headerCartQuantity) {
              fetch(`${routes.cart_url}`, {
                ...fetchConfig()
              })
                .then(response => {
                  return response.text();
                })
                .then(state => {
                  const parsedState = JSON.parse(state);
                  console.log(`parsedState`, parsedState);

                  const itemCount = parseInt(parsedState?.item_count);

                  headerCartQuantity.innerHTML =
                    itemCount === 0 ? `` : itemCount;

                  if (headerCartQuantityContainer) {
                    if (itemCount > 0) {
                      headerCartQuantityContainer.classList.remove(`opacity-0`);
                    } else {
                      headerCartQuantityContainer.classList.add(`opacity-0`);
                    }
                  }

                  if (itemCount > 0) {
                    if (mainCartListEmpty) {
                      // remove the empty cart
                      mainCartListEmpty.remove();

                      // create the cart list but only if
                      // the list doesn't already exist
                      if (!document.getElementById('main-cart-list-2')) {
                        const mainCartListClone =
                          mainCartListTemplate.content.cloneNode(true);

                        sideCartContent.appendChild(mainCartListClone);
                      }

                      // get the cart items list
                      const mainCartList =
                        document.querySelector('.cart__list');

                      if (mainCartList) {
                        parsedState.items.forEach((item, itemIndex) => {
                          // ===== variables
                          const sideCartItemClone =
                            sideCartItemTemplate.content.cloneNode(true);

                          const listItemWrapper =
                            sideCartItemClone.querySelector(
                              `.cart__list__item`
                            );

                          const listItemHeader =
                            sideCartItemClone.querySelector(`#product-title`);

                          const quantityInput =
                            sideCartItemClone.querySelector(
                              `.cart-item-quantity`
                            );
                          const adjustQuantityDownButton =
                            sideCartItemClone.querySelector(
                              `.cart-item-adjust--down`
                            );
                          const adjustQuantityUpButton =
                            sideCartItemClone.querySelector(
                              `.cart-item-adjust--up`
                            );

                          // ===== methods
                          listItemWrapper.setAttribute(
                            'data-cart-item-index',
                            itemIndex
                          );

                          listItemHeader.innerText = item.title;

                          quantityInput.setAttribute(
                            `id`,
                            `product-quantity-${itemIndex + 1}`
                          );
                          quantityInput.setAttribute(
                            `name`,
                            `product-quantity-${itemIndex + 1}`
                          );
                          quantityInput.setAttribute(
                            `aria-label`,
                            `Quantity adjust ${item.product_title}`
                          );
                          quantityInput.setAttribute(`data-id`, `${item.id}`);
                          quantityInput.setAttribute(
                            `data-index`,
                            `${itemIndex + 1}`
                          );
                          quantityInput.setAttribute(
                            `value`,
                            `${item.quantity}`
                          );

                          adjustQuantityDownButton.setAttribute(
                            `data-id`,
                            `${item.id}`
                          );
                          adjustQuantityUpButton.setAttribute(
                            `data-id`,
                            `${item.id}`
                          );

                          if (item.quantity > 1) {
                            return;
                          } else {
                            mainCartList.appendChild(sideCartItemClone);
                          }
                        });
                      }
                    }
                  }
                });
            }

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
          .catch(e => {
            console.error(e);
          })
          .finally(() => {
            buyButton.classList.remove(`button--disabled`);
            buyButton.setAttribute(`aria-disabled`, false);
          });

        return true;
      });
    }

    // todo : DRY
    if (addOnToCartForm) {
      addOnToCartForm.addEventListener(`submit`, e => {
        e.preventDefault();

        if (addOnButton?.classList?.contains(`button--disabled`)) {
          return false;
        }

        if (addOnButton) {
          addOnButton.classList.add(`button--disabled`);
          addOnButton.setAttribute(`aria-disabled`, true);
        }

        resetWidgetTimeouts();

        const config = fetchConfig(`javascript`);
        config.headers[`X-Requested-With`] = `XMLHttpRequest`;
        delete config.headers[`Content-Type`];

        const formData = new FormData(addOnToCartForm);
        config.body = formData;

        fetch(`${routes.cart_add_url}`, config)
          .then(response => response.json())
          .then(response => {
            if (response.status) {
              console.log(`error: `, response.description);
              return;
            }

            const { title, quantity } = response;

            if (headerCartQuantity) {
              fetch(`${routes.cart_url}`, {
                ...fetchConfig()
              })
                .then(response => {
                  return response.text();
                })
                .then(state => {
                  const parsedState = JSON.parse(state);
                  const itemCount = parseInt(parsedState?.item_count);

                  headerCartQuantity.innerHTML =
                    itemCount === 0 ? `` : itemCount;

                  if (headerCartQuantityContainer) {
                    if (itemCount > 0) {
                      headerCartQuantityContainer.classList.remove(`opacity-0`);
                    } else {
                      headerCartQuantityContainer.classList.add(`opacity-0`);
                    }
                  }
                });
            }

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
          .catch(e => {
            console.error(e);
          })
          .finally(() => {
            addOnButton.classList.remove(`button--disabled`);
            addOnButton.setAttribute(`aria-disabled`, false);
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
      variantPickers.forEach(picker => {
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
  };

  // ---------------------------------------------------------------------------
  // execution

  const main = () => {
    detectDevice();
    parseData();
    addListeners();
  };

  main();
};

export default Product;
