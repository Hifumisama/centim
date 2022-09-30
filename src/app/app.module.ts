import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FinancialDatatabComponent } from './components/financial-datatab/financial-datatab.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { FinancesPortionComponent } from './components/finances-portion/finances-portion.component';
import { FinancialFormComponent } from './components/financial-form/financial-form.component';
import { DebtResumeComponent } from './components/debt-resume/debt-resume.component';
import { PositivePipe } from './pipes/positive.pipe';
import { DebtChartComponent } from './components/debt-chart/debt-chart.component';
import { FinancialChartComponent } from './components/financial-chart/financial-chart.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { CreateUserPageComponent } from './pages/create-user-page/create-user-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { DebtSheetPageComponent } from './pages/debt-sheet-page/debt-sheet-page.component';
import { DebtListComponent } from './components/debt-list/debt-list.component';
import { DebtSheetEditComponent } from './components/debt-sheet-edit/debt-sheet-edit.component';
import { HeroComponent } from './components/hero/hero.component';
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
    AuthPageComponent,
    CreateUserPageComponent,
    ErrorPageComponent,
    DebtSheetPageComponent,
    DebtListComponent,
    DebtSheetEditComponent,
    HeroComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
