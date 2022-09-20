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
import { DebtItem } from 'src/app/interfaces/interfaces';
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
  @Input() data: DebtItem[] = [];
  @Output() deleteEntry = new EventEmitter<DebtItem>();
  @Output() updateEntry = new EventEmitter();
  clonedData: DebtItem[] = [];

  displayedColumns = ['transaction', 'amount', 'type', 'expand'];
  expandedElement?: DebtItem | null;

  constructor(
    private messageService: MessageService,
    public dialog: MatDialog
  ) {}
  get dropDownCategories() {
    return categories.map((x) => x.name);
  }

  ngOnInit(): void {}

  openEditDialog(data: DebtItem): void {
    this.dialog.open(FinancialFormComponent, {
      data: {
        item: data,
      },
    });
  }

  onRowEditInit(dataEdited: DebtItem) {
    const id = this.data.findIndex((x) => x.id === dataEdited.id);
    this.clonedData[id] = { ...dataEdited };
  }

  onRowEditSave(dataEdited: DebtItem) {
    const id = this.data.findIndex((x) => x.id === dataEdited.id);
    delete this.clonedData[id];

    this.updateEntry.emit({ update: { data: this.data[id], id } });

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Entrée mise à jour',
    });
  }

  onRowEditCancel(dataEdited: DebtItem, index: number) {
    const id = this.data.findIndex((x) => x.id === dataEdited.id);
    this.data[index] = this.clonedData[id];
    delete this.clonedData[id];
  }

  onRowDelete(data: DebtItem) {
    this.deleteEntry.emit(data);
  }

  getExpandElement(element: DebtItem) {
    console.log(element);
    this.expandedElement = element;
  }
}
