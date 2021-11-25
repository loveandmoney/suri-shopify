
import * as Components from "./components";
import * as Templates from "./templates";

import "./scss/index.scss";

const main = () => {
  if (typeof document === `undefined` || typeof window === `undefined`) {
    return;
  }

  document.addEventListener(`DOMContentLoaded`, () => {
    document.querySelectorAll(`[data-component]`).forEach((element) => {
      const componentId = element.getAttribute(`data-component`);

      if (typeof Components?.[componentId] === `function`) {
        Components[componentId]();
      }
    });

    document.querySelectorAll(`[data-template]`).forEach((element) => {
      const templateId = element.getAttribute(`data-template`);

      if (typeof Templates?.[templateId] === `function`) {
        Templates[templateId]();
      }
    });
  });
};

main();
