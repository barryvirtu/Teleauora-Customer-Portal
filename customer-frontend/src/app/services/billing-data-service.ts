import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DATA_API_BASE } from './api-tokens';
import { Observable } from 'rxjs';

export interface ContractItem {
  id: string;
  customerName: string;
  date: string;
  status: 'Signed' | 'Pending' | 'Expired';
}

export interface ProjectFinancials {
  region: string;
  projectName: string;
  totalValue: number;
  paidAmount: number;
  remaining: number;
  margin: string;
  budgetStatus: 'Under Budget' | 'Over Budget' | 'On Target';
}

export interface BillingCustomerDetails {
  firstName: string;
  lastName: string;
}

@Injectable({ providedIn: 'root' })
export class BillingDataService {
  private http = inject(HttpClient);
  private apiBase = inject(DATA_API_BASE);

  /** GET contracts from backend */
  getContracts(): Observable<ContractItem[]> {
    return this.http.get<ContractItem[]>(`${this.apiBase}/billing/contracts`);
  }

  /** GET financials from backend */
  getFinancials(): Observable<ProjectFinancials[]> {
    return this.http.get<ProjectFinancials[]>(`${this.apiBase}/billing/financials`);
  }

  /** GET customer details for billing header */
  getCustomerDetails(): Observable<BillingCustomerDetails> {
    return this.http.get<BillingCustomerDetails>(`${this.apiBase}/billing/customer`);
  }
}
