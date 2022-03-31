import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CardetailsComponent } from './cardetails/cardetails.component';
import { CarsComponent } from './cars/cars.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddcarComponent } from './addcar/addcar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CardetailsComponent,
    CarsComponent,
    AddcarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
