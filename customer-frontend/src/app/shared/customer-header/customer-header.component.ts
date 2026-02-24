import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-header',   // ✅ FIXED selector prefix
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.scss']
})
export class CustomerHeaderComponent {
  @Input() currentStep = 1;
}
