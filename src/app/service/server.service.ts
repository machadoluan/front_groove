import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(
    private http: HttpClient
  ) { }

  private UrlApi = environment.apiUrl


  getCharacters(discordId: string) {
    return this.http.get(`${this.UrlApi}/account/${discordId}/characters`)
  }

  getAccount(discordId: string) {
    return this.http.get(`${this.UrlApi}/account/${discordId}/account`)
  }

  releaseAllowList(discordId: string) {
    return this.http.post(`${this.UrlApi}/account/releaseAllowList/${discordId}`, {})
  }
}
