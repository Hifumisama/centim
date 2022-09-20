export interface DebtList {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  createdAt: Date;
}

export interface DebtItem {
  id: string;
  debitor: string;
  creditor?: string;
  transactionDate: Date;
  amount: number;
  category: string;
  reason?: string;
}
