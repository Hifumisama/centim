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
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  MatDialog,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

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
import { DebtResumeComponent } from './components/debt-resume/debt-resume.component';
import { PositivePipe } from './pipes/positive.pipe';
import { DebtChartComponent } from './components/debt-chart/debt-chart.component';
import { FinancialChartComponent } from './components/financial-chart/financial-chart.component';
import { HeaderComponent } from './components/header/header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { CreateUserPageComponent } from './pages/create-user-page/create-user-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { DebtSheetPageComponent } from './pages/debt-sheet-page/debt-sheet-page.component';
import { DebtListComponent } from './components/debt-list/debt-list.component';
import { DebtSheetEditComponent } from './components/debt-sheet-edit/debt-sheet-edit.component';
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    FinancialDatatabComponent,
    FinancesPortionComponent,
    FinancialFormComponent,
    DebtResumeComponent,
    PositivePipe,
    DebtChartComponent,
    FinancialChartComponent,
    HeaderComponent,
    AuthPageComponent,
    CreateUserPageComponent,
    ErrorPageComponent,
    DebtSheetPageComponent,
    DebtListComponent,
    DebtSheetEditComponent,
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
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,

    FlexLayoutModule,

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
