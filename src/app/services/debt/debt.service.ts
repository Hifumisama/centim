import { Injectable } from '@angular/core';
import { BehaviorSubject, last } from 'rxjs';
import { DebtItem, LastExpanse } from 'src/app/interfaces/interfaces';
import { LocalService } from '../local/local.service';
import { SupabaseService } from '../supabase.service';

@Injectable({
  providedIn: 'root',
})
export class DebtService {
  private readonly _debtSource = new BehaviorSubject<DebtItem[]>([]);
  private readonly _lastExpanse = new BehaviorSubject<DebtItem[]>([]);
  // Rajouter un type spécifique ici :)
  private readonly _ActualDebt = new BehaviorSubject<number>(0);
  readonly DebtItem$ = this._debtSource.asObservable();
  readonly LastExpanseItem$ = this._lastExpanse.asObservable();
  readonly ActualDebt$ = this._ActualDebt.asObservable();

  sheetId!: string;

  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly localService: LocalService
  ) {
    this.localService.sheetSelected$.subscribe((sheetId) => {
      this.sheetId = sheetId;
    });
  }

  getDebts(): DebtItem[] {
    return this._debtSource.getValue();
  }

  private _setDebt(DebtItem: DebtItem[]) {
    this._debtSource.next(DebtItem);
  }

  getLastExpanse(): DebtItem[] {
    return this._lastExpanse.getValue();
  }

  private _setLastExpanse(lastExpanse: DebtItem[]) {
    return this._lastExpanse.next(lastExpanse);
  }

  getActualDebt(): number {
    return this._ActualDebt.getValue();
  }

  private _setActualDebt(actualDebt: number): void {
    return this._ActualDebt.next(actualDebt);
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

  async fetchDebts() {
    let { data: dettes, error } = await this.supabaseService.supabase
      .from('dettes')
      .select()
      .eq('feuillesDettes', this.sheetId)
      .order('transactionDate');
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
        this.addDebt(dette as DebtItem);
      } else {
        this.updateDebt(dette as DebtItem);
      }
    }
  }

  async deleteDebt(id: string) {
    await this.supabaseService.supabase.from('dettes').delete().match({ id });
    this.removeDebt(id);
  }

  async fetchLastExpanses(users: string[]) {
    let lastExpanse: DebtItem[] = [];
    let { data: debtSorted, error } = await this.supabaseService.supabase
      .from('dettes')
      .select()
      .eq('feuillesDettes', this.sheetId)
      .order('transactionDate', { ascending: false });
    if (debtSorted) {
      lastExpanse = users
        .map((user) => {
          return debtSorted?.find((debt) => debt.debitor === user);
        })
        .filter((expanse) => expanse !== undefined);
    }
    this._setLastExpanse(lastExpanse);
  }

  async calculateActualDebt(users: string[]) {
    let { data: debtSorted, error } = await this.supabaseService.supabase
      .from('dettes')
      .select()
      .eq('feuillesDettes', this.sheetId)
      .order('transactionDate');

    const actualDebt = debtSorted?.reduce(
      (previousVal: number, currentVal: DebtItem) => {
        if (currentVal.creditor === users[0]) {
          return previousVal + currentVal.amount;
        }

        if (currentVal.creditor === users[1]) {
          return previousVal - currentVal.amount;
        }
        return previousVal;
      },
      0
    );
    this._setActualDebt(actualDebt);
  }
}
