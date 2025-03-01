import { Component, OnInit } from '@angular/core';
import { PRODUCTS } from '../products';
import { Product } from '../product.model';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';
import { CommentService } from '../comment.service';
import { ProductDetailsComponent } from './product-details/product-details.component';
import Swal from 'sweetalert2';

declare var bootstrap: any; // Ensure Bootstrap API is available

@Component({
  imports: [ProductDetailsComponent],
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = PRODUCTS;
  selectedProductId!: number | null;
  private modalInstance: any = null;

  constructor(
    private cartService: CartService, 
    private productService: ProductService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();

    // Preserve default rating if no comments exist
    this.products.forEach(product => {
      const avgRating = this.commentService.getAverageRating(product.id);
      if (avgRating > 0) {
        product.rating = avgRating; // Update only if valid rating exists
      }
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    Swal.fire({
      title: `${product.name} added to cart!`,
      buttonsStyling: false,
      confirmButtonText: 'Hurray!',
      customClass: { confirmButton: 'btn btn-primary' },
    });
  }

  openDetails(product: Product): void {
    this.selectedProductId = product.id;
    setTimeout(() => {
      const modalElement = document.getElementById('DetailsModal');
      if (modalElement) {
        this.modalInstance = new bootstrap.Modal(modalElement);
        this.modalInstance.show();
        modalElement.addEventListener('hidden.bs.modal', () => this.cleanupModal());
      }
    }, 100);
  }

  cleanupModal(): void {
    this.selectedProductId = null;
    this.removeBackdrop();
  }

  removeBackdrop(): void {
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => backdrop.remove());
    document.body.classList.remove('modal-open');
    document.body.style.overflow = 'auto';
  }

  getProductRating(product: Product): number {
    const avgRating = this.commentService.getAverageRating(product.id);
    return avgRating > 0 ? avgRating : product.rating; // Preserve default rating
  }
}

// We have to create our own property products in the product-list component so we can set it equals to the PRODUCTS constant from our external file.