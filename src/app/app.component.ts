import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseApiService } from './services/firebase-api.service';
import { NgAuthService } from './services/ng-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GarageDB';

  cars: any=[];

  constructor(public firebaseApiService: FirebaseApiService, public ngAuthService: NgAuthService) { }

  ngOnInit() {
  }

}
