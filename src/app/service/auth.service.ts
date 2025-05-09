import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  private UrlApi = environment.apiUrl
  private guilds: { name: string }[] = [];
  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticado());
  authStatus$ = this.authStatus.asObservable();

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
    let token = this.getToken();
  
    if (!token) {
      return null;
    }
  
    try {
      token = token.split('#')[0].trim();
  
      const tokenPayload = token.split('.')[1];
  
      // Decodificação correta do Base64Url
      const decodedPayload = JSON.parse(this.decodeBase64Url(tokenPayload));
  
      return decodedPayload;
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return null;
    }
  }

  private decodeBase64Url(str: string): string {
    const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    const padding = '='.repeat((4 - (base64.length % 4)) % 4);
    return atob(base64 + padding);
  }


  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['']);
    window.location.reload()
  }

  cadastrar(dadosCadastro: any): Observable<any> {
    return this.http.post(`${this.UrlApi}/auth/create`, dadosCadastro)
  }


  verifyCode(email: string, name: string): Observable<any> {
    return this.http.post(`${this.UrlApi}/email-send`, { email, name})
  }

  updateAccount(dadosUpdate: any): Observable<any> {
    return this.http.put(`${this.UrlApi}/auth/update`, dadosUpdate)
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro desconhecido!';
    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do lado do servidor
      errorMessage = `Código do erro: ${error.status}\nMensagem: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
