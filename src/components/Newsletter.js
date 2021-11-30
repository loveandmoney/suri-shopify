import { fetchConfig } from "../utils/helpers";

const Newsletter = () => {
  if (typeof window === `undefined`) {
    return;
  }

  // ---------------------------------------------------------------------------
  // DOM

  const form = document.getElementById(`klaviyo-form`);
  const formEmail = document.getElementById(`newsletter-email`);
  
  // ---------------------------------------------------------------------------
  // variables

  //

  // const listId = `XFzjGW`;

  // ---------------------------------------------------------------------------
  // methods

  const disableForm = () => {
    if (!form) {
      return;
    }

    form.classList.add(`disabled`);
    formEmail.disabled = true;
    formEmail.setAttribute(`aria-disabled`, true);
  }

  const completeForm = () => {
    if (!form) {
      return;
    }

    form.classList.remove(`disabled`);
    form.classList.add(`complete`);
  }

  // ---------------------------------------------------------------------------
  // initialization

  const addListeners = () => {
    if (form) {
      form.addEventListener(`submit`, e => {
        e.preventDefault();

        const url = form.getAttribute(`action`);
        const body = new FormData(form);

        disableForm();

        const clientUrl = window?.location?.href;

        if (clientUrl?.includes(`localhost`) || clientUrl?.includes(`127.0.0.1`)) {
          // test mode
          setTimeout(() => {
            completeForm();
          }, 1000);

          return;
        }

        fetch(url, {
          headers: {
            Accept: `application/json`,
            "Content-Type": `application/json`
          },
          method: `POST`,
          body,
          mode: `no-cors`
        }).then((response) => {
          // console.log(response);
          completeForm();
        })
        .catch((e) => {
          console.error(e);
        });

        return true;
      });
    }
  }

  // ---------------------------------------------------------------------------
  // execution

  const main = () => {
    addListeners();
  }

  main();
};

export default Newsletter;