import { Routes } from '@angular/router';
import { AuthGuard } from './auth-guard';

export const routes: Routes = [
  // Public login page
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login-component').then(m => m.LoginComponent)
  },

  // Authenticated area
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadComponent: () =>
      import('./customer-layout.component').then(m => m.SalesFunnelLayout),
    children: [

      { path: '', pathMatch: 'full', redirectTo: 'customer-management' },

      // CUSTOMER MANAGEMENT
      {
        path: 'customer-management',
        loadComponent: () =>
          import('./customer-management/customer-management.component')
            .then(m => m.CustomerManagementComponent)
      },

      // BILLING (FIXED IMPORT)
      {
        path: 'billing',
        loadComponent: () =>
          import('./billing/billing.component')
            .then(m => m.BillingComponent)   // <-- FIXED HERE
      },

      // SUPPORT
      {
        path: 'support',
        loadComponent: () =>
          import('./support/support.component')
            .then(m => m.SupportComponent)
      }
    ]
  },

  { path: '**', redirectTo: 'login' }
];

