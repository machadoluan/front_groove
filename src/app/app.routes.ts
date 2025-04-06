import { Routes } from '@angular/router';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AllowlistComponent } from './pages/allowlist/allowlist.component';
import { allowlistGuard } from './allowlist.guard';
import { TermsComponent } from './components/terms/terms.component';
import { PolicyComponent } from './components/policy/policy.component';
import { PolicyCookiesComponent } from './components/policy-cookies/policy-cookies.component';
import { TicketComponent } from './pages/ticket/ticket.component';

export const routes: Routes = [
  {
    path: '',
    component: InicioComponent
  },
  {
    path: 'home',
    component: InicioComponent
  },
  {
    path: 'terms',
    component: TermsComponent

  },
  {
    path: 'politica-de-privacidade',
    component: PolicyComponent

  },
  {
    path: 'politica-de-cookies',
    component: PolicyCookiesComponent

  },
  {
    path: 'ticket/:id',
    component: TicketComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cadastro',
    component: RegistroComponent
  },
  {
    path: 'allowlist',
    component: AllowlistComponent,
    canActivate: [allowlistGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
