import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

  crearUsuario(formData: LoginForm) {
    return this.http.post(`${base_url}/usuarios`, formData);
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.data);
      })
    );
  }

  loginGoogle(token) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.data);
      })
    );
  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    const email = localStorage.getItem('email') || '';
    return this.http.post(`${base_url}/login/renew`, { email, token }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.data);
      }),
      map((resp) => {
        if (resp.status) {
          return true;
        } else {
          return false;
        }
      }),
      catchError((error) => of(false))
    );
  }
}
