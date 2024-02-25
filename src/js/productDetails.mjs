import { findProductById } from "./productData.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

// Variable to store product data
// let productData = {};

// NEW
let product = {};

// NEW
export default async function productDetails(productId) {
  try {
    product = await findProductById(productId);
    renderProductDetails();
    document.getElementById("addToCart").addEventListener("click", addToCart);
  } catch (error) {
    console.error("error in productDetails:", error);
  }
}

// NEW
function addToCart() {
    let cartItems = getLocalStorage("so-cart");

    if (!cartItems || !Array.isArray(cartItems)) {
        cartItems = [];
    }
    cartItems.push(product);
    setLocalStorage("so-cart", cartItems); // Storing product data in local storage
    alert("Product added to cart successfully!");

    // Add cart total count
    let cartCount = getLocalStorage("cart-count") || 0;
    cartCount++;
    setLocalStorage("cart-count", cartCount);
    document.querySelector("#cart-count").textContent = cartCount;
    document.querySelector("#cart-count-container").className = "count-container-format"
}

// Function to render product details in HTML
function renderProductDetails() {
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Images.PrimaryLarge;
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
  document.querySelector("#productColorName").innerText =
    product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}

// From instructor page week 5: BEGIN
// export default async function productDetails(productId) {
//   product = await findProductById(productId);
//   renderProductDetails();
//   document.getElementById("addToCart").addEventListener("click", addToCart);
// }
// From instructor page week 5: END

// Original function: BEGIN
// Default export - the main function to handle product details
// export default async function productDetails(productId) {
//     try {
//         productData = await findProductById(productId); // Fetch product data
//         renderProductDetails(); // Render product details

//         // Setup Add to Cart button event listener
//         document.getElementById("addToCart").addEventListener("click", addToCart);
//     } catch (error) {
//         console.error("Error in productDetails:", error);
//         // Handle errors, for example, show an error message to the user
//     }
// }
// Original function: END

// Instructor example week 5: BEGIN
// function addToCart() {
//   let renderCartContents = getLocalStorage("so-cart");
//   if (!cartContents) {
//     cartContents = [];
//   }
// }
// Instructor example week 5: END

// Original function Cart Add: BEGIN
// Function to add product to cart
// function addToCart() {
//     let cartItems = getLocalStorage("so-cart");

//     if (!cartItems || !Array.isArray(cartItems)) {
//         cartItems = [];
//     }
//     cartItems.push(productData);
//     setLocalStorage("so-cart", cartItems);
//     alert("Product added to cart successfully!");
// }
// Original function Cart Add: END