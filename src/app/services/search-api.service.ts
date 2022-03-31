import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchApiService {

  apiURL:string = 'http://www.carimagery.com/api.asmx/GetImageUrl?searchTerm=';
  returnURL:string = "";

  constructor(private http:HttpClient) { }

  getImage(make:string, model:string):Observable<XMLDocument> {
    return this.http.get<any>(this.apiURL + make + "+" + model)
  }
}
