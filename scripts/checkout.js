import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentOrderSummary } from "./checkout/paymentSummary.js";
import '../data/cart-class.js';
import { loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
/// import '../data/car.js';
// import "../data/backend-practice.js";

async function loadPage(){

    try{
       // throw 'error'
        
    await loadProductsFetch();

     await new Promise((resolve, reject) => {
        // throw 'error'
        loadCart(() => {
            // reject('error3');
            resolve();
        });
    });
    }catch(error){
        console.log('Unexpected error. Please try again later.');
    }
  
    renderOrderSummary();
    renderPaymentOrderSummary();
}

loadPage();


/*
Promise.all([
    loadProductsFetch(),//returns a promise

    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })
]).then((values) => {
    console.log(values);
    renderOrderSummary();
    renderPaymentOrderSummary();
});
*/

/*
new Promise((resolve) => {
    console.log('start promise');
    loadProducts(() => {
        resolve();
    });
}).then(() => {
    console.log();
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });
}).then(() => {
    renderOrderSummary();
    renderPaymentOrderSummary();
});
*/


// loadProducts(() => {
//     renderOrderSummary();
//     renderPaymentOrderSummary();
// });



