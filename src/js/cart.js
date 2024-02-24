import { getLocalStorage, setLocalStorage, loadHeaderFooter, renderListWithTemplate } from "./utils.mjs";
import ShoppingCart from "./shoppingCart.mjs";

loadHeaderFooter();
renderCartItems();
setLocalStorage();

function renderCartItems() {
  const cartItems = getLocalStorage("so-cart") || [];

  const productList = document.querySelector(".product-list");

  // Clear existing content
  productList.innerHTML = "";

  // Render each item in the cart
  renderListWithTemplate(renderCartItem, productList, cartItems);
}

function renderCartItem(item) {
  console.log("Image URL", item.image);
  return `
    <li class="cart-card divider">
      <a href="${item.link}" class="cart-card__image">
        <img src="${item.image}" alt="${item.name}" />
      </a>
      <a href="${item.link}">
        <h2 class="card__name">${item.name}</h2>
      </a>
      <p class="cart-card__color">${item.color}</p>
      <p class="cart-card__quantity">qty: ${item.quantity}</p>
      <p class="cart-card__price">$${item.price}</p>
    </li>
  `;
}

// Call ShoppingCart function if it requires initialization
ShoppingCart();

// To be able to change quantity of items in cart

document.addEventListener('DOMContentLoaded', function() {
  const quantityInputs = document.querySelectorAll('item.quantity');

  quantityInputs.forEach(function(input) {
    input.addEventListener('change', function() {
      updateCartItemQuantity(this);
    });
  });

  function updateCartItemQuantity(input) {
    const quantity = parseInt(input.value);
    console.log('Quantity updated:', quantity);
  }
});