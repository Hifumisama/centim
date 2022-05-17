import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DataSeries } from 'src/app/data/interfaces';
import { categories } from 'src/app/data/mockData';

@Component({
  selector: 'app-financial-datatab',
  templateUrl: './financial-datatab.component.html',
  styleUrls: ['./financial-datatab.component.scss'],
})
export class FinancialDatatabComponent implements OnInit {
  @Input() data: DataSeries[] = [];
  clonedData: DataSeries[] = [];

  constructor(private messageService: MessageService) {}
  get dropDownCategories() {
    return categories.map((x) => x.name);
  }

  ngOnInit(): void {}

  onRowEditInit(dataEdited: DataSeries) {
    const id = this.data.findIndex((x) => x.id === dataEdited.id);
    this.clonedData[id] = { ...dataEdited };
  }

  onRowEditSave(dataEdited: DataSeries) {
    const id = this.data.findIndex((x) => x.id === dataEdited.id);
    delete this.clonedData[id];
    console.log(this.data);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Entrée mise à jour',
    });
  }

  onRowEditCancel(dataEdited: DataSeries, index: number) {
    const id = this.data.findIndex((x) => x.id === dataEdited.id);
    this.data[index] = this.clonedData[id];
    delete this.clonedData[id];
  }
}
