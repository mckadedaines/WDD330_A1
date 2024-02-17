import { findProductById } from "./productData.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

// Variable to store product data
let productData = {};

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

// Function to add product to cart
function addToCart() {
    let cartItems = getLocalStorage("so-cart");

    if (!cartItems || !Array.isArray(cartItems)) {
        cartItems = [];
    }

    cartItems.push(productData);
    setLocalStorage("so-cart", cartItems);
    alert("Product added to cart successfully!");
}

// Default export - the main function to handle product details
export default async function productDetails(productId) {
    try {
        productData = await findProductById(productId); // Fetch product data
        renderProductDetails(); // Render product details

        // Setup Add to Cart button event listener
        document.getElementById("addToCart").addEventListener("click", addToCart);
    } catch (error) {
        console.error("Error in productDetails:", error);
        // Handle errors, for example, show an error message to the user
    }
}
