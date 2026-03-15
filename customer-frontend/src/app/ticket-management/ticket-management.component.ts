import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TicketService, TicketResponse, TicketPayload } from '../services/tickets.service';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ticket-management.component.html',
  styleUrls: ['./ticket-management.component.scss']
})
export class SupportComponent implements OnInit {

  private ticketService = inject(TicketService);

  tickets: TicketResponse[] = [];
  filteredTickets: TicketResponse[] = [];

  filterText = '';
  editingId: number | null = null;
  editBuffer: Partial<TicketResponse> = {};

  ngOnInit(): void {
    this.loadTickets();
  }

  /** Load all tickets for logged‑in customer */
  private loadTickets(): void {
    this.ticketService.getCustomerTickets().subscribe({
      next: data => {
        this.tickets = data;
        this.filteredTickets = data;
      },
      error: err => {
        console.error('Failed to load tickets', err);
        this.tickets = [];
        this.filteredTickets = [];
      }
    });
  }

  /** Filtering */
  applyFilter(): void {
    const text = this.filterText.toLowerCase();
    this.filteredTickets = this.tickets.filter(t =>
      t.customerName?.toLowerCase().includes(text) ||
      t.summary?.toLowerCase().includes(text)
    );
  }

  /** Sorting */
  sortBy(field: keyof TicketResponse): void {
    this.filteredTickets = [...this.filteredTickets].sort((a, b) =>
      (a[field] ?? '').toString().localeCompare((b[field] ?? '').toString())
    );
  }

  /** Editing */
  startEdit(ticket: TicketResponse): void {
    this.editingId = ticket.id;
    this.editBuffer = { ...ticket };
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editBuffer = {};
  }

  saveEdit(ticket: TicketResponse): void {
    const changes: TicketPayload = {
      summary: this.editBuffer.summary ?? ticket.summary,
      details: this.editBuffer.details ?? ticket.details,
      priority_id: this.editBuffer.priority_id ?? ticket.priority_id
    };

    this.ticketService.updateTicket(ticket.id, changes).subscribe({
      next: updated => {
        Object.assign(ticket, updated);
        this.cancelEdit();
      }
    });
  }

  /** Delete */
  deleteTicket(ticket: TicketResponse): void {
    this.ticketService.deleteTicket(ticket.id).subscribe({
      next: () => {
        this.tickets = this.tickets.filter(t => t.id !== ticket.id);
        this.filteredTickets = this.filteredTickets.filter(t => t.id !== ticket.id);
      }
    });
  }

  toggleNewForm(): void {
    // existing logic for showing the new ticket form
  }
}
