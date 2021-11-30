const Tray = () => {
  if (typeof window === `undefined`) {
    return;
  }

  // ---------------------------------------------------------------------------
  // DOM

  const closeButton = document.getElementById(`tray-close-button`);
  const desktopTray = document.getElementById(`tray-desktop`);
  const mobileButton = document.getElementById(`tray-mobile-button`);

  // ---------------------------------------------------------------------------
  // variables

  let mobileButtonVisible = false;

  // ---------------------------------------------------------------------------
  // methods

  const handleScroll = e => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    mobileButtonVisible = scrollTop > window.innerHeight * 0.8;

    const isActive = mobileButton?.classList?.contains(`active`);

    if (mobileButtonVisible) {
      if (!isActive) {
        mobileButton.classList.add(`active`);
      }
    } else if (isActive) {
      mobileButton.classList.remove(`active`);
    }
  };

  // ---------------------------------------------------------------------------
  // initialization

  const addListeners = () => {
    if (mobileButton) {
      window.addEventListener(`scroll`, handleScroll, false);
    }

    if (closeButton && desktopTray) {
      closeButton.addEventListener(`click`, e => {
        if (desktopTray?.classList?.contains(`active`)) {
          desktopTray.classList.remove(`active`);
        }
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

export default Tray;
