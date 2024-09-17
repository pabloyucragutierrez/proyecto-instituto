// import { Component, OnInit } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css']
// })
// export class CartComponent implements OnInit {
//   cartItems: any[] = [];
//   totalAmount: number = 0;

//   constructor(private http: HttpClient, private router: Router) { }

//   ngOnInit(): void {
//     this.loadCartItems();
//   }

//   loadCartItems(): void {
//     const orderId = localStorage.getItem('id');
//     const token = localStorage.getItem('token');

//     if (orderId && token) {
//       const headers = new HttpHeaders().set('Authorization', `${token}`);
//       this.http.get<any[]>(`https://ansurbackendnestjs-production.up.railway.app/orders/${orderId}`, { headers })
//         .subscribe(response => {
//           const products = response.flatMap(order => 
//             order.orderHasProducts.map((orderProduct: any) => ({
//               id: orderProduct.product.id,
//               title: orderProduct.product.name,
//               description: orderProduct.product.description,
//               unit_price: orderProduct.product.price,
//               quantity: orderProduct.quantity,
//               image1: orderProduct.product.image1
//             }))
            
//           );
//           // console.log(response);
//           this.cartItems = products;
//           this.calculateTotal();
//         }, error => {
//           console.error('Error al obtener los productos del carrito:', error);
//         });
//     } else {
//       console.error('No se encontró el ID del pedido o el token.');
//     }
//   }

//   updateQuantity(productId: number, change: number): void {
//     const item = this.cartItems.find(i => i.id === productId);
//     if (item) {
//       item.quantity = Math.max(1, item.quantity + change);
//       this.calculateTotal();
//     }
//   }

//   removeItem(productId: number): void {
//     this.cartItems = this.cartItems.filter(item => item.id !== productId);
//     this.calculateTotal();
//   }

//   calculateTotal(): void {
//     this.totalAmount = this.cartItems.reduce((total, item) => total + (item.unit_price * item.quantity), 0);
//   }
// }


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    // Obtener los productos almacenados en el localStorage
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.cartItems = JSON.parse(cart);
    } else {
      this.cartItems = [];
    }
    this.calculateTotal();
  }

  updateQuantity(productId: number, change: number): void {
    const item = this.cartItems.find(i => i.id === productId);
    if (item) {
      item.quantity = Math.max(1, item.quantity + change);
      this.saveCartToLocalStorage(); // Actualizar el localStorage
      this.calculateTotal();
    }
  }

  removeItem(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.saveCartToLocalStorage(); // Actualizar el localStorage
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  saveCartToLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
}
