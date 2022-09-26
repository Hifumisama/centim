import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DebtList } from 'src/app/interfaces/interfaces';
import { DebtListService } from 'src/app/services/debtList/debt-list.service';
import { SupabaseService } from 'src/app/services/supabase.service';
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
    private readonly debtListService: DebtListService
  ) {}
  ngOnInit(): void {}

  goToSheet(event: any, id: string) {
    this.router.navigate(['/mainPage', id]);
  }

  selectDebtSheet(event: any, debtSheet: DebtList) {
    event.stopPropagation();
    this.debtSheetSelected = debtSheet;
  }

  async deleteDebtSheet(event: any, id: string) {
    event.stopPropagation();
    await this.debtListService.deleteDebtSheets(id).then(() => {
      const index = this.data.findIndex((x) => x.id === id);
      console.log('data supprimée :3');
    });
  }
}
