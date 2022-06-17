import { Component, Input, OnChanges } from '@angular/core';
import { DataSeries } from 'src/app/data/interfaces';

@Component({
  selector: 'app-debt-resume',
  templateUrl: './debt-resume.component.html',
  styleUrls: ['./debt-resume.component.scss'],
})
export class DebtResumeComponent implements OnChanges {
  @Input() data: DataSeries[] = [];
  @Input() debitorSelected: string = '';
  @Input() creditorSelected: string = '';
  debt: number = 0;

  constructor() {}

  ngOnChanges() {
    this.debt = this.calculateDebt(
      this.data,
      this.creditorSelected,
      this.debitorSelected
    );
  }

  calculateDebt(
    data: DataSeries[],
    creditorSelected: string,
    debitorSelected: string
  ) {
    return data.reduce((previousVal, currentVal) => {
      if (currentVal.creditor === creditorSelected) {
        return previousVal + currentVal.amount;
      }

      if (currentVal.creditor === debitorSelected) {
        return previousVal - currentVal.amount;
      }

      return previousVal;
    }, 0);
  }
}
