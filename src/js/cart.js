import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  let cartItems = getLocalStorage("so-cart");

  if (typeof cartItems === "string") {
    cartItems = JSON.parse(cartItems);
  }

  // console.log("Cart Items:", cartItems); // Log the cart items
  if (Array.isArray(cartItems)) {
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  } else {
    console.error("Cart items not in expected format:", cartItems);
  
  // Check if cartItems is a string and parse it into an array
  if (typeof cartItems === "string") {
    cartItems = JSON.parse(cartItems);
  }

  // Ensure cartItems is an array before mapping
  if (Array.isArray(cartItems)) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  } else {
    // Handle the case where cartItems is not an array
    console.error("Cart items are not in the expected format:", cartItems);
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

renderCartContents();
