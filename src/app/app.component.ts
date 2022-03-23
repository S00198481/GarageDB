import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseApiService } from './services/firebase-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GarageDB';

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
