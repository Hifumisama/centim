import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { CalendarModule } from 'primeng/calendar';

import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FinancialDatatabComponent } from './components/financial-datatab/financial-datatab.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FinancesPortionComponent } from './components/finances-portion/finances-portion.component';
import { FinancialFormComponent } from './components/financial-form/financial-form.component';
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    FinancialDatatabComponent,
    FinancesPortionComponent,
    FinancialFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatGridListModule,
    MatSelectModule,
    MatButtonModule,

    InputTextModule,
    DropdownModule,
    TableModule,
    ButtonModule,
    CardModule,
    ChartModule,
    CalendarModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
