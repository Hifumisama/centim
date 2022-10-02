import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DebtItem } from 'src/app/interfaces/interfaces';
import { DebtService } from 'src/app/services/debt/debt.service';
import { LocalService } from 'src/app/services/local/local.service';
import { Profile } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  constructor(
    private readonly debtService: DebtService,
    private readonly localService: LocalService,
    private readonly route: ActivatedRoute
  ) {}

  sheetData: DebtItem[] = [];
  userProfile!: Profile;
  sheetId!: string;

  async ngOnInit(): Promise<void> {
    this.debtService.DebtItem$.subscribe((debts) => {
      this.sheetData = debts;
    });

    this.route.paramMap.subscribe(async (params) => {
      this.sheetId = params.get('id') || '';
      this.localService.setSheetSelected(this.sheetId);
      await this.debtService.fetchDebts(this.sheetId);
    });
  }
}
