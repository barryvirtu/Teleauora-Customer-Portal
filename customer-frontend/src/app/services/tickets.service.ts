import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface TicketPayload {
  summary: string;
  details?: string;   // <-- make optional
  priority_id?: number;
  tickettype_id?: number;
  team?: string;
  workflow_id?: number;
  workflow_step?: number;
}


export interface TicketResponse {
  id: number;
  ref: string;
  summary: string;
  details?: string;
  priority_id?: number;
  status?: string;
  customerName?: string;
  customerEmail?: string;
  priority?: string;
}

@Injectable({ providedIn: 'root' })
export class TicketService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.dataApiUrl}/tickets`;

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

  /** Unified endpoint — get all tickets for logged‑in customer */
  getCustomerTickets(): Observable<TicketResponse[]> {
    return this.http.get<TicketResponse[]>(
      `${this.base}/customer/all`,
      this.getAuthHeaders()
    );
  }

  createTicketForCustomer(customerId: number, payload: TicketPayload): Observable<TicketResponse> {
    return this.http.post<TicketResponse>(
      `${this.base}/customer/${customerId}`,
      payload,
      this.getAuthHeaders()
    );
  }

  updateTicket(id: number, changes: TicketPayload): Observable<TicketResponse> {
    return this.http.put<TicketResponse>(
      `${this.base}/${id}`,
      changes,
      this.getAuthHeaders()
    );
  }

  deleteTicket(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.base}/${id}`,
      this.getAuthHeaders()
    );
  }
}
