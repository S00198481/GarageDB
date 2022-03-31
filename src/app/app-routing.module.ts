import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarsComponent } from './cars/cars.component';
import { LoginComponent } from './login/login.component';
import { CardetailsComponent } from './cardetails/cardetails.component';
import { AddcarComponent } from './addcar/addcar.component';

const routes: Routes = [
  {path: '', redirectTo: '/cars', pathMatch: 'full'},
  {path: 'cars', component: CarsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cardetails', component: CardetailsComponent},
  {path: 'addcar', component: AddcarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
