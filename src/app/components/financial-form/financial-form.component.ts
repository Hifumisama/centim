import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataSeries } from 'src/app/data/interfaces';
import { categories } from 'src/app/data/mockData';
import * as uuid from 'uuid';

@Component({
  selector: 'app-financial-form',
  templateUrl: './financial-form.component.html',
  styleUrls: ['./financial-form.component.scss'],
})
export class FinancialFormComponent implements OnInit {
  @Output() addNewEntry = new EventEmitter();

  get dropDownCategories() {
    return categories.map((x) => x.name);
  }

  financialForm: FormGroup = new FormGroup({
    transactionDate: new FormControl(''),
    debitor: new FormControl(''),
    creditor: new FormControl(''),
    amount: new FormControl(''),
    category: new FormControl(''),
    reason: new FormControl(''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { item: DataSeries },
    public dialogRef: MatDialogRef<FinancialFormComponent>
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    if (this.data.item) {
      const { transactionDate, debitor, creditor, amount, category, reason } =
        this.data.item;
      this.financialForm.setValue({
        transactionDate,
        debitor,
        creditor,
        amount,
        category,
        reason,
      });
    }
  }

  submitForm() {
    if (this.financialForm?.valid) {
      const result: DataSeries = {
        id: uuid.v4(),
        ...this.financialForm.value,
      };
      this.addNewEntry.emit(result);
      this.dialogRef.close();
    }
  }
}
