// src/app/services/uprn-data.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { DATA_API_BASE } from './api-tokens';
import { UprnRow } from '../models/uprn.model';
import { UprnMasterRow } from '../models/uprn-master.model';

@Injectable({ providedIn: 'root' })
export class UprnDataService {
  private http = inject(HttpClient);

  /**
   * IMPORTANT:
   * DATA_API_BASE should point to your controller base.
   * With @RequestMapping("/api/data"), set:
   *   provide: DATA_API_BASE, useValue: 'http://localhost:8080/api/data'
   */
  private apiBase = inject(DATA_API_BASE);

  private readonly TOKEN_KEY = 'jwtToken';

  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.TOKEN_KEY) || '';
    return new HttpHeaders(token ? { Authorization: `Bearer ${token}` } : {});
  }

  // ----------------------------------------------------
  // PROJECT-BOUND UPRN CRUD (keep if you already expose /uprns for admin use)
  // ----------------------------------------------------

  getAll(): Observable<UprnRow[]> {
    const url = `${this.apiBase}/uprns`;
    return this.http.get<UprnRow[]>(url, { headers: this.authHeaders() }).pipe(
      catchError(err => {
        console.error('[UprnDataService] Failed to fetch UPRNs (project CRUD):', err);
        return of<UprnRow[]>([]);
      })
    );
  }

  add(uprn: UprnRow): Observable<UprnRow> {
    const url = `${this.apiBase}/uprns`;
    return this.http.post<UprnRow>(url, uprn, { headers: this.authHeaders() }).pipe(
      catchError(err => {
        console.error('[UprnDataService] Failed to add UPRN:', err);
        throw err;
      })
    );
  }

  update(uprn: UprnRow): Observable<UprnRow> {
    const url = `${this.apiBase}/uprns/${uprn.uprn}`;
    return this.http.put<UprnRow>(url, uprn, { headers: this.authHeaders() }).pipe(
      catchError(err => {
        console.error('[UprnDataService] Failed to update UPRN:', err);
        throw err;
      })
    );
  }

  delete(uprnId: number): Observable<void> {
    const url = `${this.apiBase}/uprns/${uprnId}`;
    return this.http.delete<void>(url, { headers: this.authHeaders() }).pipe(
      catchError(err => {
        console.error('[UprnDataService] Failed to delete UPRN:', err);
        throw err;
      })
    );
  }

  // ----------------------------------------------------
  // MASTER READ ENDPOINTS (mirror UprnMaster entity)
  // Controller: /api/data/alluprns and /api/data/alluprns/coords
  // ----------------------------------------------------

  /**
   * Fetch ALL master UPRNs (full entity): {uprn,address,latitude,longitude,source}
   * Beware of payload size; consider getAllMasterWithCoords() for the map.
   */
  getAllMaster(): Observable<UprnMasterRow[]> {
    const url = `${this.apiBase}/alluprns`;
    return this.http.get<UprnMasterRow[]>(url, { headers: this.authHeaders() }).pipe(
      catchError(err => {
        console.error('[UprnDataService] Failed to fetch ALL master UPRNs:', err);
        return of<UprnMasterRow[]>([]);
      })
    );
  }

  /**
   * Map-friendly: only rows with both latitude & longitude.
   */
  getAllMasterWithCoords(): Observable<UprnMasterRow[]> {
    const url = `${this.apiBase}/alluprns/coords`;
    return this.http.get<UprnMasterRow[]>(url, { headers: this.authHeaders() }).pipe(
      catchError(err => {
        console.error('[UprnDataService] Failed to fetch master UPRNs (coords):', err);
        return of<UprnMasterRow[]>([]);
      })
    );
  }

  /**
   * If you add a BBOX endpoint:
   * GET /api/data/uprns/bbox?minLon=&minLat=&maxLon=&maxLat=
   */
  getMasterByBbox(minLon: number, minLat: number, maxLon: number, maxLat: number): Observable<UprnMasterRow[]> {
    const url = `${this.apiBase}/uprns/bbox`;
    const params = new HttpParams()
      .set('minLon', String(minLon))
      .set('minLat', String(minLat))
      .set('maxLon', String(maxLon))
      .set('maxLat', String(maxLat));

    return this.http.get<UprnMasterRow[]>(url, { headers: this.authHeaders(), params }).pipe(
      catchError(err => {
        console.error('[UprnDataService] Failed to fetch bbox UPRNs:', err);
        return of<UprnMasterRow[]>([]);
      })
    );
  }
}
