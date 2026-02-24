import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Lead {
  id: string;
  address: string;
  postcode: string;
  people: number;
  value: string;
  status: string;
  priority: string;
  phone?: string;
}

export interface Package {
  name: string;
  tier: 'basic' | 'standard' | 'premium' | 'platinum' | 'bonus';
  business: boolean;
  price: string;
  data: number;
  speed: number;
  features: string;
  badge?: string;
}

export interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  personalId: string;
}

export interface SalesFunnelData {
  lead: Lead | null;
  package: Package | null;
  customerDetails: CustomerDetails | null;
  discount: number;
  signature: string | null;
  selectedPackage?: Package;
}

@Injectable({
  providedIn: 'root'
})
export class SalesFunnelDataService {
  private dataSubject = new BehaviorSubject<SalesFunnelData>({
    lead: null,
    package: null,
    customerDetails: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      personalId: ''
    },
    discount: 0,
    signature: null
  });

  public data$: Observable<SalesFunnelData> = this.dataSubject.asObservable();

  getData(): SalesFunnelData {
    return this.dataSubject.value;
  }

  updateLead(lead: Lead): void {
    const current = this.dataSubject.value;
    this.dataSubject.next({ ...current, lead });
  }

  updatePackage(pkg: Package): void {
    const current = this.dataSubject.value;
    this.dataSubject.next({ ...current, package: pkg, selectedPackage: pkg });
  }

  updateCustomerDetails(details: CustomerDetails): void {
    const current = this.dataSubject.value;
    this.dataSubject.next({ ...current, customerDetails: details });
  }

  updateDiscount(discount: number): void {
    const current = this.dataSubject.value;
    this.dataSubject.next({ ...current, discount });
  }

  updateSignature(signature: string): void {
    const current = this.dataSubject.value;
    this.dataSubject.next({ ...current, signature });
  }

  reset(): void {
    this.dataSubject.next({
      lead: null,
      package: null,
      customerDetails: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        personalId: ''
      },
      discount: 0,
      signature: null
    });
  }
}
