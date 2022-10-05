import { Component, Input, OnInit } from '@angular/core';
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
import { DebtService } from 'src/app/services/debt/debt.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-debt-chart',
  templateUrl: './debt-chart.component.html',
  styleUrls: ['./debt-chart.component.scss'],
})
export class DebtChartComponent implements OnInit {
  @Input() data!: DebtItem[];
  @Input() debitorSelected!: string;
  @Input() creditorSelected!: string;
  chart!: Chart;

  subscription!: Subscription;

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

  generateLabels(): string[] {
    return this.data
      .sort((a, b) => a.transactionDate.getTime() - b.transactionDate.getTime())
      .map(
        (x) =>
          `${x.transactionDate.getDate()}/${x.transactionDate.getMonth() + 1}`
      );
  }

  generateValues(): number[] {
    return this.data
      .sort((a, b) => a.transactionDate.getTime() - b.transactionDate.getTime())
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

  generateDataSets(): any[] {
    return [
      {
        label: 'Courbe de dette',
        tension: 0,
        pointRadius: 5,
        pointBackgroundColor: 'rgba(255, 255, 255, .8)',
        pointBorderColor: 'transparent',
        borderColor: 'rgba(255, 255, 255, .8)',
        borderWidth: 4,
        backgroundColor: 'transparent',
        fill: true,
        data: this.generateValues(),
      },
    ];
  }

  createChart() {
    if (this.chart) this.chart.destroy();
    this.chart = new Chart('debtChart', {
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
