export interface DataSeries {
  id: string;
  debitor: string;
  creditor: string;
  transactionDate: Date;
  amount: number;
  category: string;
  reason?: string;
}
