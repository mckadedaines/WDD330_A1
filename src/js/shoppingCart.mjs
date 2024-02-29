// Code to render cart total: BEGIN
// New JS code for adding items and displaying total
import { getLocalStorage, setLocalStorage, renderListWithTemplate } from "./utils.mjs";

export default function ShoppingCart() {
    const cartItems = getLocalStorage("so-cart");
    const outputEl = document.querySelector(".product-list");
    renderListWithTemplate(cartItemTemplate, outputEl, cartItems);
    updateTotal(cartItems); // Update total initially
}

function cartItemTemplate(item, index) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}" />
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

function renderCartContents() {
  let cartItems = getLocalStorage("so-cart");

  if (typeof cartItems === "string") {
    cartItems = JSON.parse(cartItems);
  }

  if (Array.isArray(cartItems)) {
    const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    addRemoveEventListeners();
    updateTotal(cartItems); // Update total after rendering
  } else {
    console.error("Cart items not in expected format:", cartItems);
  }
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
    cartItems.splice(index, 1);
    setLocalStorage("so-cart", cartItems);
    renderCartContents();
  } else {
    console.error("Cart items not in expected format:", cartItems);
  }
}

function updateTotal(cartItems) {
  const totalElement = document.querySelector(".list-total");
  const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.FinalPrice), 0);
  totalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

renderCartContents();

// Code to render cart total: END


// The below code probably can be deleted.
// Original cartItemTemplate: END

// Instructors week 5 page: BEGIN
// When I use this function the cart contents empty.
// function cartItemTemplate(item) {
//   const newItem = `<li class="cart-card divider">
//   <a href="#" class="cart-card__image">
//     <img
//       src="${item.Images.PrimaryMedium}"
//       alt="${item.Name}"
//     />
//   </a>
//   <a href="#">
//     <h2 class="card__name">${item.Name}</h2>
//   </a>
//   <p class="cart-card__color">${item.Colors[0].ColorName}</p>
//   <p class="cart-card__quantity">qty: 1</p>
//   <p class="cart-card__price">$${item.FinalPrice}</p>
// </li>`;

//   return newItem;
// }
// Instructors week 5 page: END

// // New JS file based off of instructors week 5 activity
// import { getLocalStorage, setLocalStorage, renderListWithTemplate } from "./utils.mjs";

// // New function: BEGIN
// export default function ShoppingCart() {
//     const cartItems = getLocalStorage("so-cart");
//     const outputEl = document.querySelector(".product-list");
//     renderListWithTemplate(cartItemTemplate, outputEl, cartItems);
// }
// // New function: END

// Original cartItemTemplate: BEGIN
// NOTE: only difference is the img src has item.images.PrimaryMedium. 
// When I add that pitem.images.PrimaryMedium it breaks the page image.
// function cartItemTemplate(item, index) {
//   const newItem = `<li class="cart-card divider">
//     <a href="#" class="cart-card__image">
//       <img
//         src="${item.Image}"
//         alt="${item.Name}" />
//     </a>
//     <a href="#">
//       <h2 class="card__name">${item.Name}</h2>
//     </a>
//     <p class="cart-card__color">${item.Colors[0].ColorName}</p>
//     <p class="cart-card__quantity">qty: 1</p>
//     <p class="cart-card__price">$${item.FinalPrice}</p>
//     <button class="remove-button" data-index="${index}">X</button>
//   </li>`;

//   return newItem;
// }

// function renderCartContents() {
//   let cartItems = getLocalStorage("so-cart");

//   if (typeof cartItems === "string") {
//     cartItems = JSON.parse(cartItems);
//   }

//   if (Array.isArray(cartItems)) {
//     const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
//     document.querySelector(".product-list").innerHTML = htmlItems.join("");
//     addRemoveEventListeners();
//   } else {
//     console.error("Cart items not in expected format:", cartItems);
//   }
// }

// function addRemoveEventListeners() {
//   const removeButtons = document.querySelectorAll(".remove-button");
//   removeButtons.forEach((button) => {
//     button.addEventListener("click", () => {
//       const index = button.dataset.index;
//       removeItemFromCart(index);
//     });
//   });
// }

// function removeItemFromCart(index) {
//   let cartItems = getLocalStorage("so-cart");

//   if (typeof cartItems === "string") {
//     cartItems = JSON.parse(cartItems);
//   }

//   if (Array.isArray(cartItems)) {
//     cartItems.splice(index, 1); // Remove the item from the array
//     setLocalStorage("so-cart", cartItems); // Save the updated cart back to local storage
//     renderCartContents(); // Re-render the cart contents after removing the item
//   } else {
//     console.error("Cart items not in expected format:", cartItems);
//   }
// }

// renderCartContents();