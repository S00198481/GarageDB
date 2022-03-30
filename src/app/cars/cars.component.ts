import { Component, OnInit } from '@angular/core';
import { FirebaseApiService } from '../services/firebase-api.service';
import { Car } from '../car';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  cars: any=[];

  constructor(public firebaseApiService: FirebaseApiService) { }

  ngOnInit() {
    this.loadCars();
  }

  loadCars() {
    return this.firebaseApiService.getCars().subscribe((data: {}) => {
      this.cars = data;
      console.log(this.cars);
    })
  }

  removeCar(car: Car) {
    this.cars = null;
    this.firebaseApiService.removeCar(car).subscribe((data: {}) => {
      console.log(this.cars);
    })
    this.loadCars()
  }

}
