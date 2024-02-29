// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  // const product = urlParams.get("product"); This is not in the instructors example
  // return product;
  return urlParams.get(param);
}

// New code
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = true
) {
  if (!parentElement) {
    console.error("Parent element is null.");
    return; // Exit function if parentElement is null
  }

  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}

// Orignial Code
// export function renderListWithTemplate(
//   templateFn,
//   parentElement,
//   list,
//   position = "afterbegin",
//   clear = true
// ) {
//   if (clear) {
//     parentElement.innerHTML = "";
//   }
//   const htmlString = list.map(templateFn);
//   parentElement.insertAdjacentHTML(position, htmlString.join(""));
// }

export async function renderWithTemplate(
  templateFn,
  parentElement,
  data,
  callback,
  position = "afterbegin",
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = await templateFn(data);
  parentElement.insertAdjacentHTML(position, htmlString);
   if(callback) {
    callback(data);
   }
}

function loadTemplate(path) {
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      return html;
    }
  };
}

// Original code
export async function loadHeaderFooter() {
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");
  const headerEl = document.querySelector("#main-header");
  const footerEl = document.querySelector("#main-footer");
  renderWithTemplate(headerTemplateFn, headerEl);
  renderWithTemplate(footerTemplateFn, footerEl);
   // Update cart count
  window.addEventListener("load", () => {
    const cartCountEl = document.querySelector("#cart-count");
    // Clear contents
    cartCountEl.textContent = "";
    cartCountEl.textContent = getLocalStorage("cart-count") || "";
    if(getLocalStorage("cart-count")){
      const cartCountContainer = document.querySelector("#cart-count-container");
      cartCountContainer.className = "count-container-format";
    }
    console.log(getLocalStorage("cart-count"));
  })
}

export function alertMessage(message) {
    alert("The Error Has Begun!!!\n\n" + message);
}

// New Code to load cart count
// export async function loadHeaderFooter() {
//   const headerTemplateFn = loadTemplate("/partials/header.html");
//   const footerTemplateFn = loadTemplate("/partials/footer.html");
//   const headerEl = document.querySelector("#main-header");
//   const footerEl = document.querySelector("#main-footer");
//   renderWithTemplate(headerTemplateFn, headerEl);
//   renderWithTemplate(footerTemplateFn, footerEl);

//   // Update cart count after DOMContentLoaded event
//   window.addEventListener("DOMContentLoaded", () => {
//     const cartCountEl = document.querySelector("#cart-count");
//     if (cartCountEl) {
//       // Clear contents
//       cartCountEl.textContent = "";
//       cartCountEl.textContent = getLocalStorage("cart-count") || "";
//       if (getLocalStorage("cart-count")) {
//         const cartCountContainer = document.querySelector("#cart-count-container");
//         if (cartCountContainer) {
//           cartCountContainer.className = "count-container-format";
//         }
//       }
//     }
//   });
// }