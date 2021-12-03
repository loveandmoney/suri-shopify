import { fetchConfig } from '../utils/helpers';

const FAQ = () => {
  if (typeof window === `undefined`) {
    return;
  }

  // ---------------------------------------------------------------------------
  // DOM

  const buttons = document.querySelectorAll(`.faq__button`);
  const faqContent = document.querySelectorAll(`.faq-content`);

  //

  // ---------------------------------------------------------------------------
  // variables

  // ---------------------------------------------------------------------------
  // methods

  const resetStyles = () => {
    buttons.forEach(button => {
      button.classList.remove(`selected`);
    });

    faqContent.forEach((contentItem) => {
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

          faqContent[index].classList.remove(`hidden`);

          setTimeout(() => {
            faqContent[index].classList.add(`active`);
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

export default FAQ;
