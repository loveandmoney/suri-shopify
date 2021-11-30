import { fetchConfig } from "../utils/helpers";

const Newsletter = () => {
  if (typeof window === `undefined`) {
    return;
  }

  // ---------------------------------------------------------------------------
  // DOM

  const form = document.getElementById(`klaviyo-form`);
  
  // ---------------------------------------------------------------------------
  // variables

  //

  // const listId = `XFzjGW`;

  // ---------------------------------------------------------------------------
  // methods

  //

  // ---------------------------------------------------------------------------
  // initialization

  const addListeners = () => {
    if (form) {
      form.addEventListener(`submit`, e => {
        e.preventDefault();

        const url = form.getAttribute(`action`);
        const body = new FormData(form);

        fetch(url, {
          headers: {
            Accept: `application/json`,
            "Content-Type": `application/json`
          },
          method: `POST`,
          body,
          mode: `no-cors`
        }).then((response) => {
          console.log(response);
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