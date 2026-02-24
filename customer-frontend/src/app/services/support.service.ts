import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface SupportTicket {
  ticketId: string;
  issueDate: string;
  category: string;
  status: string;
  notes: string;
}

export interface SpeedTestResult {
  download: number;
  upload: number;
  ping: number;
}

@Injectable({ providedIn: 'root' })
export class SupportService {
  private http = inject(HttpClient);

  getTickets(): Observable<SupportTicket[]> {
    return this.http.get<SupportTicket[]>(`${environment.dataApiUrl}/tickets`);
  }

  createTicket(ticket: SupportTicket): Observable<SupportTicket> {
    return this.http.post<SupportTicket>(`${environment.dataApiUrl}/tickets`, ticket);
  }

  runSpeedTest(): Observable<SpeedTestResult> {
    return this.http.get<SpeedTestResult>(`${environment.dataApiUrl}/speed-test`);
  }
}
