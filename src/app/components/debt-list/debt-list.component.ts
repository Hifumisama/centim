import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DebtList } from 'src/app/interfaces/interfaces';
@Component({
  selector: 'app-debt-list',
  templateUrl: './debt-list.component.html',
  styleUrls: ['./debt-list.component.scss'],
})
export class DebtListComponent implements OnInit {
  @Input() data: DebtList[] = [];
  displayedColumns = ['name', 'description', 'createdBy', 'createdAt'];

  constructor(private readonly router: Router) {}
  ngOnInit(): void {}

  goToSheet(id: string) {
    this.router.navigate(['/mainPage', id]);
  }
}
