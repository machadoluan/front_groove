import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { allowlistGuard } from './allowlist.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/inicio/inicio.component').then((m) => m.InicioComponent)
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/inicio/inicio.component').then((m) => m.InicioComponent)
  },
  {
    path: 'terms',
    loadComponent: () =>
      import('./components/terms/terms.component').then((m) => m.TermsComponent)
  },
  {
    path: 'politica-de-privacidade',
    loadComponent: () =>
      import('./components/policy/policy.component').then((m) => m.PolicyComponent)
  },
  {
    path: 'politica-de-cookies',
    loadComponent: () =>
      import('./components/policy-cookies/policy-cookies.component').then((m) => m.PolicyCookiesComponent)
  },
  {
    path: 'ticket/:id',
    loadComponent: () =>
      import('./components/ticket/ticket.component').then((m) => m.TicketComponent)
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent)
  },
  {
    path: 'cadastro',
    loadComponent: () =>
      import('./pages/registro/registro.component').then((m) => m.RegistroComponent)
  },
  {
    path: 'allowlist',
    canActivate: [allowlistGuard],
    loadComponent: () =>
      import('./pages/allowlist/allowlist.component').then((m) => m.AllowlistComponent)
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent)
  }
];

