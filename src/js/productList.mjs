import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

async function filterProducts(products) {
    const filteredProducts = [];
    for (const product of products) {
        try {
            // Check if image returns a valid response
            const response = await fetch(product.Image);
            if (response.ok) {
                filteredProducts.push(product);
            }
        } catch (error) {
            console.error("Error checking image:", error);
        }
    }
    return filteredProducts;
}

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
    const filteredProducts = await filterProducts(products);
    console.log(filteredProducts);
    renderListWithTemplate(productCardTemplate, el, filteredProducts);
}
