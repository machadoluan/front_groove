https://backend-groove.onrender.comimport { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js'

@Injectable({
  providedIn: 'root'
})
export class MercadopagoService {
  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  createPayment(items: any[]) {
    return this.http.post<any>(`${this.apiUrl}/create-checkout`, items);
  }
}
