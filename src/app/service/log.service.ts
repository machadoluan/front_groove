import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }


  private apiUrl = `${environment.apiUrl}/analytics`;

  log(event: string) {
    return this.http.post(`${this.apiUrl}/log`, {
      event: event,
      userId: this.authService.getUserFromToken()?.id
    })
  }

}
