https://backend-groove.onrender.comimport { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(
    private http: HttpClient
  ) { }

  private UrlApi = 'https://backend-groove.onrender.com'


  getCharacters(discordId: string) {
    return this.http.get(`${this.UrlApi}/account/${discordId}/characters`)
  }
  getAccount(discordId: string) {
    return this.http.get(`${this.UrlApi}/account/${discordId}/account`)
  }
}
