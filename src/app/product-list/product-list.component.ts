import { Component } from '@angular/core';
import { PRODUCTS } from '../products';
import { Product } from  '../product.model';
import { CartService } from  '../cart.service';
import { ProductService } from '../product.service';
import { ProductDetailsComponent } from './product-details/product-details.component';
import Swal from 'sweetalert2';

declare var bootstrap: any; // Ensure Bootstrap API is available

@Component({
  imports: [ProductDetailsComponent],
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: Product[] = PRODUCTS;
  selectedProductId!: number | null;
  private modalInstance: any = null;

  constructor(private cartService: CartService, private productService: ProductService) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    Swal.fire({
      title: `${product.name} added to cart!`,
      buttonsStyling: false,
      confirmButtonText: 'Hurray!',
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
  }

  openDetails(product: Product): void {
    this.selectedProductId = product.id;

    // Ensure Bootstrap's Modal API initializes correctly
    setTimeout(() => {
      const modalElement = document.getElementById('DetailsModal');
      if (modalElement) {
        this.modalInstance = new bootstrap.Modal(modalElement);
        this.modalInstance.show();

        // Listen for when the modal is hidden
        modalElement.addEventListener('hidden.bs.modal', () => {
          this.cleanupModal();
        });
      }
    }, 100); // Small delay ensures Angular updates the view before opening
  }

  // Cleanup function to prevent the page from freezing
  cleanupModal(): void {
    this.selectedProductId = null; // Reset selected product
    this.removeBackdrop(); // Ensure backdrop is removed
  }

  // Manually remove modal backdrop
  removeBackdrop(): void {
    const backdrops = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach(backdrop => backdrop.remove());

    // Ensure body scrolling is restored
    document.body.classList.remove('modal-open');
    document.body.style.overflow = 'auto';
  }
}


// We have to create our own property products in the product-list component so we can set it equals to the PRODUCTS constant from our external file.