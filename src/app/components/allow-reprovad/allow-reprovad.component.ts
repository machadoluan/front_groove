import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-allow-reprovad',
  imports: [],
  templateUrl: './allow-reprovad.component.html',
  styleUrl: './allow-reprovad.component.scss',
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
export class AllowReprovadComponent {
  @Output() close = new EventEmitter<void>();


  closeModal() {
    this.close.emit()
  }

  concluir() {
    this.close.emit()

  }
}
