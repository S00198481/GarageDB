import { Injectable } from '@angular/core';
import { Car } from '../car';
import { ID, EntityStore, StoreConfig, EntityState } from '@datorama/akita';

export interface CarState extends EntityState<Car, string> {
  areCarsLoaded: boolean;
}

export function createInitialState(): CarState {
  return {
      areCarsLoaded: false
  };
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'cars' })
export class CarStore extends EntityStore<CarState> {

    constructor() {
        super(createInitialState());
    }

    loadCars(cars: Car[], areCarsLoaded: boolean) {
      this.set(cars);
      console.log(cars)
      this.update(state => ({
        ...state, //typescript spread operator, returns all of the elements of the array
        areCarsLoaded
      }));
    }
}
