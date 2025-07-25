
 class Cart{
#localStorageKey;  //making localStorageKey private(meaning can only be accessed inside the class, rather than being accessed outside by doing cart.localStorageKey)
  cartItems;

  constructor(localStorageKey){
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

     
 #loadFromStorage(){
this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

if(!this.cartItems){
  this.cartItems = [
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

}; 
saveToStorage(){
  localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
};

 addToCart(productId, selectQuantity){
  let matchingItem;

  this.cartItems.forEach((cartItem) => {
    if(cartItem.productId === productId){
      matchingItem = cartItem;
    }
  });

  if(matchingItem){
    matchingItem.quantity += selectQuantity;
  }else{
this.cartItems.push({
  productId,
  quantity:selectQuantity,
  deliveryOptionId: '1',
});
  }
 this.saveToStorage(); //whenever we update the cart, we need to save to local storage so it doesn't get reset
};


removeFromCart(productId) {
const newCart = [];

this.cartItems.forEach((cartItem) => {
  if(cartItem.productId !== productId){
    newCart.push(cartItem);
  }
});
this.cartItems = newCart;

this.saveToStorage();
};

calculateCartQuantity(){
  let cartQuantity = 0;
  this.cartItems.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
};

updateQuantity(productId, newQuantity){

this.cartItems.forEach((cartItem) => {
  if(productId === cartItem.productId){
    if(newQuantity <= 0){
      this.removeFromCart(productId)
    }else{
      cartItem.quantity = newQuantity;
    }
  }
});

this.saveToStorage();
return newQuantity;
};
updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem;

  this.cartItems.forEach((cartItem) => {
    if(cartItem.productId === productId){
      matchingItem = cartItem;
    }
  });

matchingItem.deliveryOptionId = deliveryOptionId;

this.saveToStorage();
}

}


export const cart = new Cart('cart');

