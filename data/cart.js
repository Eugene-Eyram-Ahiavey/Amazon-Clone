 export let cart;

loadFromStorage();

export function loadFromStorage(){
cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart = [
    {
      productId:"0-4b85-b27e43638ce-6aaf-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: '1',
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: '2'
    } 
  ]
}

}

console.log(cart);


function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}



export function addToCart(productId, selectQuantity){
  let matchingItem;

  cart.forEach((cartItem) => {
    if(cartItem.productId === productId){
      matchingItem = cartItem;
    }
  });

  if(matchingItem){
    matchingItem.quantity += selectQuantity;
  }else{
cart.push({
  productId,
  quantity:selectQuantity,
  deliveryOptionId: '1',
});
  }
 saveToStorage(); //whenever we update the cart, we need to save to local storage so it doesn't get reset

}


export function removeFromCart(productId) {
const newCart = [];

cart.forEach((cartItem) => {
  if(cartItem.productId !== productId){
    newCart.push(cartItem);
  }
});
cart = newCart;

saveToStorage();
}

export function calculateCartQuantity(){
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}

export function updateQuantity(productId, newQuantity){

cart.forEach((cartItem) => {
  if(productId === cartItem.productId){
    if(newQuantity <= 0){
      removeFromCart(productId)
    }else{
      cartItem.quantity = newQuantity;
    }
  }
});

saveToStorage();
return newQuantity;
}
 

export function updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem;

  cart.forEach((cartItem) => {
    if(cartItem.productId === productId){
      matchingItem = cartItem;
    }
  });

matchingItem.deliveryOptionId = deliveryOptionId;

saveToStorage();
}







