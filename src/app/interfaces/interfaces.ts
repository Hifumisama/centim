export interface DebtList {
  id: string;
  name: string;
  description?: string;
  createdBy: string;
  createdAt: Date;
}

export interface DebtItem {
  id: string;
  debitor: string;
  creditor?: string;
  transactionDate: Date;
  amount: number;
  type: string;
  reason?: string;
  feuillesDettes: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  created_at?: Date;
  backgroundColor?: string;
}
