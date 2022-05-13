import { Component, Input, OnInit } from '@angular/core';
import { Category, DataSeries } from 'src/app/data/interfaces';

@Component({
  selector: 'app-financial-datatab',
  templateUrl: './financial-datatab.component.html',
  styleUrls: ['./financial-datatab.component.scss']
})
export class FinancialDatatabComponent implements OnInit {

  @Input() data: DataSeries[] = []

  constructor() { }

  ngOnInit(): void {
  }

  convertToDatatable(data: DataSeries) {

  }

  getNameCategory(categoryIndex: number) {
    return Category[categoryIndex];
  }

}
