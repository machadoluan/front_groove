import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './service/auth.service';
import { ServerService } from './service/server.service';

export const allowlistGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService); // Injeta o serviço de autenticação
  const serverService = inject(ServerService); // Injeta o serviço de servidor
  const router = inject(Router); // Injeta o Router para redirecionamento

  // Obtém o usuário do token
  const user = auth.getUserFromToken();

  if (!user) {
    // Se não houver usuário, redireciona para a página de login
    router.navigate(['/login']);
    return false;
  }

  // Verifica se o usuário está na lista de permissões
  return new Promise<boolean>((resolve) => {
    serverService.getAccount(user.discordId).subscribe(
      (res: any) => {
        if (res[0].whitelist === 1) {
          router.navigate(['/']);
          resolve(false);
        } else if (res[0].whitelist === 0) {
          resolve(true);
        }
      },
      (err: any) => {
        console.error(err);
        router.navigate(['/error']); // Redireciona para uma página de erro em caso de falha
        resolve(false);
      }
    );
  });
};