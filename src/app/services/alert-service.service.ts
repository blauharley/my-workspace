import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  alert(){
    alert('Hi, I\'m a true service');
  }

}
