import { Component } from '@angular/core';

@Component({
  selector: 'app-detalle-del-producto',
  templateUrl: './detalle-del-producto.component.html',
  styleUrl: './detalle-del-producto.component.css'
})
export class DetalleDelProductoComponent {
  quantity: number = 1;

  aumentar(){
    this.quantity++;
    this.updateQuantityInput();
  }

  disminuir(){
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
