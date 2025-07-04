// import { cart, calculateCartQuantity } from "../../data/cart.js";
import { cart } from "../../data/new-cart-class.js";
import { getProduct } from "../../data/products.js";
import formatCurrency from "../utils/money.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { addOrder } from "../../data/orders.js";


export function renderPaymentOrderSummary(){

let productCents = 0;
let shippingPriceCents = 0;

cart.cartItems.forEach((cartItem) => {
let deliveryOptionId = cartItem.deliveryOptionId;

const product =  getProduct(cartItem.productId);
productCents += product.priceCents * cartItem.quantity;


const deliveryOption = getDeliveryOption(deliveryOptionId);
shippingPriceCents += deliveryOption.priceCents;

});

const totalBeforeTaxCents = productCents + shippingPriceCents;

const taxCents = totalBeforeTaxCents * 0.1;

const totalCents = totalBeforeTaxCents + taxCents; 


const paymentSummaryHTML =  `

 <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cart.calculateCartQuantity()}):</div>
            <div class="payment-summary-money">$${formatCurrency(productCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
            $${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
            $${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">
            $${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">
            $${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
`;
document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

const placeOrder = document.querySelector('.js-place-order');
placeOrder.addEventListener('click', async () => {
  try {
 const response =  await fetch('https://supersimplebackend.dev/orders', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cart: cart
      }),
});

const order = await response.json();
console.log(order);
addOrder(order);

  } catch (error) {
    console.log('Unexpected error. Try again later');
  }


  // window.location.href = 'orders.html';
});

}

