import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { ConfirmationService, MessageService } from 'primeng/api';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideNgxMask } from 'ngx-mask';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { SecretInterceptor } from './interceptors/secret.interceptor';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { routes } from './app.routes';
registerLocaleData(localePt);
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom(
      RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ),
    provideHttpClient(
      withInterceptors([SecretInterceptor])
    ),
    provideAnimationsAsync(),
    provideToastr(),
    provideAnimations(),
    provideNgxMask(),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    providePrimeNG({
      theme: {
        preset: Aura
      },
      ripple: true,

      translation: {
        accept: 'Aceitar', // Tradução para "Aceitar"
        reject: 'Rejeitar', // Tradução para "Rejeitar"
        dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
        dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
        monthNames: [
          'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
          'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
        ],
        monthNamesShort: [
          'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
        ],
        today: 'Hoje',
        clear: 'Limpar',
      },

    }),
    MessageService,
    ConfirmationService
  ]
};
