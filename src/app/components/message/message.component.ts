

import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-message',
  imports: [CommonModule, RouterLink],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss', 
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
export class MessageComponent {
  @Output() close = new EventEmitter<void>();


  closeModal() {
    this.close.emit()
  }

  concluir() {
    this.close.emit()

  }
}
