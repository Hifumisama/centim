import { Component, Input, OnInit } from '@angular/core';
import { DataSeries } from 'src/app/data/interfaces';
import { categories } from 'src/app/data/mockData';

@Component({
  selector: 'app-finances-portion',
  templateUrl: './finances-portion.component.html',
  styleUrls: ['./finances-portion.component.scss'],
})
export class FinancesPortionComponent implements OnInit {
  @Input() data: DataSeries[] = [];

  dataset = {};

  constructor() {}

  get BGColors() {
    return categories.map((x) => x.backgroundColor);
  }

  // ici c'est un peu plus compliqué :D
  // il faut en gros récupérer pour chaque catégorie les valeurs associées,
  // les additioner, puis les ajouter au tableau :3
  get financialData() {
    return categories.map((category) => {
      return this.data
        .filter((data) => data.category === category.name)
        .map((item) => item.amount)
        .reduce((prevAmount, currentAmount) => {
          return prevAmount + currentAmount;
        }, 0);
    });
  }

  get totalAmount() {
    return this.data
      .map((x) => x.amount)
      .reduce((prevAmount, currentAmount) => {
        return prevAmount + currentAmount;
      }, 0);
  }

  get financialDataPercentile() {
    return categories.map((category) => {
      const amount = this.data
        .filter((data) => data.category === category.name)
        .map((item) => item.amount)
        .reduce((prevAmount, currentAmount) => {
          return prevAmount + currentAmount;
        }, 0);
      return Math.round((amount * 100) / this.totalAmount);
    });
  }

  get labels() {
    return categories.map((category) => category.name);
  }

  ngOnInit() {
    this.dataset = {
      datasets: [
        {
          data: this.financialDataPercentile,
          backgroundColor: this.BGColors,
          label: 'Total de dépenses',
        },
      ],
      labels: this.labels,
    };
  }
}
