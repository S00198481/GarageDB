import { Component, OnInit } from '@angular/core';
import { FirebaseApiService } from '../services/firebase-api.service';

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
    })
  }

}
