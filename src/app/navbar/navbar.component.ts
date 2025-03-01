import { Component, DoCheck } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../cart.service';
import { CartComponent } from '../cart/cart.component';
import { NgIf } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CartComponent, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements DoCheck {
  constructor(private cartService: CartService){}

  totalQ : number = 0;
  ngDoCheck(): void {
    this.totalQ = this.cartService.getCartTotalQuantity();
  }

  openCart(): void {
    const cartComponent = document.querySelector('.modal');
    if (cartComponent) {
      (cartComponent as any).openCart(); // Call the method in CartComponent
    }
}}
