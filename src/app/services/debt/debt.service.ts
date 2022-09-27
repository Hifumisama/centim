import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DebtItem } from 'src/app/interfaces/interfaces';
import { SupabaseService } from '../supabase.service';

@Injectable({
  providedIn: 'root',
})
export class DebtService {
  private readonly _debtSource = new BehaviorSubject<DebtItem[]>([]);
  readonly DebtItem$ = this._debtSource.asObservable();

  constructor(private readonly supabaseService: SupabaseService) {}

  getDebts(): DebtItem[] {
    return this._debtSource.getValue();
  }

  private _setDebt(DebtItem: DebtItem[]) {
    this._debtSource.next(DebtItem);
  }

  addDebt(DebtItem: DebtItem): void {
    const debts = [...this.getDebts(), DebtItem];
    this._setDebt(debts);
  }

  removeDebt(id: string): void {
    const debts = this.getDebts().filter((DebtItem) => DebtItem.id !== id);
    this._setDebt(debts);
  }

  updateDebt(DebtItem: DebtItem): void {
    const debts = this.getDebts().map((debt) => {
      if (debt.id !== DebtItem.id) {
        return debt;
      }
      return DebtItem;
    });
    this._setDebt(debts);
  }

  async fetchDebts(sheetId: string) {
    let { data: dettes, error } = await this.supabaseService.supabase
      .from('dettes')
      .select()
      .eq('feuillesDettes', sheetId);
    if (dettes && dettes.length > 0) {
      dettes.map((x) => (x.transactionDate = new Date(x.transactionDate)));
    }
    this._setDebt(dettes as DebtItem[]);
  }

  async upsertDebt(dette: DebtItem) {
    let { data: editedDette, error } = await this.supabaseService.supabase
      .from('dettes')
      .upsert(dette);
    if (editedDette) {
      if (!dette.id) {
        this.addDebt(editedDette[0] as DebtItem);
      } else {
        this.updateDebt(editedDette[0] as DebtItem);
      }
    }
  }

  async deleteDebt(id: string) {
    await this.supabaseService.supabase.from('dettes').delete().match({ id });
    this.removeDebt(id);
  }
}
