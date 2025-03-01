import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  // empty array of products-type
  private cart: Product[]=[];

  addToCart (product: Product): void {
    const existingProduct = this.cart.find((item)=> item.id === product.id);
    if (existingProduct){
      existingProduct.quantity++
    } else {
      this.cart.push({...product});
    }
  }

  getCartItems(): Product[]{
    return this.cart;
  }

  // change quantities of a product in the cart
  updateQuantity(productId: number, quantity: number): void {
    // find product for which I want to update the quantity
    const product = this.cart.find((item) => item.id === productId);
    // update the quantity for that product
    if (product && quantity > 0) {
      //if not zero, update it
      product.quantity = quantity;
    } else if (quantity <= 0) {
      // if zero, remove it
      this.removeFromCart(productId);
    }
  }

  removeFromCart(productId: number): void {
    this.cart = this.cart.filter((item) => item.id !== productId);
  }

  getCartTotal(): number {
    return this.cart.reduce((totalVal, item) => totalVal + item.price * item.quantity, 0);
  }

  getCartTotalQuantity(){
    return this.cart.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0);
  }
}

// The addToCart() method expects to receive a product, and push it to the our cart array. But only if the product is not found already in the cart. In that case, only the quantity will increase. That is to prevent inserting the same product multiple times.
// getCartItems() method simply returns our cart items because they are private, and therefore require a getter method.

// In JavaScript (and by extension Angular), the three dots represent the spread operator. In your code, {...product} creates a new object that contains all the enumerable properties of product. This is a concise way to clone or shallow-copy an object so that the original object remains unaltered when you modify the new one.

// For example, instead of directly pushing product (which would push a reference), using {...product} ensures that any changes made later to the object in this.cart do not affect the original product.

// This feature was introduced in ES6 (ECMAScript 2015) and is widely used in modern JavaScript for both objects and arrays.

// "..." is to copy an element from an array but without keeping any link with the original element; in this way, if I change something in that copied-element, then the original element is not affected. This process is called "destructuring".

// Inside the function, we use the filter() method on the this.cart array. The filter() method creates a new array by including only those items that satisfy a given condition.

//  let array = [1,5,9];
//  let result_array = array.filter(val => val != 5)
// >> result_array: [1,9]

// In getCartTotal(): number {} we are using the reduce function to accumulate the total price of the items in the cart. Then we are calculating the total price for each item by multiplying the price by the quantity. The initial value for the total is set to 0 to start the summing process

//  reduce
// add numbers together
// let array = [2,3,5];
// array.reduce((sum,num)=>sum+num, 0)
// starting point is zero