import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataSeries } from 'src/app/data/interfaces';
import { categories } from 'src/app/data/mockData';
import * as uuid from 'uuid';

@Component({
  selector: 'app-financial-form',
  templateUrl: './financial-form.component.html',
  styleUrls: ['./financial-form.component.scss'],
})
export class FinancialFormComponent implements OnInit {
  @Input() data: DataSeries[] = [];

  @Output() addNewEntry = new EventEmitter();

  get dropDownCategories() {
    return categories.map((x) => x.name);
  }

  financialForm = new FormGroup({
    transactionDate: new FormControl(''),
    debitor: new FormControl(''),
    creditor: new FormControl(''),
    amount: new FormControl(''),
    category: new FormControl(''),
    reason: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {}

  submitForm() {
    if (this.financialForm.valid) {
      console.log(this.financialForm.value);
      const result: DataSeries = {
        id: uuid.v4(),
        ...this.financialForm.value,
      };
      this.addNewEntry.emit(result);
    }
  }
}
