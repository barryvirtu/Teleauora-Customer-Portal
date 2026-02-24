import { Injectable, inject, InjectionToken } from '@angular/core'; // ✅ Must import Injectable
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lead } from '../models/lead.model'; // optional, if you created a Lead interface

export const DATA_API_BASE = new InjectionToken<string>('DATA_API_BASE');

@Injectable({ providedIn: 'root' }) // ✅ This decorator needs to be imported
export class CustomerFunnelService {
  private http = inject(HttpClient);
  private apiBase = inject(DATA_API_BASE);

  private get baseUrl(): string {
    return `${this.apiBase}/opportunities`;
  }

  getAllUprns(): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}/uprns`);
  }

  updateLead(lead: Lead): void {
    console.log('[CustomerFunnelService] Lead updated:', lead);
  }
}
