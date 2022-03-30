import { Injectable } from '@angular/core';
import { CarStore, CarState } from './car.store';
import { QueryEntity } from '@datorama/akita';


@Injectable({
  providedIn: 'root'
})
export class CarQuery extends QueryEntity<CarState> {

  selectArePeopleLoaded$ = this.select(state => {
    console.log(state.arePeopleLoaded);
    return state.arePeopleLoaded;
  });

  constructor(protected override store: CarStore) {
    super(store);
  }
}
