import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss'],
})
export class ClockComponent implements OnInit, OnDestroy {

  private timeInterval: any=null;
  public time: any = null;

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
