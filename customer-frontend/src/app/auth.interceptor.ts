// src/app/auth.interceptor.ts
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  // Read token from sessionStorage to align with AuthService
  const token = sessionStorage.getItem('jwtToken');
  const router = inject(Router);

  const withAuth = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  // (Dev) log outbound requests; comment out later
  // console.debug('[HTTP]', withAuth.method, withAuth.urlWithParams, 'auth:', !!token);

  return next(withAuth).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        // Token missing/expired/invalid — clear & redirect
        sessionStorage.removeItem('jwtToken');
        sessionStorage.removeItem('auth_username');
        router.navigate(['/login'], { queryParams: { reason: 'expired' } });
      }
      return throwError(() => err);
    })
  );
};
