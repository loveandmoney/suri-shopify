const Header = () => {
  if (typeof window === `undefined`) {
    return;
  }

  console.log(`[component] Header`);
};

export default Header;