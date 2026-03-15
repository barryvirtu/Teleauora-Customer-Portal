import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, map } from 'rxjs';
import { AuthService } from '../auth.service';

// Shape of customer data returned by backend
export interface CustomerDetails {
  customerName: string;
  address: string;
  uprn: string;
  cpeId: string;
  routerId: string;
  currentSubscription: string;
  nextBillDueDate: string;       // Expect ISO date string from backend
  contractStartDate?: string;    // Optional - include if backend returns them
  contractEndDate?: string;
}

@Injectable({ providedIn: 'root' })
export class CustomerDataService {
  // ✅ Modern DI with proper typing (fixes TS2571)
  private http = inject(HttpClient);
  private auth = inject<AuthService>(AuthService);

  /**
   * Calls the backend to get the current user's customer details.
   * - Appends `username` as a query parameter.
   * - Authorization header is attached by the AuthInterceptor.
   */
  getCustomerDetails(): Observable<CustomerDetails> {
    const username = this.auth.getUsername();
    if (!username) {
      throw new Error('No username in session. User must be logged in.');
    }

    const url = `${environment.dataApiUrl}/get-customer-details`;
    const params = new HttpParams().set('username', username);

    // DEV: confirm outgoing URL + params; remove once verified
    console.debug('[CustomerDataService] GET', url, params.toString());

    return this.http.get<CustomerDetails>(url, { params }).pipe(
      // Optional normalization if backend date formats vary
      map((dto) => ({
        ...dto,
        nextBillDueDate: normalizeToIso(dto.nextBillDueDate),
        contractStartDate: dto.contractStartDate ? normalizeToIso(dto.contractStartDate) : undefined,
        contractEndDate: dto.contractEndDate ? normalizeToIso(dto.contractEndDate) : undefined,
      }))
    );
  }
}

/**
 * Best-effort date normalization to ISO-8601 string.
 * - If already ISO, returns as-is.
 * - If parseable by Date, returns ISO string.
 * - Otherwise returns the original string so UI can still render it raw.
 */
function normalizeToIso(input: string): string {
  if (!input) return input;
  if (/^\d{4}-\d{2}-\d{2}/.test(input)) return input; // already ISO-like
  const d = new Date(input);
  return isNaN(d.getTime()) ? input : d.toISOString();
}
