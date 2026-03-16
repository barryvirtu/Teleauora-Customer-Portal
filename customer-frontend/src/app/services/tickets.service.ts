import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface TicketPayload {
  summary: string;
  details?: string;
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

  /** Get all tickets for the logged‑in customer */
  getCustomerTickets(): Observable<TicketResponse[]> {
    return this.http.get<TicketResponse[]>(`${this.base}/customer/all`);
  }

  createTicketForCustomer(customerId: number, payload: TicketPayload): Observable<TicketResponse> {
    return this.http.post<TicketResponse>(`${this.base}/customer/${customerId}`, payload);
  }

  updateTicket(id: number, changes: TicketPayload): Observable<TicketResponse> {
    return this.http.put<TicketResponse>(`${this.base}/${id}`, changes);
  }

  deleteTicket(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
