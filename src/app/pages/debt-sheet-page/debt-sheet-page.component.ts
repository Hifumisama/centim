import { Component, OnInit } from '@angular/core';
import { DebtList } from 'src/app/interfaces/interfaces';
import { DebtListService } from 'src/app/services/debtList/debt-list.service';

@Component({
  selector: 'app-debt-sheet-page',
  templateUrl: './debt-sheet-page.component.html',
  styleUrls: ['./debt-sheet-page.component.scss'],
})
export class DebtSheetPageComponent implements OnInit {
  debtList: DebtList[] = [];

  constructor(private readonly debtListService: DebtListService) {}

  async ngOnInit(): Promise<void> {
    this.debtListService.debtList$.subscribe((data) => {
      this.debtList = data;
    });
    await this.debtListService.getDebtSheets();
  }
}
