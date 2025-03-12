import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscordService {
  private apiUrl = `${environment.apiUrl}/discord/roles`;

  constructor(private http: HttpClient) { }


  getUserRoles(userId: string): Observable<{ roles: any }> {
    return this.http.get<{ roles: string[] }>(`${this.apiUrl}/Groove Street/${userId}`);
  }
}
