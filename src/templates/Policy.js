import { fetchConfig } from '../utils/helpers';

const Policy = () => {
  if (typeof window === `undefined`) {
    return;
  }

  // ---------------------------------------------------------------------------
  // DOM

  const buttons = document.querySelectorAll(`.policy__button`);
  const content1 = document.getElementById(`policy-1`);
  const content2 = document.getElementById(`policy-2`);
  const content3 = document.getElementById(`policy-3`);
  const content4 = document.getElementById(`policy-4`);

  //

  // ---------------------------------------------------------------------------
  // variables

  const contentArray = [
    content1,
    content2,
    content3,
    content4
  ];

  // ---------------------------------------------------------------------------
  // methods

  const resetStyles = () => {
    buttons.forEach(button => {
      button.classList.remove(`selected`);
    });

    contentArray.forEach((contentItem, contentIndex) => {
      contentItem.classList.remove(`active`);
      contentItem.classList.add(`hidden`);
    });
  }
  
  // ---------------------------------------------------------------------------
  // initialization
  
  const addListeners = () => {
    if (buttons?.[0]) {
      buttons.forEach(button => {
        button.addEventListener(`click`, e => {
          resetStyles();

          button.classList.add(`selected`);

          const index = button.getAttribute(`data-index`);
          
          contentArray[index].classList.remove(`hidden`);
          
          setTimeout(() => {
            contentArray[index].classList.add(`active`);
          }, 10);
        });
      });
    }
  }

  // ---------------------------------------------------------------------------
  // execution

  const main = () => {
    addListeners();
  };

  main();
};

export default Policy;
