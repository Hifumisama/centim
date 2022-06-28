import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { DataSeries } from 'src/app/data/interfaces';
import { categories } from 'src/app/data/mockData';
import { FinancialFormComponent } from '../financial-form/financial-form.component';

@Component({
  selector: 'app-financial-datatab',
  templateUrl: './financial-datatab.component.html',
  styleUrls: ['./financial-datatab.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*', minHeight: '50px' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class FinancialDatatabComponent implements OnInit {
  @Input() data: DataSeries[] = [];
  @Output() deleteEntry = new EventEmitter<DataSeries>();
  @Output() updateEntry = new EventEmitter();
  clonedData: DataSeries[] = [];

  displayedColumns = ['transaction', 'amount', 'category', 'expand'];
  expandedElement?: DataSeries | null;

  constructor(
    private messageService: MessageService,
    public dialog: MatDialog
  ) {}
  get dropDownCategories() {
    return categories.map((x) => x.name);
  }

  ngOnInit(): void {}

  openEditDialog(data: DataSeries): void {
    this.dialog.open(FinancialFormComponent, {
      data: {
        item: data,
      },
    });
  }

  onRowEditInit(dataEdited: DataSeries) {
    const id = this.data.findIndex((x) => x.id === dataEdited.id);
    this.clonedData[id] = { ...dataEdited };
  }

  onRowEditSave(dataEdited: DataSeries) {
    const id = this.data.findIndex((x) => x.id === dataEdited.id);
    delete this.clonedData[id];

    this.updateEntry.emit({ update: { data: this.data[id], id } });

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

  onRowDelete(data: DataSeries) {
    this.deleteEntry.emit(data);
  }

  getExpandElement(element: DataSeries) {
    console.log(element);
    this.expandedElement = element;
  }
}
