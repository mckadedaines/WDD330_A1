import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
        <a href="product_pages/index.html?product=${product.Id}">
            <img src="${product.Image}" alt="Image of ${product.Name}"/>
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.NameWithoutBrand}</h2>
            <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
    </li>`;
}

export default async function productList(selector, category) {
    const el = document.querySelector(selector);
    const products = await getData(category);
    console.log(products);
    renderListWithTemplate(productCardTemplate, el, products);
}




// New code to remove cards that are not available yet

// function productCardTemplate(product) {
//     // Check if the image URL is valid
//     const isValidImage = (url) => {
//         return new Promise((resolve) => {
//             const img = new Image();
//             img.onload = () => resolve(true);
//             img.onerror = () => resolve(false);
//             img.src = url;
//         });
//     };

//     // Render the product card if the image is valid
//     const renderProductCard = async () => {
//         const isValid = await isValidImage(product.Image);
//         if (isValid) {
//             return `<li class="product-card">
//                 <a href="product_pages/index.html?product=${product.Id}">
//                     <img src="${product.Image}" alt="Image of ${product.Name}"/>
//                     <h3 class="card__brand">${product.Brand.Name}</h3>
//                     <h2 class="card__name">${product.NameWithoutBrand}</h2>
//                     <p class="product-card__price">$${product.FinalePrice}</p>
//                 </a>
//             </li>`;
//         } else {
//             return ''; // Return empty string if image is not valid
//         }
//     };

//     return renderProductCard();
// }