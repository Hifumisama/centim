import { Component, OnInit } from '@angular/core';
import { DataSeries } from 'src/app/data/interfaces';
import { mockData } from 'src/app/data/mockData';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  constructor() {}

  dataSeries: DataSeries[] = [];

  ngOnInit(): void {
    this.dataSeries = mockData;
  }

  addNewEntry(item: DataSeries) {
    this.dataSeries.push(item);
    console.log('wtf ?! ', this.dataSeries);
  }
  deleteEntry(data: DataSeries) {
    this.dataSeries = this.dataSeries.filter((x) => x.id !== data.id);
  }
  updateEntry(update: { data: DataSeries; id: number }) {
    this.dataSeries[update.id] = update.data;
    console.log(this.dataSeries);
  }
}
