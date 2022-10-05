import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category, DebtItem } from 'src/app/interfaces/interfaces';
import { CategoriesService } from 'src/app/services/categories/categories.service';
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
    private readonly categoriesService: CategoriesService,
    private readonly localService: LocalService,
    private readonly route: ActivatedRoute
  ) {}

  sheetData!: DebtItem[];
  userProfile!: Profile;
  sheetId!: string;

  debtItem$!: Subscription;
  debts!: DebtItem[];

  categories$!: Subscription;
  categories!: Category[];

  users!: string[];

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async (params) => {
      this.sheetId = params.get('id') || '';
      this.localService.setSheetSelected(this.sheetId);
      await this.debtService.fetchDebts(this.sheetId);
      await this.categoriesService.fetchCategory();
      this.categories$ = this.categoriesService.Category$.subscribe(
        (categories) => {
          this.categories = categories;
        }
      );
      this.debtItem$ = this.debtService.DebtItem$.subscribe((debts) => {
        this.debts = debts;
      });

      this.users = [this.debts[0].debitor];
      if (this.debts[0].creditor) {
        this.users.push(this.debts[0].creditor);
      }
    });
  }

  ngOnDestroy() {
    this.debtItem$.unsubscribe();
  }
}
