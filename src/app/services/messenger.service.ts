import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  message: Subject<any> = new Subject<any>();
  constructor() { }

  setMessage(value: any){
    this.message.next(value);
  }

  getMessageObserable(){
    return this.message.asObservable();
  }

}
