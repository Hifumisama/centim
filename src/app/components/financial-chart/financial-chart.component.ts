import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { DebtItem } from 'src/app/interfaces/interfaces';
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
} from 'chart.js';

@Component({
  selector: 'app-financial-chart',
  templateUrl: './financial-chart.component.html',
  styleUrls: ['./financial-chart.component.scss'],
})
export class FinancialChartComponent implements OnInit, OnChanges {
  @Input() data!: DebtItem[];
  @Input() debitorSelected!: string;
  @Input() creditorSelected?: string;
  chart!: Chart;

  constructor() {
    Chart.register(
      ArcElement,
      LineElement,
      BarElement,
      PointElement,
      BarController,
      BubbleController,
      DoughnutController,
      LineController,
      PieController,
      PolarAreaController,
      RadarController,
      ScatterController,
      CategoryScale,
      LinearScale,
      LogarithmicScale,
      RadialLinearScale,
      TimeScale,
      TimeSeriesScale,
      Decimation,
      Filler,
      Legend,
      Title,
      Tooltip,
      SubTitle
    );
  }

  ngOnInit(): void {
    this.createChart();
  }

  ngOnChanges(): void {}

  generateLabels(): string[] {
    return this.data
      .sort((a, b) => a.transactionDate.getTime() - b.transactionDate.getTime())
      .map(
        (x) =>
          `${x.transactionDate.getDate()}/${x.transactionDate.getMonth() + 1}`
      );
  }

  generateValues(user: string): any[] {
    const userValues = this.data.sort(
      (a, b) => a.transactionDate.getTime() - b.transactionDate.getTime()
    );
    const result = userValues.reduce(
      (prevValue: number[], currentValue, index) => {
        const oldValue = prevValue[index - 1] || prevValue[index] || 0;
        const result =
          currentValue.debitor === user
            ? currentValue.amount + (prevValue[index - 1] || 0)
            : oldValue;
        prevValue.push(result);
        return prevValue;
      },
      []
    );

    return result;
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
    if (this.chart) this.chart.destroy();
    this.chart = new Chart('financialChart', {
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
    });
  }
}
