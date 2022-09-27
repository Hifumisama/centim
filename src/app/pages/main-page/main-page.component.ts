import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataSeries } from 'src/app/data/interfaces';
import { DebtItem } from 'src/app/interfaces/interfaces';
import { DebtService } from 'src/app/services/debt/debt.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { Profile, SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  constructor(
    private readonly profileService: ProfileService,
    private readonly debtService: DebtService,
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
      await this.debtService.fetchDebts(this.sheetId);
    });

    this.userProfile = this.profileService.getProfile();
  }
}
