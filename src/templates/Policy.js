import { fetchConfig } from '../utils/helpers';

const Policy = () => {
  if (typeof window === `undefined`) {
    return;
  }

  // ---------------------------------------------------------------------------
  // DOM

  const buttons = document.querySelectorAll(`.policy__button`);
  const policyContent = document.querySelectorAll(`.policy__content__container`);

  //

  // ---------------------------------------------------------------------------
  // variables

  // ---------------------------------------------------------------------------
  // methods

  const resetStyles = () => {
    buttons.forEach(button => {
      button.classList.remove(`selected`);
    });

    policyContent.forEach((contentItem) => {
      contentItem.classList.remove(`active`);
      contentItem.classList.add(`hidden`);
    });
  };

  // ---------------------------------------------------------------------------
  // initialization

  const addListeners = () => {
    if (buttons?.[0]) {
      buttons.forEach(button => {
        button.addEventListener(`click`, e => {
          resetStyles();

          button.classList.add(`selected`);

          const index = button.getAttribute(`data-index`);

          policyContent[index].classList.remove(`hidden`);

          setTimeout(() => {
            policyContent[index].classList.add(`active`);
          }, 10);
        });
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

export default Policy;
