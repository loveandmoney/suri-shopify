const Product = () => {
  if (typeof window === `undefined`) {
    return;
  }

  console.log(`[template] Product`);
};

export default Product;