import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { DataSeries } from 'src/app/data/interfaces';
import { categories } from 'src/app/data/mockData';
import { DebtItem } from 'src/app/interfaces/interfaces';
import { DebtService } from 'src/app/services/debt/debt.service';
import { FinancialFormComponent } from '../financial-form/financial-form.component';

@Component({
  selector: 'app-financial-datatab',
  templateUrl: './financial-datatab.component.html',
  styleUrls: ['./financial-datatab.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*', minHeight: '50px' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class FinancialDatatabComponent implements OnInit {
  @Input() debtData!: DebtItem[];
  debtSelected!: DebtItem;

  constructor(private readonly debtService: DebtService) {}

  ngOnInit(): void {
    console.log(this.debtData);
  }

  selectDebt(debtItem: DebtItem) {
    this.debtSelected = debtItem;
  }

  async deleteDebt(id: string) {
    await this.debtService.deleteDebt(id);
  }
}
