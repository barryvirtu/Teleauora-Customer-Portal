// src/app/app-component.ts
import { Component, signal, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app-component.html',
  styleUrls: ['./app-component.scss']
})
export class AppComponent {
  protected readonly title = signal('teleauro-Customer-app');
  private router = inject(Router);
  private auth = inject(AuthService);

  constructor() {
    // 🔎 Router event tracing
    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationStart)  console.log('[Router] NavigationStart →', evt.url);
      if (evt instanceof NavigationEnd)    console.log('[Router] NavigationEnd   →', evt.urlAfterRedirects);
      if (evt instanceof NavigationCancel) console.warn('[Router] NavigationCancel:', evt.reason);
      if (evt instanceof NavigationError)  console.error('[Router] NavigationError:', evt.error);
    });
  }
}
