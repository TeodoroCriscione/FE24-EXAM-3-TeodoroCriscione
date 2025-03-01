import { Routes } from '@angular/router';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductDetailsComponent} from './product-list/product-details/product-details.component' ;
import {CartComponent} from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

export const routes:  Routes = [
{ path: '', component: HomeComponent },
{ path: 'about', component: AboutComponent },
{ path: 'products-list', component: ProductListComponent },
{ path: 'cart', component: CartComponent },
{ path: 'details/:id', component: ProductDetailsComponent }
];