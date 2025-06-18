// import { cart, removeFromCart, updateQuantity, updateDeliveryOption} from "../../data/cart.js";
import { cart } from "../../data/new-cart-class.js";
import { getProduct } from "../../data/products.js";
import  formatCurrency  from "../utils/money.js";
import { deliveryOptions, getDeliveryOption, calcualteDeliveryDate } from "../../data/deliveryOptions.js";
import { renderPaymentOrderSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

// hello();

// const today = dayjs();

// console.log(today);
// console.log(today.add(15, 'days'));

export function renderOrderSummary(){

let cartSummaryHTML = '';

 cart.cartItems.forEach((cartItem) => {
const productId = cartItem.productId;

const matchingProduct = getProduct(productId);


// console.log(matchingProduct);

const deliveryOptionId = cartItem.deliveryOptionId;

const deliveryOption = getDeliveryOption(deliveryOptionId);

// const todaysDate = dayjs();

// const deliveryDate = todaysDate.add(deliveryOption.deliveryDays, 'days');

// const dateString = deliveryDate.format('dddd, MMMM D');

 const dateString = calcualteDeliveryDate(deliveryOption);


cartSummaryHTML+= `
<div class="cart-item-container js-cart-item-container-${matchingProduct.id}
js-cart-item-container
">
    <div class="delivery-date js-delivery-date">
    Delivery date: ${dateString}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          $${matchingProduct.getPrice()}
        </div>
        <div class="product-quantity js-product-quantity-${matchingProduct.id}">
          <span>
            Quantity:<span class="quantity-label js-quantity-label-${matchingProduct.id}"> ${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-link" data-product-id=${matchingProduct.id}>
            Update
          </span>
          <input class="quantity-input js-quantity-input-${matchingProduct.id}">
          <span class="save-quantity-link link-primary">Save</span>

          <span class="delete-quantity-link link-primary js-delete-link js-delete-${matchingProduct.id}" data-product-id="${matchingProduct.id}"
            >
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        ${deliveryOptionsHTML(matchingProduct, cartItem)}
      </div>
    </div>
  </div>
`;
})



function deliveryOptionsHTML(matchingProduct, cartItem){

let html = '';

deliveryOptions.forEach((deliveryOption) => {
// const today = dayjs();

// const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');

// const dateString = deliveryDate.format('dddd, MMMM D');

const dateString = calcualteDeliveryDate(deliveryOption);

const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} - `;

const isCchecked = deliveryOption.id === cartItem.deliveryOptionId;


html += `
<div class="delivery-option js-delivery-option"
data-product-id="${matchingProduct.id}"
data-delivery-option-id="${deliveryOption.id}"
>
<input type="radio"
${isCchecked ? 'checked' : ''}
class="delivery-option-input"
name="delivery-option-${matchingProduct.id}">
<div>
<div class="delivery-option-date">
${dateString}
</div>
<div class="delivery-option-price">
${priceString}  Shipping
</div>
</div> 
</div>
`
});

return html;

}

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

const deleteLinks = document.querySelectorAll('.js-delete-link');

deleteLinks.forEach((deleteLink) => {


deleteLink.addEventListener('click', () => {

  console.log(deleteLink);
const {productId} = deleteLink.dataset;

cart.removeFromCart(productId);
console.log(cart);


// const container = document.querySelector(`.js-cart-item-container-${productId}`);
// console.log(container);
 //has been removed, now using MVC to make changes to the page
 
renderOrderSummary();

renderCheckoutHeader();
renderPaymentOrderSummary();

});
});






// function displayCart(){
// document.querySelector('.js-cart-number').innerHTML = `${calculateCartQuantity()} items`;
// }

// displayCart();

renderCheckoutHeader();


const updateLinks = document.querySelectorAll('.update-quantity-link');
updateLinks.forEach((updateLink) => {
updateLink.addEventListener('click', () => {
const {productId} = updateLink.dataset;
// console.log(productId)

const cartContainer = document.querySelector(`.js-cart-item-container-${productId}`);

// console.log(cartContainer);
cartContainer.classList.add('is-editing-quantity');


const saveLinks = document.querySelectorAll('.save-quantity-link');
saveLinks.forEach((saveLink) => {
saveLink.addEventListener('click', () => {
cartContainer.classList.remove('is-editing-quantity');

const inputElem = document.querySelector(`.js-quantity-input-${productId}`);

const value = Number(inputElem.value);
console.log(value);

const updatedValue = cart.updateQuantity(productId, value);

if(updatedValue === 0){
cartContainer.remove();
}

document.querySelector(`.js-quantity-label-${productId}`).innerHTML = ` ${updatedValue}`;

// displayCart();
renderCheckoutHeader();
renderPaymentOrderSummary();

});
});

});
});

const allDeliveryOptions = document.querySelectorAll('.js-delivery-option');
allDeliveryOptions.forEach((element) => {
element.addEventListener('click', () => {
const {productId, deliveryOptionId} = element.dataset;
cart.updateDeliveryOption(productId, deliveryOptionId);
renderOrderSummary();
renderPaymentOrderSummary();
});
});

}





