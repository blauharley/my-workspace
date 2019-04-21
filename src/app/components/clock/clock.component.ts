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
  private time: any = null;

  constructor() {}

  ngOnInit() {
    new Observable<Date>(observer => {
      this.timeInterval = setInterval(() => {
        observer.next(new Date());
      }, 1000);
    }).subscribe((date)=>{
      this.time = date;
    });
  }

  ngOnDestroy(){
    clearInterval(this.timeInterval);
  }

}