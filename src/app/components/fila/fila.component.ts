import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-fila',
  imports: [],
  templateUrl: './fila.component.html',
  styleUrl: './fila.component.scss'
})
export class FilaComponent {
  @Output() close = new EventEmitter<void>();

  closeModal(){
    this.close.emit()
  }
}
