import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  private UrlApi = 'http://localhost:3000'
  private guilds: { name: string }[] = [];

  loginWithDiscord() {
    window.location.href = `${this.UrlApi}/auth/discord`
  }

  handleAuthCallback(code: string) {
    this.http.get<{ token: string, guilds: { name: string }[] }>(`${this.UrlApi}/auth/callback?code=${code}`).subscribe(
      (response) => {
        localStorage.setItem('Token', response.token)

        const nomeGuild = 'New York City';
        const userGuilds = response.guilds.map(guild => guild.name)

        if (userGuilds.includes(nomeGuild)) {
          this.router.navigate(['/dashboard'])
        } else {
          console.error('Você não esta não esta no servidor.')
          this.logout()
        }
      }, (error) => {
        console.error('Deu erro:', error)
      }
    )
  }

  getGuilds() {
    return this.guilds;
  }

  getToken() {
    return localStorage.getItem('Token');
  }

  isAuthenticado(): boolean {
    const token = this.getToken()
    return !!token
  }

  getUserFromToken(): any | null {
    const token = this.getToken();
    if (token) {
      const tokenPayload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(tokenPayload));
      return decodedPayload;
    }
    return null;
  }

  logout() {
    localStorage.removeItem('Token');
    this.router.navigate(['']);
  }
}
