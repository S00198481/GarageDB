import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarsComponent } from './display/cars/cars.component';
import { LoginComponent } from './auth/login/login.component';
import { CardetailsComponent } from './display/cardetails/cardetails.component';
import { AddcarComponent } from './addcar/addcar.component';

const routes: Routes = [
  {path: '', redirectTo: '/cars', pathMatch: 'full'},
  {path: 'cars', component: CarsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cardetails/:id', component: CardetailsComponent},
  {path: 'addcar', component: AddcarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
