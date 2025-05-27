import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../env/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);

  private static readonly AUTH_TOKEN_KEY = 'authToken';

  login(username: string, password: string): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(
      `${environment.apiUrl}/auth/login`,
      { username, password },
      { headers: { 'Content-Type': 'application/json' } }
    ).pipe(
      tap(({ access_token }) => this.setAuthToken(access_token)),
      catchError(this.handleError)
    );
  }

  setAuthToken(token: string): void {
    this.cookieService.set(AuthService.AUTH_TOKEN_KEY, token, {
      expires: 1, 
      path: '/',
      secure: true,
      sameSite: 'Strict'
    });
  }

  getAuthToken(): string {
    return this.cookieService.get(AuthService.AUTH_TOKEN_KEY);
  }

  logout(): void {
    this.cookieService.delete(AuthService.AUTH_TOKEN_KEY, '/');
  }

  isLoggedIn(): boolean {
    return this.cookieService.check(AuthService.AUTH_TOKEN_KEY);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const errorMessage = error.error?.message || 
                       (error.status === 401 ? 'Credenciales incorrectas' : 'Error en el servidor');
    return throwError(() => new Error(errorMessage));
  }
}