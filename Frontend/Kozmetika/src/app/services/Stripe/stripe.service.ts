import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  readonly root = 'https://localhost:44302';
  takePaymentResult: string;
  constructor(private http: HttpClient) { }

  takePayment(order: string, amount: number, token: any) {
    let body = {
      tokenId: token.id,
      order: order,
      amount: amount
    };
    let bodyString = JSON.stringify(body);
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    this.http.post(this.root + '/api/stripepayment', bodyString, {headers: headers}).subscribe();
  }
}
