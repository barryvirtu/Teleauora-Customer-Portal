import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UprnDataService } from '../services/uprn.service';
import { UprnRow } from '../models/uprn.model';

@Component({
  selector: 'app-uprn-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './uprn-table.component.html',
  styleUrls: ['./uprn-table.component.scss']
})
export class UprnTableComponent {

  private uprnService = inject(UprnDataService);

  // ---------------------------
  // Signals
  // ---------------------------
  uprns = signal<UprnRow[]>([]);
  editIndex = signal<number | null>(null);
  editRow = signal<UprnRow | null>(null);
  filterText = signal<string>('');

  sortColumn = signal<keyof UprnRow>('uprn');
  sortDirection = signal<'asc' | 'desc'>('asc');

  // ---------------------------
  // Computed sorted/filtered UPRNs
  // ---------------------------
  sortedUprns = computed(() => {
    const column = this.sortColumn();
    const direction = this.sortDirection();
    const data = [...this.uprns()].filter(r =>
      r.address.toLowerCase().includes(this.filterText().toLowerCase())
    );

    return data.sort((a, b) => {
      const aVal = a[column] ?? '';
      const bVal = b[column] ?? '';

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return direction === 'asc' ? aVal - bVal : bVal - aVal;
      }

      return direction === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  });

  constructor() {
    this.loadUprns();
  }

  // ---------------------------
  // Load UPRNs from backend
  // ---------------------------
  loadUprns() {
    this.uprnService.getAll().subscribe({
      next: data => this.uprns.set(data),
      error: err => console.error('Failed to load UPRNs', err)
    });
  }

  // ---------------------------
  // Edit row
  // ---------------------------
  startEdit(row: UprnRow, index: number) {
    this.editIndex.set(index);
    this.editRow.set({ ...row });
  }

  saveEdit() {
    const index = this.editIndex();
    const updated = this.editRow();

    if (index !== null && updated) {
      this.uprnService.update(updated).subscribe({
        next: saved => {
          this.uprns.set([
            ...this.uprns().slice(0, index),
            saved,
            ...this.uprns().slice(index + 1)
          ]);
          this.cancelEdit();
        },
        error: () => alert('Failed to update UPRN')
      });
    }
  }

  cancelEdit() {
    this.editIndex.set(null);
    this.editRow.set(null);
  }

  // ---------------------------
  // Delete row
  // ---------------------------
  delete(row: UprnRow) {
    this.uprnService.delete(row.uprn).subscribe({
      next: () => {
        this.uprns.set(this.uprns().filter(r => r.uprn !== row.uprn));
      },
      error: () => alert('Failed to delete UPRN')
    });
  }

  // ---------------------------
  // Add new row
  // ---------------------------
  startAddNewRow() {
    this.editIndex.set(-1);
    this.editRow.set({
      uprn: 0,
      address: '',
      latitude: 0,
      longitude: 0,
      status: '',   // mandatory field
      project: ''   // mandatory field
    });
  }

  addUprn(newUprn: UprnRow) {
    this.uprnService.add(newUprn).subscribe({
      next: saved => this.uprns.set([...this.uprns(), saved]),
      error: () => alert('Failed to add UPRN')
    });
  }

  // ---------------------------
  // Sorting
  // ---------------------------
  sort(column: keyof UprnRow) {
    if (this.sortColumn() === column) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
    }
  }

  // ---------------------------
  // Filtering
  // ---------------------------
  filter(value: string) {
    this.filterText.set(value);
  }

  clearAll() {
    this.uprns.set([]);
  }
}
