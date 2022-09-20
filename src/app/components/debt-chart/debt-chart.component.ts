import { Component, Input, OnInit } from '@angular/core';
import { DebtItem } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-debt-chart',
  templateUrl: './debt-chart.component.html',
  styleUrls: ['./debt-chart.component.scss'],
})
export class DebtChartComponent implements OnInit {
  @Input() data: DebtItem[] = [];
  @Input() debitorSelected = '';
  @Input() creditorSelected = '';
  basicData = {};

  constructor() {}

  ngOnInit(): void {
    console.log(this.data);
  }

  ngOnChanges(): void {
    this.basicData = {
      labels: this.generateLabels(),
      datasets: [
        {
          label: 'Courbe de dette',
          data: this.generateValues(),
          fill: true,
          borderColor: '#42A5F5',
          tension: 0.4,
        },
      ],
    };
  }

  generateLabels(): string[] {
    console.log(this.data);
    return this.data
      .sort((a, b) => a.transactionDate.getDate() - b.transactionDate.getDate())
      .map((x) => x.transactionDate.toDateString());
  }

  generateValues(): number[] {
    return this.data
      .sort((a, b) => a.transactionDate.getDate() - b.transactionDate.getDate())
      .reduce((previousVal: number[], currentVal: DebtItem, index) => {
        const value = previousVal[index - 1] || 0;

        if (currentVal.creditor === this.creditorSelected) {
          previousVal.push(value + currentVal.amount);
          return previousVal;
        }

        if (currentVal.creditor === this.debitorSelected) {
          previousVal.push(value - currentVal.amount);
          return previousVal;
        }
        return previousVal;
      }, []);
  }
}
