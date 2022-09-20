import { Component, OnInit } from '@angular/core';
import { DebtListComponent } from 'src/app/components/debt-list/debt-list.component';
import { DebtList } from 'src/app/interfaces/interfaces';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-debt-sheet-page',
  templateUrl: './debt-sheet-page.component.html',
  styleUrls: ['./debt-sheet-page.component.scss'],
})
export class DebtSheetPageComponent implements OnInit {
  debtList: DebtList[] = [];

  constructor(private readonly supabase: SupabaseService) {}

  async ngOnInit(): Promise<void> {
    this.debtList = (await this.supabase.getDebtSheets()) as DebtList[];
  }
}
