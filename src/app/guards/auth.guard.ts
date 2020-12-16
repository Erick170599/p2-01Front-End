import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('Pasó por el Guardían');
    return this.usuarioService.validarToken().pipe(
      tap((isAuth) => {
        if (!isAuth) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}
