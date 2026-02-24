import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideRouter, withRouterConfig } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app-component';
import 'zone.js';

import { environment } from './environments/environment';
import { DATA_API_BASE, AUTH_API_BASE } from './app/services/api-tokens';
import { AuthInterceptor } from './app/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withRouterConfig({ onSameUrlNavigation: 'reload' })),

    // ⭐ Correct modern Angular interceptor registration
    provideHttpClient(
      withInterceptors([AuthInterceptor])
    ),

    importProvidersFrom(FormsModule),

    // Provide BOTH base URL tokens app-wide
    { provide: DATA_API_BASE, useValue: environment.dataApiUrl },
    { provide: AUTH_API_BASE, useValue: environment.authApiUrl }
  ]
}).catch(err => console.error(err));
