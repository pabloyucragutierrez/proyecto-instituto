import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.css']
})
export class PagarComponent implements AfterViewInit {

  private mp: any;

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.mp = new (window as any).MercadoPago('TEST-34422d86-4f9c-4426-8b6d-60ff374b6909', { locale: 'es-AR' });
  }

  payWithMercadoPago(): void {
    const accessToken = 'TEST-6239032100822731-090817-0c82c6f39ab7dd100c12208f23b3b014-1983574764'; 
    this.http.post<any>('https://api.mercadopago.com/checkout/preferences?access_token=' + accessToken, {
      items: [
        {
          title: 'Foco led Philips',
          unit_price: 2.00,
          quantity: 1,
          currency_id: 'PEN'
        },
        {
          title: 'Ganchos de pared',
          unit_price: 2.00,
          quantity: 1,
          currency_id: 'PEN'
        },
        {
          title: 'USB de 32 GB Kingston',
          unit_price: 2.00,
          quantity: 1,
          currency_id: 'PEN'
        }
      ],
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
    }, error => {
      console.error('Error al realizar el pago:', error);
    });
  }
}
