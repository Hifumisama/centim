import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DebtItem } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-financial-chart',
  templateUrl: './financial-chart.component.html',
  styleUrls: ['./financial-chart.component.scss'],
})
export class FinancialChartComponent implements OnInit, OnChanges {
  @Input() data!: DebtItem[];
  @Input() debitorSelected!: string;
  @Input() creditorSelected?: string;
  chartData!: any;

  constructor() {}

  ngOnInit(): void {
    if (this.data && this.data.length > 0 && this.debitorSelected) {
      this.chartData = this.createChart();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['data'].isFirstChange()) {
      if (this.data && this.data.length > 0 && this.debitorSelected) {
        this.chartData = this.createChart();
      }
    }
  }

  generateLabels(): string[] {
    return this.data.map(
      (x) =>
        `${x.transactionDate.getDate()}/${x.transactionDate.getMonth() + 1}`
    );
  }

  generateValues(user: string): any[] {
    return this.data.reduce((prevValue: number[], currentValue, index) => {
      const oldValue = prevValue[index - 1] || prevValue[index] || 0;
      const result =
        currentValue.debitor === user
          ? currentValue.amount + (prevValue[index - 1] || 0)
          : oldValue;
      prevValue.push(result);
      return prevValue;
    }, []);
  }

  generateDataSets(): any[] {
    const debitor = {
      label: `Dépenses de ${this.debitorSelected}`,
      tension: 0,
      pointRadius: 5,
      pointBackgroundColor: 'rgba(255, 255, 255, .8)',
      pointBorderColor: 'transparent',
      borderColor: 'rgba(255, 255, 255, .8)',
      borderWidth: 4,
      backgroundColor: 'transparent',
      fill: true,
      data: this.generateValues(this.debitorSelected),
    };

    if (this.creditorSelected) {
      const creditor = {
        label: `Dépenses de ${this.creditorSelected}`,
        tension: 0,
        pointRadius: 5,
        pointBackgroundColor: 'rgba(255, 255, 255, .8)',
        pointBorderColor: 'transparent',
        borderColor: 'rgba(255, 255, 255, .8)',
        borderWidth: 4,
        backgroundColor: 'transparent',
        fill: true,
        data: this.generateValues(this.creditorSelected),
      };
      return [debitor, creditor];
    }

    return [debitor];
  }

  createChart() {
    return {
      type: 'line',
      data: {
        labels: this.generateLabels(),
        datasets: this.generateDataSets(),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
        scales: {
          y: {
            grid: {
              drawBorder: false,
              display: true,
              drawOnChartArea: true,
              drawTicks: false,
              borderDash: [5, 5],
              color: 'rgba(255, 255, 255, .2)',
            },
            ticks: {
              display: true,
              color: '#f8f9fa',
              padding: 10,
              font: {
                size: 14,
                weight: '300',
                family: 'Roboto',
                style: 'normal',
                lineHeight: 2,
              },
            },
          },
          x: {
            grid: {
              drawBorder: false,
              display: false,
              drawOnChartArea: false,
              drawTicks: false,
              borderDash: [5, 5],
            },
            ticks: {
              display: true,
              color: '#f8f9fa',
              padding: 10,
              font: {
                size: 14,
                weight: '300',
                family: 'Roboto',
                style: 'normal',
                lineHeight: 2,
              },
            },
          },
        },
      },
    };
  }
}
