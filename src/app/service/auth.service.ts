import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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

  // handleAuthCallback(code: string) {
  //   this.http.get<{ userData: string, discordID: string, needSteamLink: boolean, needsCadastro: boolean, token: string, guilds: { name: string }[] }>(`${this.UrlApi}/auth/callback?code=${code}`).subscribe(
  //     (response) => {
  //       localStorage.setItem('Token', response.token)
  //       localStorage.setItem('discordID', response.discordID)

  //       const nomeGuild = 'New York City';
  //       const userGuilds = response.guilds.map(guild => guild.name);

  //       if (!userGuilds.includes(nomeGuild)) {
  //         console.error('Usuário não pertence ao servidor necessário')
  //         this.logout()
  //         return
  //       }

  //       if (response.needsCadastro) {
  //         this.router.navigate(['/cadastro'])
  //       } else {
  //         this.router.navigate(['/dashboard'])
  //       }
  //     }, (error) => {
  //       console.error('Deu erro:', error)
  //     }
  //   )
  // }

  getGuilds() {
    return this.guilds;
  }

  getToken() {
    return localStorage.getItem('token');
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
    localStorage.removeItem('token')
    this.router.navigate(['']);
  }

  cadastrar(dadosCadastro: any): Observable<any> {
    return this.http.post(`${this.UrlApi}/auth/create`, dadosCadastro);
  }


  verifyCode(telefone: string): Observable<any> {
    return this.http.post(`${this.UrlApi}/twilio/enviar-codigo`, {telefone})
  }
}
