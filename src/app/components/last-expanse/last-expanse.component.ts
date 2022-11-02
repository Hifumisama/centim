import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DebtItem } from 'src/app/interfaces/interfaces';
import { DebtService } from 'src/app/services/debt/debt.service';

@Component({
  selector: 'app-last-expanse',
  templateUrl: './last-expanse.component.html',
  styleUrls: ['./last-expanse.component.scss'],
})
export class LastExpanseComponent implements OnInit, OnDestroy {
  @Input() users!: string[];
  lastExpanse$!: Subscription;
  lastExpanses!: DebtItem[];

  actualDebt$!: Subscription;
  actualDebt!: number;

  debts$!: Subscription;

  actualDebtAbsolute!: number;

  constructor(private readonly debtService: DebtService) {}

  async ngOnInit(): Promise<void> {
    this.lastExpanse$ = this.debtService.LastExpanseItem$.subscribe(
      (lastExpanses) => (this.lastExpanses = lastExpanses)
    );
    this.actualDebt$ = this.debtService.ActualDebt$.subscribe(
      (calculatedDebt) => {
        this.actualDebt = calculatedDebt;
        this.actualDebtAbsolute = Math.abs(calculatedDebt);
      }
    );

    this.debts$ = this.debtService.DebtItem$.subscribe(async (_) => {
      await this.debtService.fetchLastExpanses(this.users);
      await this.debtService.calculateActualDebt(this.users);
    });
  }
  ngOnDestroy(): void {
    this.lastExpanse$.unsubscribe();
    this.actualDebt$.unsubscribe();
    this.debts$.unsubscribe();
  }
}
