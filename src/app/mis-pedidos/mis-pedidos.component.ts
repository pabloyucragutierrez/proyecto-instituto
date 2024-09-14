import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.component.html',
  styleUrls: ['./mis-pedidos.component.css']
})
export class MisPedidosComponent implements OnInit {
  products: any[] = [];
  totalAmount: number = 0;

  ngOnInit(): void {
    const storedProducts = localStorage.getItem('purchasedProducts');
    const storedTotalAmount = localStorage.getItem('totalAmount');

    if (storedProducts) {
      this.products = JSON.parse(storedProducts);
    }
    if (storedTotalAmount) {
      this.totalAmount = JSON.parse(storedTotalAmount);
    }
  }
}
