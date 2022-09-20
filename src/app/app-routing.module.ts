import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IsSignedInGuard } from './components/guards/is-signed-in.guard';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { CreateUserPageComponent } from './pages/create-user-page/create-user-page.component';
import { DebtSheetPageComponent } from './pages/debt-sheet-page/debt-sheet-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: AuthPageComponent },
  { path: 'register', component: CreateUserPageComponent },
  {
    path: 'debtList',
    component: DebtSheetPageComponent,
    canActivate: [IsSignedInGuard],
  },
  {
    path: 'mainPage/:id',
    component: MainPageComponent,
    canActivate: [IsSignedInGuard],
  },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
