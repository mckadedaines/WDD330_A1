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
  await renderWithTemplate(headerTemplateFn, headerEl); // creating a steping attempt to verify data is loading properly.
  await renderWithTemplate(footerTemplateFn, footerEl); // creating a steping attempt to verify data is loading properly.
  // Update cart count
  // document.addEventListener("DOMContentLoaded", () => { // This is not needed, since we are using await on line 104 and 105.
    const cartCountEl = document.querySelector("#cart-count");
    // Clear contents
    cartCountEl.textContent = "";
    cartCountEl.textContent = getLocalStorage("cart-count") || "";
    if(getLocalStorage("cart-count")){
      const cartCountContainer = document.querySelector("#cart-count-container");
      cartCountContainer.className = "count-container-format";
    }
    console.log(getLocalStorage("cart-count"));
  // })
}

export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });
  const main = document.querySelector("main");
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0);

  // left this here to show how you could remove the alert automatically after a certain amount of time.
  // setTimeout(function () {
  //   main.removeChild(alert);
  // }, duration);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
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