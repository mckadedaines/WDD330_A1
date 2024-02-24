import { getParam, loadHeaderFooter } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

loadHeaderFooter();

// Get the product ID from the URL
const productId = getParam("product");

// Initialize product details functionality
productDetails(productId);