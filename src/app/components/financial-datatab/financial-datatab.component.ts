import { Component, Input, OnInit } from '@angular/core';
import { DebtItem } from 'src/app/interfaces/interfaces';
import { DebtService } from 'src/app/services/debt/debt.service';
@Component({
  selector: 'app-financial-datatab',
  templateUrl: './financial-datatab.component.html',
  styleUrls: ['./financial-datatab.component.scss'],
})
export class FinancialDatatabComponent implements OnInit {
  @Input() debtData!: DebtItem[];
  debtSelected?: DebtItem;

  constructor(private readonly debtService: DebtService) {}

  ngOnInit(): void {}

  selectDebt(debtItem: DebtItem) {
    this.debtSelected = debtItem;
  }

  async addDebt() {
    this.debtSelected = undefined;
  }

  async deleteDebt(id: string) {
    await this.debtService.deleteDebt(id);
  }
}
