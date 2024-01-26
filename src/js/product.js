import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

// Get the product ID from the URL
const productId = getParam("product");

// Initialize product details functionality
productDetails(productId);
