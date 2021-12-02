import SwiperCore, { Navigation, Pagination }  from "swiper/core";
import Swiper from "swiper";

SwiperCore.use([Navigation, Pagination]);

import "swiper/swiper-bundle.css";

const SwiperCarousel = (caller) => {
  const id = caller?.getAttribute(`data-swiperid`);

  if (!id) {
    return;
  }

  let swiper;

  const initializeSwiper = () => {
    swiper = new Swiper(`.swiper--${id}`, {
      loop: false,
      pagination: {
        el: `.swiper-pagination--${id}`,
        type: `bullets`
      }
    });

    const onChange = caller?.getAttribute(`data-onchange`);

    if (onChange && onChange?.includes(`.`)) {
      swiper.on(`slideChange`, (e) => {
        const changeSplit = caller.getAttribute(`data-onchange`).split(`.`);

        if (!changeSplit?.[0] || !changeSplit?.[1]) {
          return;
        }

        const componentName = changeSplit[0];
        const method = changeSplit[1];
        const component = require(`./${componentName}`);

        if (typeof component?.[method] === `function`) {
          component[method](e);
        }
      });
    }
  }
  
  const main = () => {
    initializeSwiper();
  }

  main();
}

export default SwiperCarousel;