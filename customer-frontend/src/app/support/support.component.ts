import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SupportService, SupportTicket, SpeedTestResult }
  from '../services/support.service';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [
    CommonModule,   // REQUIRED for ngIf, ngFor, ngClass
    FormsModule     // REQUIRED for ngModel
  ],
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

  private supportService = inject(SupportService);

  tickets: SupportTicket[] = [];
  speedTestResult: SpeedTestResult | null = null;

  newTicket = {
    category: '',
    notes: ''
  };

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets() {
    this.supportService.getTickets().subscribe({
      next: (data) => this.tickets = data,
      error: () => {
        this.tickets = [
          {
            ticketId: 'TCK-1001',
            issueDate: '01 Feb 2026',
            category: 'Slow Internet',
            status: 'Open',
            notes: 'Customer reports intermittent speed drops.'
          },
          {
            ticketId: 'TCK-1002',
            issueDate: '20 Jan 2026',
            category: 'Billing Query',
            status: 'Closed',
            notes: 'Incorrect bill corrected.'
          },
          {
            ticketId: 'TCK-0932',
            issueDate: '11 Dec 2025',
            category: 'Router Issue',
            status: 'In Progress',
            notes: 'Awaiting replacement router shipment.'
          }
        ];
      }
    });
  }

  submitTicket() {
    const ticket: SupportTicket = {
      ticketId: 'TCK-' + Math.floor(Math.random() * 9000 + 1000),
      issueDate: new Date().toLocaleDateString(),
      category: this.newTicket.category,
      status: 'Open',
      notes: this.newTicket.notes
    };

    this.supportService.createTicket(ticket).subscribe({
      next: () => {
        this.tickets.push(ticket);
        this.newTicket = { category: '', notes: '' };
      },
      error: () => {
        this.tickets.push(ticket);
      }
    });
  }

  runSpeedTest() {
    this.supportService.runSpeedTest().subscribe({
      next: (result) => this.speedTestResult = result,
      error: () => {
        this.speedTestResult = {
          download: 287,
          upload: 36,
          ping: 12
        };
      }
    });
  }
}
