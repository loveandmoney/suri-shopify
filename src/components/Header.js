import { fetchConfig } from '../utils/helpers';

const Header = () => {
  if (typeof window === `undefined`) {
    return;
  }

  // ---------------------------------------------------------------------------
  // DOM

  const mainContent = document.getElementById('MainContent');
  const checkoutButton = document.getElementById(`header-checkout-button`);
  const cookieBanner = document.getElementById(`cookie-banner`);
  const cookieAcceptBtn = document.getElementById(`accept-button`);
  const cookieBannerCookie = document.cookie.includes(`cookieBanner`);

  const headerHeight = `3rem`;

  // ---------------------------------------------------------------------------
  // initialization

  const addListeners = () => {
    window.addEventListener(
      `resize`,
      () => {
        mainContent.style.marginTop = `calc(${cookieBanner.clientHeight}px + ${headerHeight})`;
      },
      false
    );

    if (checkoutButton) {
      checkoutButton.addEventListener(`click`, e => {
        // todo : insert analytics triggers if required
        // window.location.href = `/checkout`;
      });
    }

    if (!cookieBannerCookie && cookieAcceptBtn) {
      cookieAcceptBtn.addEventListener(`click`, e => {
        const now = new Date();
        const time = now.getTime();
        const expireTime = time + 1000 * 36000;
        now.setTime(expireTime);
        document.cookie = `cookieBanner=accepted;expires=${now.toUTCString()};path=/`;

        mainContent.style.marginTop = `0`;
        cookieBanner.classList.remove(`active`);
      });
    }
  };

  const cookie = () => {
    if (cookieBannerCookie) {
      return;
    }

    cookieBanner.classList.add(`active`);
  };

  const content = () => {
    if (cookieBannerCookie || window.location.pathname === `/cart`) {
      return;
    }

    mainContent.style.transition = `margin-top .3s cubic-bezier(.215,.61,.355,1)`;
    mainContent.style.marginTop = `calc(${cookieBanner.clientHeight}px + ${headerHeight})`;
  };

  // ---------------------------------------------------------------------------
  // execution

  const main = () => {
    content();
    addListeners();
    cookie();
  };

  main();
};

export default Header;
