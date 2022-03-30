import { Component, OnDestroy, OnInit } from '@angular/core';
import { FirebaseApiService } from '../services/firebase-api.service';
import { Car } from '../car';
import { CarQuery } from '../store/car.query';
import { CarState } from '../store/car.store';
import { Observable, Subscription } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit, OnDestroy {

  carToBeUpdated: Car | any;
  isUpdateActivated = false;
  listCarSub!: Subscription;
  deleteCarSub!: Subscription;
  updateCarSub!: Subscription;
  cstate!: CarState;
  carQuery!: CarQuery;

  cars$: Observable<Car[]> 



  constructor(public firebaseApiService: FirebaseApiService, carQuery: CarQuery) {
    this.carQuery = carQuery
    this.cars$ = this.carQuery.selectAll();
   }

  ngOnInit() {
    this.listCarSub = this.carQuery.selectAreCarsLoaded$.pipe(
      filter(areCarsLoaded => !areCarsLoaded),
      switchMap(areCarsLoaded => {
        if(!areCarsLoaded) {
          return this.firebaseApiService.getCars()
        } else return ''
      })
    ).subscribe(result => {});
  }

  ngOnDestroy() {
    if(this.listCarSub) {
      this.listCarSub.unsubscribe;
    }
    if(this.deleteCarSub) {
      this.deleteCarSub.unsubscribe;
    }
    if(this.updateCarSub) {
      this.updateCarSub.unsubscribe;
    }
  }

  removeCar(car: Car) {
    this.deleteCarSub = this.firebaseApiService.removeCar(car).subscribe(result => {
      console.log(result);
    })
  }

  updateCar() {
    this.updateCarSub = this.firebaseApiService.updateCar(
      this.carToBeUpdated.id).subscribe(result => console.log(result))
    this.isUpdateActivated = false;
    this.carToBeUpdated = null
  }
}
