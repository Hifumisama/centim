import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataSeries } from 'src/app/data/interfaces';
import { DebtItem } from 'src/app/interfaces/interfaces';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { Profile, SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  constructor(
    private readonly profileService: ProfileService,
    private readonly supabase: SupabaseService,
    private readonly route: ActivatedRoute
  ) {}

  userProfile!: Profile;
  sheetId: string = '';
  sheetData: DebtItem[] = [];

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe((params) => {
      this.sheetId = params.get('id') || '';
    });

    this.userProfile = this.profileService.getProfile();

    this.sheetData = (await this.supabase.getDebts(this.sheetId)) as DebtItem[];
    console.log(this.sheetData);
  }

  // addNewEntry(item: DataSeries) {
  //   this.dataSeries.push(item);
  //   console.log('wtf ?! ', this.dataSeries);
  // }
  // deleteEntry(data: DataSeries) {
  //   this.dataSeries = this.dataSeries.filter((x) => x.id !== data.id);
  // }
  // updateEntry(update: { data: DataSeries; id: number }) {
  //   this.dataSeries[update.id] = update.data;
  //   console.log(this.dataSeries);
  // }
}
