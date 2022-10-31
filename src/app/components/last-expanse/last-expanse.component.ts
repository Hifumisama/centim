import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DebtItem } from 'src/app/interfaces/interfaces';
import { DebtService } from 'src/app/services/debt/debt.service';

@Component({
  selector: 'app-last-expanse',
  templateUrl: './last-expanse.component.html',
  styleUrls: ['./last-expanse.component.scss'],
})
export class LastExpanseComponent implements OnInit {
  @Input() users!: string[];
  lastExpanse$!: Subscription;

  lastExpanses!: DebtItem[];

  constructor(private readonly debtService: DebtService) {}

  async ngOnInit(): Promise<void> {
    this.lastExpanse$ = this.debtService.LastExpanseItem$.subscribe(
      (lastExpanses) => (this.lastExpanses = lastExpanses)
    );
    await this.debtService.fetchLastExpanses(this.users);
  }
}
