import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(
    private http: HttpClient,
  ) { }


  private apiUrl = `${environment.apiUrl}/tickets`; // Substitua pela URL da sua API   


  createTicket(ticket: any) {
    return this.http.post(`${this.apiUrl}`, ticket)
  }

  getTicketsUser(userId: number) {
    return this.http.get(`${this.apiUrl}/user/${userId}`)
  }

  getTicket(ticketId: number) {
    return this.http.get(`${this.apiUrl}/${ticketId}`)
  }

  addMessage(tickeId: number, message: any) {
    return this.http.post(`${this.apiUrl}/${tickeId}/messages`, {
      sender: message.sender,
      message: message.message
    })
  }
}
