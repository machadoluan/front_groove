import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from '../../service/ticket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { AutoResizeDirective } from '../../auto-resize.directive';

@Component({
  selector: 'app-ticket',
  imports: [DialogModule, CommonModule, SelectModule, FormsModule, InputTextModule, TextareaModule, AutoResizeDirective],

  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss'
})
export class TicketComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService,
  ) { }


  display: boolean = false;
  ticket: any;
  newMessage: string = '';

  categorias = [
    { name: '[🐛] Bugs', emoji: '🐛' },
    { name: '[🛠️] Suporte geral', emoji: '🛠️' },
    { name: '[🚨] Denuncia', emoji: '🚨' },
    { name: '[💡] Sugestões', emoji: '💡' },
  ];


  ngOnInit() {



  }


  loadTickets(id: number) {
    if (id) {
      this.ticketService.getTicket(id).subscribe({
        next: (res: any) => {
          this.ticket = res;
          console.log(res);
        },
        error: (error) => {
          console.error('Error loading ticket:', error);
        }
      });
    } else {
      console.error('Ticket ID is null or undefined');
    }
  }

  sendMessage() {
    if (!this.ticket || !this.ticket.id || !this.newMessage.trim()) return;

    this.ticketService.addMessage(this.ticket.id, { sender: 'USER', message: this.newMessage }).subscribe({
      next: (res: any) => {
        // Adiciona a nova mensagem ao chat
        this.ticket.messages.push(res);
        this.newMessage = '';
      },
      error: (err) => {
        console.error('Erro ao enviar mensagem:', err);
      }
    });
  }

  get isLastMessageUser(): boolean {
    const lastMessage = this.ticket?.messages?.[this.ticket.messages.length - 1];
    return lastMessage?.sender === 'USER';
  }

}
