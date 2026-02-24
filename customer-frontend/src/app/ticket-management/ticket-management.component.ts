import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// FRONTEND → BACKEND (customer-aware create)
export interface TicketPayload {
  summary: string;
  details: string;
  priority_id?: number;
  tickettype_id?: number;
  team?: string;
  workflow_id?: number;
  workflow_step?: number;
}

// BACKEND → FRONTEND (Halo response)
export interface TicketResponse {
  id: number;
  ref: string;
  summary: string;
  details?: string;
  priority_id?: number;
  status?: string;
}

@Injectable({ providedIn: 'root' })
export class TicketService {
  private readonly http = inject(HttpClient);

  // Matches backend TicketsCrudController + TicketsCustomerController
  private readonly base = `${environment.dataApiUrl}/tickets`;

  // CREATE for customer
  createTicketForCustomer(
    customerId: number,
    payload: TicketPayload
  ): Observable<TicketResponse> {
    return this.http.post<TicketResponse>(
      `${this.base}/customer/${customerId}`,
      payload
    );
  }

  // READ ALL
  getAllTickets(): Observable<TicketResponse[]> {
    return this.http.get<TicketResponse[]>(`${this.base}`);
  }

  // READ ONE
  getTicket(id: number): Observable<TicketResponse> {
    return this.http.get<TicketResponse>(`${this.base}/${id}`);
  }

  // UPDATE
  updateTicket(
    id: number,
    changes: TicketPayload
  ): Observable<TicketResponse> {
    return this.http.put<TicketResponse>(
      `${this.base}/${id}`,
      changes
    );
  }

  // DELETE / CLOSE
  deleteTicket(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
