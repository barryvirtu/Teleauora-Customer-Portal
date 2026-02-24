import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


interface StepDef {
  label: string;
  icon: string;
  route: string;
  stepNumber: number;
}


@Component({
  selector: 'app-progress-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './progress-section.component.html',
  styleUrls: ['./progress-section.component.scss']
})
export class ProgressSectionComponent {
  @Input() currentStep = 0;

  /** If you ever change the number of steps, update just this array */
  public readonly steps: StepDef[] = [
    { stepNumber: 1, label: 'Customer Details',   icon: 'geo-marker', route: '/customer-management' },
    { stepNumber: 2, label: 'Billing Information',     icon: 'package',    route: '/billing' },
    { stepNumber: 3, label: 'Support',     icon: 'package',    route: '/support' },
  ];

  /** Safe percentage: clamps to 0..100 */
  public get progressPercentage(): number {
    const totalSteps = this.steps.length;

    const step = Number(this.currentStep);
    if (!Number.isFinite(step) || totalSteps <= 1) return 0;

    // step 1 => 0%, last step => 100%
    const raw = ((step - 1) / (totalSteps - 1)) * 100;

    // clamp to [0, 100]
    return Math.max(0, Math.min(100, raw));
  }

  /** true if a step is clickable (only past steps) */
  public canNavigateTo(stepNumber: number): boolean {
    return this.currentStep > stepNumber;
  }

  public onStepClick(stepNumber: number, event: MouseEvent): void {
    if (!this.canNavigateTo(stepNumber)) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
