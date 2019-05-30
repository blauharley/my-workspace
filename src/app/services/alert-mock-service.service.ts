import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertMockService {

  constructor() { }

  alert(){
    console.log('Hi, I\'m a mock service');
  }

}
