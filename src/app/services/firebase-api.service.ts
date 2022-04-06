import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Car } from '../car';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators'
import { CarStore, CarState } from '../store/car.store';
import { EntityStore, EntityState } from '@datorama/akita';
import { Task } from '../task';
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
    return this.http.post<Car>(this.apiURL + '/addCar' + '?make=' + car.make +
      '&model=' + car.model + '&reg=' + car.reg + '&year=' + car.year + '&owner=' + car.owner
      + '&contact=' + car.contact + car.tasks,
      { title: 'car upload' })
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

  updateCar(car: Car, taskDone: Task) {
    console.log(car)
    let tasksURI: any = "";
    let taskArray: string[] = []

    car.tasks.forEach((task: any) => {
      console.log(task + " " + taskDone)
      if (task != taskDone) {
        taskArray.push(task)
      }
    });
    console.log(taskArray)

    for (let j = 0; j < taskArray.length; j++) {
      tasksURI = (tasksURI + "&tasks[" + j + "]=" + taskArray[j]);
    }

    if(tasksURI == "") {
      tasksURI = "&tasks[0]=complete"
    }

    return this.http.put<Car>(this.apiURL + '/updateCar' + '?id=' + car.id + '&make=' + car.make +
    '&model=' + car.model + '&reg=' + car.reg + '&year=' + car.year + '&owner=' + car.owner
    + '&contact=' + car.contact + tasksURI,
      { title: 'car update' })
      .pipe(
        retry(1),
        tap((cars:any) =>
          this.store.loadCars(cars, true)),
        catchError(this.handleError)
      )
  }

  handleError(error: any) {
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
