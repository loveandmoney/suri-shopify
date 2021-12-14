import * as Components from './components';
import * as Templates from './templates';

import './scss/index.scss';

const main = () => {
  if (typeof document === `undefined` || typeof window === `undefined`) {
    return;
  }

  // const elementKeys = Object.keys(Elements);

  // if (elementKeys?.[0]) {
  //   elementKeys.forEach(elementKey => {
  //     const Element = Elements[elementKey];

  //     console.log(typeof Element);

  //     if (typeof Element === `function`) {
  //       console.log(`function`);
  //       Element();
  //     }
  //   });
  // }

  document.addEventListener(`DOMContentLoaded`, () => {
    require('./elements');

    document.querySelectorAll(`[data-component]`).forEach(element => {
      const componentId = element.getAttribute(`data-component`);

      if (typeof Components?.[componentId] === `function`) {
        Components[componentId](element);
      }
    });

    document.querySelectorAll(`[data-template]`).forEach(element => {
      const templateId = element.getAttribute(`data-template`);

      if (typeof Templates?.[templateId] === `function`) {
        Templates[templateId](element);
      }
    });
  });
};

main();
