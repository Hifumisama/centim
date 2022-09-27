import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Category, DebtItem } from 'src/app/interfaces/interfaces';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { DebtService } from 'src/app/services/debt/debt.service';

@Component({
  selector: 'app-financial-form',
  templateUrl: './financial-form.component.html',
  styleUrls: ['./financial-form.component.scss'],
})
export class FinancialFormComponent implements OnInit, OnChanges {
  types!: Category[];

  @Input() feuilleDette!: string;
  @Input() initialData!: DebtItem;

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
    private readonly debtService: DebtService
  ) {}

  async ngOnInit(): Promise<void> {
    this.categoryService.Category$.subscribe((categories) => {
      this.types = categories;
    });
    await this.categoryService.fetchCategory();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialData'].isFirstChange()) {
      this.initialData = changes['initialData'].currentValue;
    }
    this.financialForm.patchValue(this.initialData);
    if (this.initialData.transactionDate) {
      this.financialForm
        .get('transactionDate')
        ?.patchValue(
          this.initialData.transactionDate.toISOString().split('T')[0]
        );
    }
    this.financialForm.updateValueAndValidity();
  }

  async submitForm() {
    if (this.financialForm?.valid) {
      const dette: DebtItem = {
        ...this.initialData,
        ...this.financialForm.value,
        transactionDate:
          new Date(this.financialForm.value.transactionDate) ||
          this.initialData.transactionDate,
        feuillesDettes: this.feuilleDette,
      };
      await this.debtService.upsertDebt(dette);
    }
  }
}
