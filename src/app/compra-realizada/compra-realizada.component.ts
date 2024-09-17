import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compra-realizada',
  templateUrl: './compra-realizada.component.html',
  styleUrls: ['./compra-realizada.component.css'],
})
export class CompraRealizadaComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('status') === 'approved') {
      // Almacena los productos solo si la compra fue exitosa
      this.storePurchasedProducts();
    }
  }

  storePurchasedProducts(): void {
    // Verifica que hay productos en localStorage antes de intentar almacenarlos
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart.length > 0) {
      localStorage.setItem('purchasedProducts', JSON.stringify(cart));
      localStorage.setItem('totalAmount', JSON.stringify(this.calculateTotalAmount(cart)));
      // Limpia el carrito
      localStorage.removeItem('cart');
    }
  }

  calculateTotalAmount(products: any[]): number {
    return products.reduce((total, product) => total + product.price * product.quantity, 0);
  }
}
