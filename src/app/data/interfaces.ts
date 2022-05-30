export interface DataSeries {
  id: string;
  username: string;
  transactionDate: Date;
  amount: number;
  category: string;
  reason?: string;
}
