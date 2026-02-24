
export interface UprnRow {
  uprn: number;
  address: string;
  status: 'Pending' | 'In Progress' | 'Complete';
  project: string;
}

export interface Customer {
  id?: number;
  name: string;
  address: string;
  startDate?: Date | string;
  endDate?: Date | string;
  devices: number;
}



export interface Asset {
  id: string;
  type: string;
  condition: string;
}

