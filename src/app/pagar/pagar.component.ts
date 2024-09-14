import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.css']
})
export class PagarComponent implements OnInit {

  private mp: any;
  products: any[] = [];
  totalAmount: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const orderId = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    if (orderId && token) {
      const headers = new HttpHeaders().set('Authorization', `${token}`);
      
      this.http.get<any[]>(`https://ansurbackendnestjs-production.up.railway.app/orders/${orderId}`, { headers }).subscribe(response => {
        this.products = response.flatMap(order => 
          order.orderHasProducts.map((orderProduct: any) => ({
            title: orderProduct.product.name,
            unit_price: orderProduct.product.price,
            quantity: orderProduct.quantity,
            image1: orderProduct.product.image1
          }))
        );

        this.totalAmount = this.products.reduce((total, product) => total + (product.unit_price * product.quantity), 0);
      }, error => {
        console.error('Error al obtener los productos:', error);
      });
    }
    

    this.mp = new (window as any).MercadoPago('TEST-34422d86-4f9c-4426-8b6d-60ff374b6909', { locale: 'es-AR' });
  }

  payWithMercadoPago(): void {
    const accessToken = 'TEST-6239032100822731-090817-0c82c6f39ab7dd100c12208f23b3b014-1983574764'; 
    this.http.post<any>('https://api.mercadopago.com/checkout/preferences?access_token=' + accessToken, {
      items: this.products.map(product => ({
        title: product.title,
        quantity: product.quantity,
        unit_price: product.unit_price
      })),
      back_urls: {
        success: 'https://proyecto-del-instituto.netlify.app/compra-realizada',
        failure: 'https://proyecto-del-instituto.netlify.app/error-en-la-compra',
        pending: 'https://proyecto-del-instituto.netlify.app/'
      },
      auto_return: 'approved',
      payer_email: 'pabloyucragutierrez@gmail.com'
    }).subscribe(response => {
      const preferenceId = response.id;

      this.mp.checkout({
        preference: {
          id: preferenceId
        },
        autoOpen: true
      });

      localStorage.setItem('purchasedProducts', JSON.stringify(this.products));
      localStorage.setItem('totalAmount', JSON.stringify(this.totalAmount));
    }, error => {
      console.error('Error al realizar el pago:', error);
    });
  }
}
