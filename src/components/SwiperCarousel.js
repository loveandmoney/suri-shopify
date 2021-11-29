import SwiperCore, { Navigation, Pagination }  from "swiper/core";
import Swiper from "swiper";

SwiperCore.use([Navigation, Pagination]);

import "swiper/swiper-bundle.css";

const SwiperCarousel = (caller) => {
  // ---------------------------------------------------------------------------
  // variables

  const id = caller?.getAttribute(`data-swiperid`);

  if (!id) {
    return;
  }

  // ---------------------------------------------------------------------------
  // methods

  // const container = document.getElementById(`swiper-container`);

  const initializedSwiper = () => {
    const swiper = new Swiper(`.swiper--${id}`, {
      loop: false,
      pagination: {
        el: `.swiper-pagination--${id}`,
        type: `bullets`
      }
    });
  }

  // swiperCarousel();
  
  // ---------------------------------------------------------------------------
  // execution

  const main = () => {
    initializedSwiper();
  }

  main();
}

export default SwiperCarousel;