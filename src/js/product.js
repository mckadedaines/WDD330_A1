import { setLocalStorage, getLocalStorage, getParam } from "./utils.mjs"; // Add this line
import { findProductById } from "./productData.mjs";

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

  function addProductToCart(product) {
    let cartItems = getLocalStorage("so-cart");

    if (!Array.isArray(cartItems)) {
        cartItems = [];
    }

    cartItems.push(product);
    setLocalStorage("so-cart", cartItems);
}

// add to cart button event handler
async function addToCartHandler(e) {
  console.log("Triggerd")
  try {
    const product = await findProductById(e.target.dataset.id);
    addProductToCart(product);
    alert("Product added to cart successfully!");
  } catch (error) {
    console.error("Error adding product to cart:", error);
    alert("There was an error adding the product to the cart.");
  }
}

const productId = getParam("product");
console.log(findProductById(productId));