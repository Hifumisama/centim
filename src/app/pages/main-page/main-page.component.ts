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
  debitor!: string;
  creditor!: string;

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async (params) => {
      this.sheetId = params.get('id') || '';
      this.localService.setSheetSelected(this.sheetId);
      await this.debtService.fetchDebts();
      await this.categoriesService.fetchCategory();
      this.categories$ = this.categoriesService.Category$.subscribe(
        (categories) => {
          this.categories = categories;
        }
      );
      this.debtItem$ = this.debtService.DebtItem$.subscribe((debts) => {
        this.debts = debts;
        if (this.debts && this.debts.length > 0) {
          const debitor = this.debts[0].debitor;
          this.users = [debitor];
          this.debitor = debitor;
          if (this.debts[0].creditor) {
            const creditor = this.debts[0].creditor;
            this.users.push(creditor);
            this.creditor = creditor;
          }
        }
      });
    });
  }

  ngOnDestroy() {
    this.debtItem$.unsubscribe();
    this.categories$.unsubscribe();
  }
}
