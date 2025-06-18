// import { calculateCartQuantity } from "../../data/cart.js";
import { cart } from "../../data/new-cart-class.js";

export function renderCheckoutHeader(){

const renderHTML = `
Checkout (<a class="return-to-home-link"
 href="amazon.html">${cart.calculateCartQuantity()} items</a>)
`;

document.querySelector('.js-checkout-header').innerHTML = renderHTML;
}