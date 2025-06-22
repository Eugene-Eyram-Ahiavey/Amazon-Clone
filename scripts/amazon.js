// import {cart, addToCart, calculateCartQuantity} from "../data/cart.js";
import { cart } from "../data/new-cart-class.js";
import { products, loadProducts } from "../data/products.js"
// import { formatCurrency } from "./utils/money.js";


loadProducts(renderProductsGrid);

function renderProductsGrid(){

let productsHTML = '';


products.forEach((product) => {
productsHTML += `
<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
          ${product.getName()}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
            ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
`
}); 

document.querySelector('.js-products-grid').innerHTML = productsHTML;



const addButtons = document.querySelectorAll('.js-add-to-cart');


console.log(cart);

function displayCart(){
  document.querySelector('.js-cart').innerHTML = cart.calculateCartQuantity();
}

displayCart();



addButtons.forEach((button) => {
  button.addEventListener('click', () => { 
    const {productId} = button.dataset;
    console.log(productId);
    console.log(button.dataset);
    const select = document.querySelector(`.js-quantity-selector-${productId}`);
    const selectQuantity = Number(select.value);

   cart.addToCart(productId, selectQuantity);

   displayCart();
    

const added = document.querySelector(`.js-added-${productId}`);

added.classList.add('visible');

let timeoutId;

function addedTimeout(){

  clearTimeout(timeoutId);
  
  timeoutId = setTimeout(() => {
  added.classList.remove('visible');
  }, 2000);

}

addedTimeout();

  });
});
}

