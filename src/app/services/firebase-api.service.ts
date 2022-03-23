import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http'
import { Car } from '../car';
import { Observable, throwError } from 'rxjs';
import {retry, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class FirebaseApiService {

  apiURL = 'https://us-central1-garagedb-a09fe.cloudfunctions.net';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getCars(): Observable<Car> {
    return this.http.get<Car>(this.apiURL + '/getCars')
    .pipe(
      retry(1),
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
