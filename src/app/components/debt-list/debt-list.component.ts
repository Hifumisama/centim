import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DebtList } from 'src/app/interfaces/interfaces';
import { DebtListService } from 'src/app/services/debtList/debt-list.service';
import { LocalService } from 'src/app/services/local/local.service';
@Component({
  selector: 'app-debt-list',
  templateUrl: './debt-list.component.html',
  styleUrls: ['./debt-list.component.scss'],
})
export class DebtListComponent implements OnInit {
  @Input() data: DebtList[] = [];
  debtSheetSelected!: DebtList;

  constructor(
    private readonly router: Router,
    private readonly debtListService: DebtListService,
    private readonly localService: LocalService
  ) {}
  ngOnInit(): void {}

  goToSheet(event: any, id: string) {
    this.router.navigate(['/mainPage', id]);
    this.localService.setSheetSelected(id);
  }

  selectDebtSheet(event: any, debtSheet: DebtList) {
    event.stopPropagation();
    this.debtSheetSelected = debtSheet;
  }

  async deleteDebtSheet(event: any, id: string) {
    event.stopPropagation();
    await this.debtListService.deleteDebtSheets(id);
  }
}
