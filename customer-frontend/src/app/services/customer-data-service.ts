import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

// Shape of customer data returned by backend
export interface CustomerDetails {
  customerName: string;
  address: string;
  uprn: string;
  cpeId: string;
  routerId: string;
  currentSubscription: string;
  nextBillDueDate: string;
}

@Injectable({ providedIn: 'root' })
export class CustomerDataService {

  // ✅ Modern DI
  private http = inject(HttpClient);

  getCustomerDetails(): Observable<CustomerDetails> {
    return this.http.get<CustomerDetails>(
      `${environment.dataApiUrl}/get-customer-details`
    );
  }
}
