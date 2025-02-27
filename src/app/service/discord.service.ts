import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscordService {
  private apiUrl = 'http://localhost:3000/discord/roles';

  constructor(private http: HttpClient) { }


  getUserRoles(userId: string): Observable<{ roles: any }> {
    return this.http.get<{ roles: string[] }>(`${this.apiUrl}/New York City/${userId}`);
  }
}
