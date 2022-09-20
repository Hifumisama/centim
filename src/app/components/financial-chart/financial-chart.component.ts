import { Component, Input, OnInit } from '@angular/core';
import { DataSeries } from 'src/app/data/interfaces';
import { DebtItem } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-financial-chart',
  templateUrl: './financial-chart.component.html',
  styleUrls: ['./financial-chart.component.scss'],
})
export class FinancialChartComponent implements OnInit {
  @Input() data: DebtItem[] = [];
  @Input() debitorSelected = '';
  @Input() creditorSelected = '';
  basicData = {};

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.basicData = {
      labels: this.generateLabels(),
      datasets: [
        {
          label: `Dépenses de ${this.creditorSelected}`,
          data: this.generateValues(this.creditorSelected),
          borderColor: '#42A5F5',
          tension: 0.4,
        },
        {
          label: `Dépenses de ${this.debitorSelected}`,
          data: this.generateValues(this.debitorSelected),
          borderColor: '#42FEF5',
          tension: 0.4,
        },
      ],
    };
  }

  generateLabels(): string[] {
    return this.data
      .sort((a, b) => a.transactionDate.getDate() - b.transactionDate.getDate())
      .map((x) => x.transactionDate.toDateString());
  }

  generateValues(user: string): any[] {
    const userValues = this.data.sort(
      (a, b) => a.transactionDate.getDate() - b.transactionDate.getDate()
    );
    return userValues.reduce(
      (prevValue: { x: string; y: number | null }[], currentValue, index) => {
        const oldValue = prevValue[index - 1]?.y || prevValue[index]?.y || 0;
        const result = {
          x: currentValue.transactionDate.toDateString(),
          y:
            currentValue.creditor === user
              ? currentValue.amount + (prevValue[index - 1]?.y || 0)
              : oldValue,
        };
        prevValue.push(result);
        return prevValue;
      },
      []
    );
  }
}
