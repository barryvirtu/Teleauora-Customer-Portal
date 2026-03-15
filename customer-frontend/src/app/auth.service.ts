// src/app/services/auth.service.ts
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
  private readonly USERNAME_KEY = 'auth_username';

  // 🔁 Use sessionStorage so a hard refresh/new tab kills the session
  private storage: Storage = sessionStorage;

  /**
   * Logs in and persists both the JWT and the username used to log in.
   */
  login(username: string, password: string): Observable<boolean> {
    const url = `${this.authBase}/login`;
    const body = { username, password, app: 'Customer-app' };

    console.log('[AuthService] Sending login request to:', url);

    return this.http.post<LoginResponse>(url, body).pipe(
      tap(res => {
        if (res.token) {
          this.storage.setItem(this.TOKEN_KEY, res.token);
          this.storage.setItem(this.USERNAME_KEY, username);
        }
      }),
      map(res => !!res.token),
      catchError(err => {
        console.error('[AuthService] Login error', err);
        return of(false);
      })
    );
  }

  /**
   * Clears token and username, then navigates to /login.
   */
  logout(): void {
    this.storage.removeItem(this.TOKEN_KEY);
    this.storage.removeItem(this.USERNAME_KEY);
    this.router.navigate(['/login']);
  }

  /**
   * Checks if a valid (non-expired) token exists.
   */
  isLoggedIn(): boolean {
    const token = this.storage.getItem(this.TOKEN_KEY);
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

  /**
   * Returns the raw JWT from storage.
   */
  getToken(): string | null {
    return this.storage.getItem(this.TOKEN_KEY);
  }

  /**
   * Returns the username that was persisted at login time.
   */
  getUsername(): string | null {
    return this.storage.getItem(this.USERNAME_KEY);
  }
}
