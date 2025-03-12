import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-fila',
  imports: [CommonModule],
  templateUrl: './fila.component.html',
  styleUrl: './fila.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class FilaComponent {
  @Output() close = new EventEmitter<void>();


  closeModal() {
    this.close.emit()
  }


  entrar() {
    window.location.href = `${environment.apiUrl}/auth/discord`;
  }
}
