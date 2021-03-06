import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { Car } from '../../car';
import { Task } from 'src/app/task';
import { FirebaseApiService } from '../../services/firebase-api.service';
import { SearchApiService } from '../../services/search-api.service';
import { CarQuery } from '../../store/car.query';
import { CarState } from '../../store/car.store';

@Component({
  selector: 'app-cardetails',
  templateUrl: './cardetails.component.html',
  styleUrls: ['./cardetails.component.css']
})
export class CardetailsComponent implements OnInit, OnDestroy {

  car!: Car;
  id!: string;
  private routeSub!: Subscription;
  cars!: Observable<Car[]>


  carToBeUpdated: Car | any;
  isUpdateActivated = false;
  listCarSub!: Subscription;
  deleteCarSub!: Subscription;
  updateCarSub!: Subscription;
  cstate!: CarState;
  completed: string = "complete";
  cars$: Observable<any> = this.carQuery.selectAll();

  constructor(private route: ActivatedRoute, private firebaseApiService: FirebaseApiService, private carQuery: CarQuery, private searchApi: SearchApiService) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
      this.id = (params['id'])
    })
    this.cars$.subscribe(result => {
      result.forEach((element: Car) => {
        if (element.id == this.id) {
          this.car = element;
        }
      });
    })
    /*
    this.searchApi.getImage((this.car.make).toLowerCase(), (this.car.model).toLowerCase()).subscribe(result => {
      var img = document.getElementById("apiIMG")
      console.log(result)
      const parser = new DOMParser();
      const xmlDOM = parser.parseFromString(result.firstChild?.textContent!,"text/xml");
      const value = xmlDOM.getElementsByTagName("string")[0].childNodes[0].nodeValue
      img?.setAttribute("src", value!);
    })
    */
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  updateCar(car: Car, taskDone:Task) {
    this.carToBeUpdated = car;
    console.log(this.carToBeUpdated.tasks)
    this.updateCarSub = this.firebaseApiService.updateCar(
      this.carToBeUpdated, taskDone).subscribe(result => console.log(result))
    this.isUpdateActivated = false;
    this.carToBeUpdated = null
  }
}
