import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentOrderSummary } from "./checkout/paymentSummary.js";
import '../data/cart-class.js';
import { loadProducts } from "../data/products.js";
// import '../data/car.js';
// import "../data/backend-practice.js";

loadProducts(() => {
renderOrderSummary();
renderPaymentOrderSummary();
})

