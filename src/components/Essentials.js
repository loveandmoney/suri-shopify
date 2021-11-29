const Essentials = () => {
  if (typeof window === `undefined`) {
    return;
  }

  // ---------------------------------------------------------------------------
  // DOM

  const buttons = document.querySelectorAll(`.essentials__toggle`);
  const images = document.querySelectorAll(`.essentials__image`);
  
  // ---------------------------------------------------------------------------
  // variables

  let activeContent = 0;

  // ---------------------------------------------------------------------------
  // methods

  const showContent = index => {
    activeContent = index;

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
  }

  // ---------------------------------------------------------------------------
  // execution

  const main = () => {
    addListeners();
  }

  main();
};

export default Essentials;