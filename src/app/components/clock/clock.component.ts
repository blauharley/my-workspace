import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import Timer = NodeJS.Timer;

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss'],
})
export class ClockComponent implements OnInit, OnDestroy {

  private timeInterval: Timer=null;
  private time: Observable<Date> = new Observable(observer => {
    this.timeInterval = setInterval(() => {
      console.log('time');
      observer.next(new Date())
    }, 1000);
  });

  constructor() {}

  ngOnInit() {}

  ngOnDestroy(){
    clearInterval(this.timeInterval);
  }

}
