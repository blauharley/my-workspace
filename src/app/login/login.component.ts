import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from 'angular-2-local-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private localStorageService:LocalStorageService) { }

  ngOnInit() {
    this.localStorageService.add('username','josef');
    this.localStorageService.add('pass','12345');
  }

}
