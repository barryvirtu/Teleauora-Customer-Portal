import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// -------- Request payload for creating/updating tickets --------
export interface TicketPayload {
  summary: string;
  details: string;
  priority_id?: number;
  tickettype_id?: number;
  team?: string;
  workflow_id?: number;
  workflow_step?: number;
}

// -------- Response from backend/Halo --------
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

  // ✔ Your backend endpoint prefix
  private readonly base = `${environment.dataApiUrl}/tickets`;

  // ----------------------------------------------------------------
  // CREATE — Creates a Halo ticket for a customer
  // POST /api/data/tickets/customer/{customerId}
  // ----------------------------------------------------------------
  createTicketForCustomer(
    customerId: number,
    payload: TicketPayload
  ): Observable<TicketResponse> {
    return this.http.post<TicketResponse>(
      `${this.base}/customer/${customerId}`,
      payload
    );
  }

  // ----------------------------------------------------------------
  // READ ALL — GET all tickets FROM HALO
  // GET /api/data/tickets
  // ----------------------------------------------------------------
  getAllTickets(): Observable<TicketResponse[]> {
    return this.http.get<TicketResponse[]>(`${this.base}`);
  }

  // ----------------------------------------------------------------
  // READ ONE — GET halo ticket by ID
  // GET /api/data/tickets/{ticketId}
  // ----------------------------------------------------------------
  getTicket(ticketId: number): Observable<TicketResponse> {
    return this.http.get<TicketResponse>(`${this.base}/${ticketId}`);
  }

  // ----------------------------------------------------------------
  // UPDATE — Update Halo ticket
  // PUT /api/data/tickets/{ticketId}
  // ----------------------------------------------------------------
  updateTicket(
    ticketId: number,
    changes: TicketPayload
  ): Observable<TicketResponse> {
    return this.http.put<TicketResponse>(
      `${this.base}/${ticketId}`,
      changes
    );
  }

  // ----------------------------------------------------------------
  // DELETE / CLOSE TICKET (depends on Halo tenant permissions)
  // DELETE /api/data/tickets/{ticketId}
  // ----------------------------------------------------------------
  deleteTicket(ticketId: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${ticketId}`);
  }
}

