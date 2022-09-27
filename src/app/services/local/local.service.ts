import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  private readonly _localSheetSelected = new BehaviorSubject<string>('');
  readonly sheetSelected$ = this._localSheetSelected.asObservable();

  constructor() {}

  getSheetSelected(): string {
    return this._localSheetSelected.getValue();
  }

  setSheetSelected(id: string) {
    this._localSheetSelected.next(id);
  }
}
