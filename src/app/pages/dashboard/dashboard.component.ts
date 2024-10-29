import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  user: any
  avatar: string = '';

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.auth.getUserFromToken()
    console.log('User: ', this.user)
  }

  getAvatar(userId: string, avatar: string) {
    return `https://cdn.discordapp.com/avatars/${userId}/${avatar}.png`
  }

  sair() {
    this.auth.logout()
  }
}
