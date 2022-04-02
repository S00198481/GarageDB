import { Component, OnInit } from '@angular/core';
import { NgAuthService } from '../services/ng-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public ngAuthService: NgAuthService) {}

  ngOnInit() {}

}
