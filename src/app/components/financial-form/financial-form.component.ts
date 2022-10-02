import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Category, DebtItem, DebtList } from 'src/app/interfaces/interfaces';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { DebtService } from 'src/app/services/debt/debt.service';
import { LocalService } from 'src/app/services/local/local.service';

@Component({
  selector: 'app-financial-form',
  templateUrl: './financial-form.component.html',
  styleUrls: ['./financial-form.component.scss'],
})
export class FinancialFormComponent implements OnInit, OnChanges {
  types!: Category[];

  @Input() initialData?: DebtItem;

  categories$!: Subscription;
  sheetSelected$!: Subscription;

  sheetSelectedId!: string;

  financialForm: FormGroup = new FormGroup({
    transactionDate: new FormControl(''),
    debitor: new FormControl(''),
    creditor: new FormControl(''),
    amount: new FormControl(''),
    type: new FormControl(''),
    reason: new FormControl(''),
  });

  constructor(
    private readonly categoryService: CategoriesService,
    private readonly debtService: DebtService,
    private readonly localService: LocalService
  ) {}

  async ngOnInit(): Promise<void> {
    this.categories$ = this.categoryService.Category$.subscribe(
      (categories) => {
        this.types = categories;
      }
    );
    this.sheetSelected$ = this.localService.sheetSelected$.subscribe(
      (sheetSelected) => {
        this.sheetSelectedId = sheetSelected;
      }
    );
    await this.categoryService.fetchCategory();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.initialData = changes['initialData'].currentValue;

    if (this.initialData) {
      this.financialForm.patchValue(this.initialData);
      if (this.initialData.transactionDate) {
        this.financialForm
          .get('transactionDate')
          ?.patchValue(this.getStringDate(this.initialData.transactionDate));
      }
      this.financialForm.updateValueAndValidity();
    } else {
      this.financialForm.reset();
    }
  }

  getStringDate(date: Date) {
    const dayOftheMonth =
      date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
    return `${date.getFullYear()}-${date.getMonth() + 1}-${dayOftheMonth}`;
  }

  async submitForm() {
    if (this.financialForm?.valid) {
      const dette: DebtItem = {
        ...this.initialData,
        ...this.financialForm.value,
        transactionDate:
          new Date(this.financialForm.value.transactionDate) ||
          this.initialData?.transactionDate,
        feuillesDettes: this.sheetSelectedId,
      };
      console.log(dette);
      await this.debtService.upsertDebt(dette);
      this.financialForm.reset();
    }
  }

  ngOnDestroy() {
    this.categories$.unsubscribe();
    this.sheetSelected$.unsubscribe();
  }
}
