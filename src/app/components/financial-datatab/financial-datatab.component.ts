import { Component, Input, OnInit } from '@angular/core';
import { DebtItem } from 'src/app/interfaces/interfaces';
import { DebtService } from 'src/app/services/debt/debt.service';
@Component({
  selector: 'app-financial-datatab',
  templateUrl: './financial-datatab.component.html',
  styleUrls: ['./financial-datatab.component.scss'],
})
export class FinancialDatatabComponent implements OnInit {
  debtData!: DebtItem[];
  debtSelected!: DebtItem;

  constructor(private readonly debtService: DebtService) {}

  ngOnInit(): void {
    this.debtService.DebtItem$.subscribe((debts) => {
      this.debtData = debts;
    });
  }

  selectDebt(debtItem: DebtItem) {
    this.debtSelected = debtItem;
  }

  async deleteDebt(id: string) {
    await this.debtService.deleteDebt(id);
  }
}
