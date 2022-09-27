import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { DebtList } from 'src/app/interfaces/interfaces';
import { SupabaseService } from '../supabase.service';

@Injectable({
  providedIn: 'root',
})
export class DebtListService {
  private readonly _debtListSource = new BehaviorSubject<DebtList[]>([]);
  readonly debtList$ = this._debtListSource.asObservable();

  constructor(private readonly supabaseService: SupabaseService) {}

  getDebtList(): DebtList[] {
    return this._debtListSource.getValue();
  }

  private _setDebtList(debtList: DebtList[]) {
    this._debtListSource.next(debtList);
  }

  addDebtList(debtList: DebtList): void {
    const debts = [...this.getDebtList(), debtList];
    this._setDebtList(debts);
  }

  removeDebtList(id: string): void {
    const debts = this.getDebtList().filter((debtList) => debtList.id !== id);
    this._setDebtList(debts);
  }

  updateDebtList(debtList: DebtList): void {
    const debts = this.getDebtList().map((debt) => {
      if (debt.id !== debtList.id) {
        return debt;
      }
      return debtList;
    });
    this._setDebtList(debts);
  }

  async getDebtSheets() {
    let { data: feuillesDettes, error } = await this.supabaseService.supabase
      .from('feuillesDettes')
      .select();
    this._setDebtList(feuillesDettes as DebtList[]);
  }

  async createDebtSheets(feuilleDette: DebtList) {
    await this.supabaseService.supabase
      .from('feuillesDettes')
      .upsert(feuilleDette);
    this.addDebtList(feuilleDette);
  }

  async upsertDebtSheets(feuilleDette: DebtList) {
    let { data: editedFeuilleDette, error } =
      await this.supabaseService.supabase
        .from('feuillesDettes')
        .upsert(feuilleDette);
    if (editedFeuilleDette) {
      if (!feuilleDette.id) {
        this.addDebtList(editedFeuilleDette[0] as DebtList);
      } else {
        this.updateDebtList(editedFeuilleDette[0] as DebtList);
      }
    }
  }

  async deleteDebtSheets(id: string) {
    await this.supabaseService.supabase
      .from('dettes')
      .delete()
      .match({ feuillesDettes: id });
    await this.supabaseService.supabase
      .from('feuillesDettes')
      .delete()
      .match({ id });
    this.removeDebtList(id);
  }
}
