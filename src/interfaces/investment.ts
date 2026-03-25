export interface Investment {
  id: string;
  name: string;
  description: string;
  amount: string;
  date: Date;
}

export interface InvestmentResponse extends Omit<Investment, "amount"> {
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  vehicleId: string;
}
