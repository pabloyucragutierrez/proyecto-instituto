import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  quantity: number = 1; 

  aumentar() {
    this.quantity++;
    this.updateQuantityInput();
  }

  disminuir() {
    if (this.quantity > 1) {
      this.quantity--;
      this.updateQuantityInput();
    }
  }

  updateQuantityInput(): void {
    const quantityInput = document.getElementById('quantity') as HTMLInputElement;
    if (quantityInput) {
      quantityInput.value = this.quantity.toString();
    }
  }
}
