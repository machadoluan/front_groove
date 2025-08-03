import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private http: HttpClient
  ) { }


  private UrlApi = environment.apiUrl;

  checkout(dados: any) {
    return this.http.post(`${this.UrlApi}/payment/checkout`, {
      name: dados.nome,
      price: dados.price,
      quantity: dados.quantity,
      license: dados.license
    })
  }

}
