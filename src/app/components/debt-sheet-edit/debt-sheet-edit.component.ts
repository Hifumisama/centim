import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DebtList } from 'src/app/interfaces/interfaces';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-debt-sheet-edit',
  templateUrl: './debt-sheet-edit.component.html',
  styleUrls: ['./debt-sheet-edit.component.scss'],
})
export class DebtSheetEditComponent implements OnInit {
  @Input() title!: string;
  @Input() initialData!: DebtList;

  debtSheetForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(private readonly supabase: SupabaseService) {}
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialData'].isFirstChange()) {
      this.initialData = changes['initialData'].currentValue
        ? changes['initialData'].currentValue
        : { name: '', description: '' };
    }
    this.debtSheetForm.patchValue(this.initialData);
    this.debtSheetForm.updateValueAndValidity();
  }

  async editDebtSheet() {
    const feuilleDette = {
      id: this.initialData.id,
      name: this.debtSheetForm.value.name,
      description: this.debtSheetForm.value.description,
      createdAt: this.initialData.createdAt,
      createdBy: this.initialData.createdBy,
    };
    await this.supabase.upsertDebtSheets(feuilleDette).then(() => {
      console.log('data updatée :D !');
    });
  }
}
