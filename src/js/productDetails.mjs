import { findProductById } from "./productData.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

// Variable to store product data
let productData = null;

// Function to render product details in HTML
function renderProductDetails() {
    document.querySelector("h3").textContent = productData.Brand.Name;
    document.querySelector("h2.divider").textContent = productData.NameWithoutBrand;
    document.querySelector(".product-detail img").src = productData.Image;
    document.querySelector(".product-detail img").alt = productData.Name;
    document.querySelector(".product-card__price").textContent = `$${productData.FinalPrice}`;
    document.querySelector(".product__color").textContent = productData.Colors[0].ColorName;
    document.querySelector(".product__description").textContent = productData.DescriptionHtmlSimple;
    document.getElementById("addToCart").setAttribute("data-id", productData.Id);
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
        renderProductDetails(productData); // Render product details

        // Setup Add to Cart button event listener
        document.getElementById("addToCart").addEventListener("click", addToCart);
    } catch (error) {
        console.error("Error in productDetails:", error);
        // Handle errors, for example, show an error message to the user
    }
}
