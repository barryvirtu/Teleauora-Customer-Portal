import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import {
  BillingDataService,
  ContractItem,
  ProjectFinancials,
  BillingCustomerDetails,
  BillingHistoryItem
} from '../services/billing-data-service';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  private router = inject(Router);
  private billingDataService = inject(BillingDataService);

  customer?: BillingCustomerDetails;
  contracts: ContractItem[] = [];
  projects: ProjectFinancials[] = [];
  billingHistory: BillingHistoryItem[] = [];

  ngOnInit(): void {
    this.loadBillingData();
  }

  private loadBillingData(): void {
  this.billingDataService.getBillingData().subscribe({
    next: data => {
      this.customer = data.customer;
      this.contracts = data.contracts;
      this.projects = data.financials;
      this.billingHistory = data.history;
    },
    error: () => {
      console.error('Failed to load billing data');
    }
  });
}


  /** Load customer billing info */
  private loadCustomer(): void {
    this.billingDataService.getCustomerDetails().subscribe({
      next: data => this.customer = data,
      error: () => {
        this.customer = { firstName: 'Walk‑in', lastName: 'Customer' };
      }
    });
  }

  /** Load contract list */
  private loadContracts(): void {
    this.billingDataService.getContracts().subscribe({
      next: items => this.contracts = items,
      error: () => {
        this.contracts = [
          { id: 'CON-2026-001', customerName: 'John Doe', date: '2026‑02‑10', status: 'Pending' },
          { id: 'CON-2025-088', customerName: 'John Doe', date: '2025‑11‑15', status: 'Signed' }
        ];
      }
    });
  }

  /** Load financials */
  private loadFinancials(): void {
    this.billingDataService.getFinancials().subscribe({
      next: f => this.projects = f,
      error: () => {
        this.projects = [
          { region: 'North UK', projectName: 'Fiber Infrastructure Lead-in', totalValue: 1250, paidAmount: 1250, remaining: 0, margin: '18%', budgetStatus: 'Under Budget' },
          { region: 'South UK', projectName: 'Internal Mesh Network Setup', totalValue: 450, paidAmount: 150, remaining: 300, margin: '24%', budgetStatus: 'Over Budget' }
        ];
      }
    });
  }

  /** Load billing history */
  private loadBillingHistory(): void {
    this.billingDataService.getBillingHistory().subscribe({
      next: items => this.billingHistory = items,
      error: () => {
        // fallback example data
        this.billingHistory = [
          {
            issueDate: '2026-01-01',
            amountDue: 34.99,
            dueDate: '2026-01-15',
            paid: true,
            pdfUrl: '/assets/sample.pdf'
          }
        ];
      }
    });
  }

  /** PDF download handler */
  downloadPdf(url: string): void {
    window.open(url, '_blank');
  }

  /** Summary calculations */
  get totalPortfolioValue(): number {
    return this.projects.reduce((acc, p) => acc + p.totalValue, 0);
  }

  get totalRemainingBalance(): number {
    return this.projects.reduce((acc, p) => acc + p.remaining, 0);
  }

  /** Navigation actions */
  createNewContract = () => this.router.navigate(['/create-agreement']);
  goBack = () => this.router.navigate(['/customer-details']);
}
