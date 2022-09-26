import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DebtList } from 'src/app/interfaces/interfaces';
import { DebtListService } from 'src/app/services/debtList/debt-list.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
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

  constructor(
    private readonly debtListService: DebtListService,
    private readonly profileService: ProfileService
  ) {}
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

  async upsertDebtSheet() {
    const feuilleDette = {
      id: this.initialData.id,
      name: this.debtSheetForm.value.name,
      description: this.debtSheetForm.value.description,
      createdAt: this.initialData.createdAt,
      createdBy:
        this.initialData.createdBy || this.profileService.getProfile().username,
    };
    await this.debtListService.upsertDebtSheets(feuilleDette).then(() => {
      console.log('data updatée :D !');
    });
  }
}
