import { Routes } from '@angular/router';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {
    path: 'auth/callback',
    component: AuthCallbackComponent
  },
  {
    path: '',
    component: InicioComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: InicioComponent
  }
];
