import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NovidadeService {

  constructor(
    private http: HttpClient,
  ) { }

  private apiUrl = `${environment.apiUrl}/novidades`

  getNovidades() {
    return this.http.get<any[]>(`${this.apiUrl}`)
  }

}
