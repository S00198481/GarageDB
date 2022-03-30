import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http'
import { Car } from '../car';
import { Observable, throwError } from 'rxjs';
import {retry, catchError, tap } from 'rxjs/operators'
import { CarStore, CarState } from '../store/car.store';
import { EntityStore, EntityState } from '@datorama/akita';

@Injectable({
  providedIn: 'root'
})
export class FirebaseApiService {

  store: CarStore;
  apiURL = 'https://us-central1-garagedb-a09fe.cloudfunctions.net';

  constructor(private http: HttpClient, store: CarStore) {
    this.store = store;
    this.http = http;
   }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getCars() {
    return this.http.get<Car[]>(this.apiURL + '/getCars')
    .pipe(
      retry(1),
      tap(cars =>
        this.store.loadCars(cars, true))
    )
  }

  addCar(car: Car) {
    return this.http.post<Car>(this.apiURL + '/addCars' + '?make=' + car.make +
     '&model=' + car.model + '&reg=' + car.reg + '&year=' + car.year + '&tasks=' + car.tasks, 
     {title: 'car upload'})
    .pipe(
      retry(1),
      tap(car =>
        this.store.add([car]))
    )
  }

  removeCar(car: Car): Observable<Car> {
    let id = car.id
    return this.http.delete<Car>(this.apiURL + '/deleteCar' + '?id=' + car.id)
    .pipe(
      tap(car => {
        this.store.remove(id);
      })
    )
  }

  updateCar(car: Car) {
    return this.http.put<Car>(this.apiURL + '/updateCar' + '?id=' + car.id + '&make=' + car.make +
     '&model=' + car.model + '&reg=' + car.reg + '&year=' + car.year + '&tasks=' + car.tasks, 
     {title: 'car upload'})
    .pipe(
      retry(1),
      tap(car =>
        this.store.update([car])),
      catchError(this.handleError)
    )
  }

  handleError(error:any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage)
  }
}
