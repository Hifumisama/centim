import {
  Component,
  Input,
  OnInit,
  ViewChildren,
  ElementRef,
  QueryList,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Category, DebtItem } from 'src/app/interfaces/interfaces';
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
  selector: 'app-finances-portion',
  templateUrl: './finances-portion.component.html',
  styleUrls: ['./finances-portion.component.scss'],
})
export class FinancesPortionComponent
  implements OnInit, OnChanges, AfterViewInit
{
  @Input() data!: DebtItem[];
  @Input() categories!: Category[];
  @Input() users!: string[];

  @ViewChildren('pr_chart', { read: ElementRef })
  chartElementRefs!: QueryList<ElementRef>;

  dataset = {};

  charts!: Chart[];
  chartDataList!: any;

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

  ngOnInit() {
    if (this.data && this.data.length > 0) {
      this.chartDataList = this.users.map((user) =>
        this.generateChartData(user)
      );
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['data'].isFirstChange()) {
      if (this.data && this.data.length > 0) {
        this.chartDataList = this.users.map((user) =>
          this.generateChartData(user)
        );
        this.chartElementRefs.changes.subscribe((_) => this.drawCharts());
      }
    }
  }

  ngAfterViewInit() {
    this.drawCharts();
  }

  drawCharts() {
    this.charts = this.chartElementRefs.map((chartElementRef, index) => {
      const config = Object.assign({}, this.chartDataList[index]);
      return new Chart(chartElementRef.nativeElement, config);
    });
  }

  /**
   * On récupère ici uniquement les labels qui ont une utilité ou des données présentes :).
   */
  getLabels(user: string) {
    const categories = this.data
      .filter((data) => data.debitor === user)
      .map((data) => data.type);
    return [...new Set(categories)];
  }

  getBGColors(user: string) {
    return this.getLabels(user).map(
      (label) =>
        this.categories.find((category) => category.name === label)
          ?.backgroundColor || '#FFFFFF'
    );
  }

  filterData(category: string, user: string): DebtItem[] {
    return this.data.filter(
      (data) => data.type === category && data.debitor === user
    );
  }

  // ici c'est un peu plus compliqué :D
  // il faut en gros récupérer pour chaque catégorie les valeurs associées,
  // les additioner, puis les ajouter au tableau :3
  getFinancialData(user: string): number[] {
    return this.getLabels(user).map((category) => {
      return this.filterData(category, user)
        .map((item) => item.amount)
        .reduce((prevAmount, currentAmount) => {
          return prevAmount + currentAmount;
        }, 0);
    });
  }

  getTotalAmount(user: string): number {
    return this.data
      .filter((data) => data.debitor === user)
      .map((x) => x.amount)
      .reduce((prevAmount, currentAmount) => {
        return prevAmount + currentAmount;
      }, 0);
  }

  getFinancialDataPercentile(user: string): number[] {
    return this.getLabels(user).map((category) => {
      const amount = this.filterData(category, user)
        .map((item) => item.amount)
        .reduce((prevAmount, currentAmount) => {
          return prevAmount + currentAmount;
        }, 0);
      return Math.round((amount * 100) / this.getTotalAmount(user));
    });
  }

  generateChartData(user: string): any {
    return {
      type: 'pie',
      data: {
        labels: this.getLabels(user),
        datasets: [
          {
            label: 'Répartition des dépenses',
            weight: 9,
            borderWidth: 2,
            backgroundColor: this.getBGColors(user),
            data: this.getFinancialDataPercentile(user),
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },

          title: {
            display: true,
            text: `Dépenses de ${user}`,
            color: '#FFFFFF',
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
              display: false,
              drawOnChartArea: false,
              drawTicks: false,
            },
            ticks: {
              display: false,
            },
          },
          x: {
            grid: {
              drawBorder: false,
              display: false,
              drawOnChartArea: false,
              drawTicks: false,
            },
            ticks: {
              display: false,
            },
          },
        },
      },
    };
  }
}
