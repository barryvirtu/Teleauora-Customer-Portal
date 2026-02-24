export interface UprnRow {
  uprn: number;
  address: string;
  latitude?: number;
  longitude?: number;
  status: string;   // e.g., 'Pending', 'Completed'
  project: string;  // e.g., 'Project A'
}
