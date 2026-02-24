import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { AUTH_API_BASE } from './services/api-tokens';

interface LoginResponse {
  token?: string;
  message?: string;
}

interface JwtPayload {
  exp: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private authBase = inject(AUTH_API_BASE);
  private readonly TOKEN_KEY = 'jwtToken';

  login(username: string, password: string): Observable<boolean> {
    const url = `${this.authBase}/login`;
    const body = { username, password, app: 'Customer-app' };

    console.log('[AuthService] Sending login request to:', url);

    return this.http.post<LoginResponse>(url, body).pipe(
      tap(res => {
        if (res.token) localStorage.setItem(this.TOKEN_KEY, res.token);
      }),
      map(res => !!res.token),
      catchError(err => {
        console.error('[AuthService] Login error', err);
        return of(false);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token) return false;

    try {
      const payload: JwtPayload = jwtDecode(token);
      const now = Math.floor(Date.now() / 1000);
      if (payload.exp < now) {
        this.logout();
        return false;
      }
      return true;
    } catch (e) {
      console.error('[AuthService] Invalid token', e);
      this.logout();
      return false;
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
