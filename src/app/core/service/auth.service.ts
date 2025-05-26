import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../env/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(
      `${environment.apiUrl}/auth/login`,
      { username, password },
      { headers }
    ).pipe(
      tap((response: any) => {
        if (response.token) {
          this.setAuthToken(response.token);
        }
      }),
      catchError(this.handleError)
    );
  }

  setAuthToken(token: string): void {
    this.cookieService.set('authToken', token, {
      expires: 1,
      path: '/',
      secure: true, 
      sameSite: 'Strict'
    });
  }

  getAuthToken(): string {
    return this.cookieService.get('authToken');
  }

  logout(): void {
    this.cookieService.delete('authToken', '/');
  }

  isLoggedIn(): boolean {
    return this.cookieService.check('authToken');
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const errorMessage = error.error?.message || 
                       (error.status === 401 ? 'Credenciales incorrectas' : 'Error en el servidor');
    return throwError(() => new Error(errorMessage));
  }
}