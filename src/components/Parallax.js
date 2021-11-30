import { injectStyleWithVendor } from "../utils/helpers";

const Parallax = (caller) => {
  if (typeof window === `undefined`) {
    return;
  }

  // ---------------------------------------------------------------------------
  // DOM

  const child = caller?.children?.[0];

  if (!child || caller?.children?.[1]) {
    return;
  }

  // ---------------------------------------------------------------------------
  // variables

  const maxTranslate = caller?.getAttribute(`data-maxtranslate`) || `20vw`;

  // ---------------------------------------------------------------------------
  // methods

  // todo: something smarter so this works when caller isn't at the top
  const handleScroll = (e) => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    let progress = scrollTop / window.innerHeight;

    if (progress > 1) {
      progress = 1;
    } else if (progress < 0) {
      progress = 0;
    }

    requestAnimationFrame(() => {
      injectStyleWithVendor(child, `transform`, `translate3d(0, calc(${progress} * ${maxTranslate}), 0)`);
    });
  }

  // ---------------------------------------------------------------------------
  // initialization

  const addListeners = () => {
    window.addEventListener(`scroll`, handleScroll, false);
  }

  // ---------------------------------------------------------------------------
  // execution

  const main = () => {
    addListeners();
  }

  main();
};

export default Parallax;