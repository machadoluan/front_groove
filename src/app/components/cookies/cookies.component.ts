import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.scss'],
  imports: [CommonModule],
  animations: [
    trigger('slideUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(60px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(60px)' })),
      ]),
    ]),
  ],
})
export class CookiesComponent implements OnInit {
  showPopup = false;

  ngOnInit() {
    const cookieDecision = localStorage.getItem('cookieConsent');
    this.showPopup = !cookieDecision;
  }

  acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    this.showPopup = false;
    // Implemente aqui lógica adicional caso aceite cookies,
    // como inicializar scripts de rastreamento.
  }

  declineCookies() {
    localStorage.setItem('cookieConsent', 'declined');
    this.showPopup = false;
    // Implemente aqui lógica adicional para caso rejeite os cookies,
    // como desabilitar scripts de rastreamento, se houver.
  }
}
