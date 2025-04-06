import { Directive, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appAutoResize]'
})
export class AutoResizeDirective implements AfterViewInit, OnChanges {
  // Se o conteúdo mudar, podemos ajustar novamente
  @Input('appAutoResize') content: any;

  constructor(private element: ElementRef) {}

  ngAfterViewInit() {
    this.resize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['content']) {
      this.resize();
    }
  }

  resize(): void {
    const textarea = this.element.nativeElement as HTMLTextAreaElement;
    if (textarea) {
      textarea.style.height = 'auto'; // reseta a altura para recalcular
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }
}
