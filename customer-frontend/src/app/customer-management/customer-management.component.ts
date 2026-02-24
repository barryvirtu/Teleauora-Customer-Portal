import { Component, OnInit, inject } from '@angular/core';
import { CustomerDataService, CustomerDetails } from '../services/customer-data-service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.scss']
})
export class CustomerManagementComponent implements OnInit {

  // ✅ Modern Angular DI using inject()
  private customerService = inject(CustomerDataService);

  customer!: CustomerDetails;
  loading = true;

  ngOnInit(): void {
    this.customerService.getCustomerDetails().subscribe({
      next: (data) => {
        this.customer = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        console.error('Failed to fetch customer details');
      }
    });
  }
}
