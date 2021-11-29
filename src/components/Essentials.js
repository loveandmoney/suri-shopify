
const Essentials = () => {
  if (typeof window === `undefined`) {
    return;
  }

  // ---------------------------------------------------------------------------
  // DOM

  const buttons = document.querySelectorAll(`.essentials__toggle`);
  const expanderButton = document.getElementById(`essentials-expander-button`);
  const expanderContent = document.getElementById(`essentials-expander-content`);
  const images = document.querySelectorAll(`.essentials__image`);
  
  // ---------------------------------------------------------------------------
  // variables

  let expanded = false;

  // ---------------------------------------------------------------------------
  // methods

  const showContent = index => {
    images.forEach(image => {
      if (index === image.getAttribute(`data-index`)) {
        image.classList.remove(`opacity-0`);
      } else {
        image.classList.add(`opacity-0`);
      }
    });
  }

  // ---------------------------------------------------------------------------
  // initialization

  const addListeners = () => {
    if (buttons?.[0]) {
      buttons.forEach(button => {
        button.addEventListener(`click`, e => {
          buttons.forEach(allButton => {
            console.log("removing class: ", allButton);
            allButton.classList.remove(`selected`);
          });

          const index = button.getAttribute(`data-index`);

          button.classList.add(`selected`);

          showContent(index);
        });
      });
    }
    
    if (expanderButton && expanderContent) {
      expanderButton.addEventListener(`click`, e => {
        expanded = !expanded;

        
        if (expanded) {
          console.log("expanding");
          expanderContent.classList.add(`expanded`);
        } else {
          console.log("collapsing");
          expanderContent.classList.remove(`expanded`);
        }
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

export const onSlideChanged = (swiper) => {
  const { activeIndex } = swiper;

  const switchableTextItems = document.querySelectorAll(`.essentials__active-item__switchable`);

  switchableTextItems.forEach(item => {
    item.classList.add(`opacity-0`);
  });
  
  switchableTextItems.forEach(item => {
    const index = item.getAttribute(`data-index`);

    if (parseInt(index) === parseInt(activeIndex)) {
      item.classList.remove(`opacity-0`);
    }
  });
}

export default Essentials;