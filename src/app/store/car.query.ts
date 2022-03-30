import { Injectable } from '@angular/core';
import { CarStore, CarState } from './car.store';
import { QueryEntity } from '@datorama/akita';


@Injectable({
  providedIn: 'root'
})
export class CarQuery extends QueryEntity<CarState> {

  selectAreCarsLoaded$ = this.select(state => {
    console.log(state.areCarsLoaded);
    return state.areCarsLoaded;
  });

  constructor(protected override store: CarStore) {
    super(store);
  }
}
