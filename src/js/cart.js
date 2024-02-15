import { getLocalStorage, setLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  let cartItems = getLocalStorage("so-cart");

  if (typeof cartItems === "string") {
    cartItems = JSON.parse(cartItems);
  }

  if (Array.isArray(cartItems)) {
    const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    addRemoveEventListeners();
  } else {
    console.error("Cart items not in expected format:", cartItems);
  }
}

function cartItemTemplate(item, index) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button class="remove-button" data-index="${index}">X</button>
  </li>`;

  return newItem;
}

function addRemoveEventListeners() {
  const removeButtons = document.querySelectorAll(".remove-button");
  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;
      removeItemFromCart(index);
    });
  });
}

function removeItemFromCart(index) {
  let cartItems = getLocalStorage("so-cart");

  if (typeof cartItems === "string") {
    cartItems = JSON.parse(cartItems);
  }

  if (Array.isArray(cartItems)) {
    cartItems.splice(index, 1); // Remove the item from the array
    setLocalStorage("so-cart", cartItems); // Save the updated cart back to local storage
    renderCartContents(); // Re-render the cart contents after removing the item
  } else {
    console.error("Cart items not in expected format:", cartItems);
  }
}

renderCartContents();