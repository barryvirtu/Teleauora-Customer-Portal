import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomerHeaderComponent } from './shared/customer-header/customer-header.component';
import { ProgressSectionComponent } from './shared/progress-section/progress-section.component';
import { ISalesFunnelLayoutChild } from './shared/customer-child.module';

@Component({
  selector: 'app-customer-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    CustomerHeaderComponent,
    ProgressSectionComponent,
  ],
  template: `
    <div class="funnel-wrapper">
      <div class="funnel-container">

        <!-- HEADER -->
        <app-customer-header
          [currentStep]="currentStep">
        </app-customer-header>

        <!-- PROGRESS BAR -->
        <app-progress-section
          [currentStep]="currentStep">
        </app-progress-section>

        <!-- CHILD ROUTED COMPONENT -->
        <router-outlet
          (activate)="onChildActivated($event)">
        </router-outlet>

      </div>
    </div>
  `
})
export class SalesFunnelLayout {
  private selectedIndex = signal(1);

  /** Fired whenever a routed child component activates */
  onChildActivated(componentInstance: ISalesFunnelLayoutChild): void {
    this.selectedIndex.set(componentInstance.salesFunnelIndex);
  }

  /** Add 1 because your layout uses 1‑based steps */
  get currentStep(): number {
    return this.selectedIndex() + 1;
  }
}
