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

  // ---------------------------------------------------------------------------
  // methods

  //

  // ---------------------------------------------------------------------------
  // initialization

  const addListeners = () => {
    if (form) {
      form.addEventListener(`click`, e => {
        e.preventDefault();

        console.log("Klaviyo AJAX here");

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