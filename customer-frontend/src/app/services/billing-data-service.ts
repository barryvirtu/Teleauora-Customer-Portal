import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DATA_API_BASE } from './api-tokens';
import { Observable } from 'rxjs';

export interface BillingDataResponse {
  customer: BillingCustomerDetails;
  contracts: ContractItem[];
  financials: ProjectFinancials[];
  history: BillingHistoryItem[];
}


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

export interface BillingHistoryItem {
  issueDate: string;
  amountDue: number;
  dueDate: string;
  paid: boolean;
  pdfUrl: string;
}


export interface BillingCustomerDetails {
  firstName: string;
  lastName: string;
}

@Injectable({ providedIn: 'root' })
export class BillingDataService {
  private http = inject(HttpClient);
  private apiBase = inject(DATA_API_BASE);

  private getAuthHeaders() {
    const token = localStorage.getItem('jwt');
    const username = localStorage.getItem('username');

    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Username': username ?? ''
      }
    };
  }

  getBillingData(): Observable<BillingDataResponse> {
  return this.http.get<BillingDataResponse>(
    `${this.apiBase}/billing/get_billing_data`,
    this.getAuthHeaders()
  );
}


  /** GET contracts from backend */
  getContracts(): Observable<ContractItem[]> {
    return this.http.get<ContractItem[]>(
      `${this.apiBase}/billing/contracts`,
      this.getAuthHeaders()
    );
  }

  /** GET financials from backend */
  getFinancials(): Observable<ProjectFinancials[]> {
    return this.http.get<ProjectFinancials[]>(
      `${this.apiBase}/billing/financials`,
      this.getAuthHeaders()
    );
  }

getBillingHistory(): Observable<BillingHistoryItem[]> {
  return this.http.get<BillingHistoryItem[]>(
    `${this.apiBase}/billing/history`,
    this.getAuthHeaders()   // JWT + username
  );
}


  /** GET customer details for billing header */
  getCustomerDetails(): Observable<BillingCustomerDetails> {
    return this.http.get<BillingCustomerDetails>(
      `${this.apiBase}/billing/customer`,
      this.getAuthHeaders()
    );
  }
}
