import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import {
  MatDialog,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        MatDialogContent,
        MatButtonModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(
  ) { }

  loginWithDiscord() {
    window.location.href = 'https://backend-groove.onrender.com/auth/discord';
  }
}
