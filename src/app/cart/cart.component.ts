import { Component } from '@angular/core';
import  {CartService} from '../cart.service';
import { Product } from '../product.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: Product[] = [];
  constructor(private cartService: CartService){}

  // reload cart page while working in another page
  // without it, it always would stay empty
  // it is like storing the values 
  ngOnInit() {
    this.loadCart()
  }
  // Think of ngOnInit() as a "setup phase" for your component. Imagine you have a shop, and before opening, you need to arrange products on shelves. The constructor is like unlocking the door, but ngOnInit() is where you arrange the shelves before customers (users) arrive.
  
  loadCart(): void {
    this.cartItems = this.cartService.getCartItems()
    this .updateTotal();
  }

  
  // ngDoCheck is making sure that the total get updated any time, not only when the modal is open
  totalVal: number = 0
  updateTotal(): number {
    return this.cartService.getCartTotal();
   }
  ngDoCheck(): void {
    this.totalVal = this.updateTotal();
  }

  updateQuantity(productId: number, event: Event): void {
    // input is event.target.value
    const quantity = Number(( event.target as HTMLInputElement).value);
    this.cartService.updateQuantity(productId, quantity);
    this.loadCart();
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.loadCart();
  }

  increaseQuantity(productId: number): void {
    const product = this.cartItems.find(item => item.id === productId);
    if (product) {
      this.cartService.updateQuantity(productId, product.quantity + 1);
      this.loadCart(); // Refresh cart items
    }
  }

  decreaseQuantity(productId: number): void {
    const product = this.cartItems.find(item => item.id === productId);
    if (product && product.quantity > 1) {
      this.cartService.updateQuantity(productId, product.quantity - 1);
      this.loadCart(); // Refresh cart items
    } else if (product && product.quantity === 1) {
      this.removeItem(productId); // Remove item if quantity was 1
    }
  }

  openCart(): void {
    document.getElementById("cartModal")!.style.display = "block";
  }

  closeCart(): void {
    document.getElementById("cartModal")!.style.display = "none";
  }

  checkout(): void {
    Swal.fire({
          title: `Proceeding to checkout!`,
          buttonsStyling: false,
          confirmButtonText: 'Take my money, dude!',
          customClass: {
          confirmButton: 'btn btn-primary'},
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
          }
        });
    this.closeCart();
  }
  
  // event is also just a parameter of a type Event. This means we are expecting some kind of event (click, scroll, change, input,..) and we can use it to get an access to the target upon which an event has occurred with event.target.

  // Inside we are creating a new constant quantity that will use event.target.value to give us the number of a current quantity. The idea is to add an input field in our template with a quantity as a value, and on change, always have the latest number written by the user. 

  // we need to typecast event.value to HTMLInputElement, and with that inform Angular that we are 100% sure we will use this method only on input fields which have value. Also the result of it needs to be transformed to number (with Number() method) because all input fields (even if type = “number”) will return a string
}
