import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DebtItem } from 'src/app/interfaces/interfaces';
import { DebtService } from 'src/app/services/debt/debt.service';
import { Profile } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  constructor(
    private readonly debtService: DebtService,
    private readonly route: ActivatedRoute
  ) {}

  sheetData!: DebtItem[];
  userProfile!: Profile;
  sheetId!: string;

  creditorSelected!: string;
  debitorSelected!: string;

  async ngOnInit(): Promise<void> {
    this.debtService.DebtItem$.subscribe((debts) => {
      this.sheetData = debts;
    });

    this.route.paramMap.subscribe(async (params) => {
      this.sheetId = params.get('id') || '';
      await this.debtService.fetchDebts(this.sheetId);
      this.preselectDefaultCreditorDebitor();
    });
  }

  preselectDefaultCreditorDebitor() {
    this.creditorSelected = this.sheetData[0].creditor || '';
    this.debitorSelected = this.sheetData[0].debitor;
  }
}
