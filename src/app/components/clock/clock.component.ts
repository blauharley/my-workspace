import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

function OnDestroyDecorator(decArgs: any): ClassDecorator {
  return (target: Function) => {

    const ngOnDestroy: Function = target.prototype.ngOnDestroy;
    target.prototype.ngOnDestroy = ( ...args ) => {

      console.log('ngOnDestroy:', target.name, decArgs);

      if ( ngOnDestroy ) {
        ngOnDestroy.apply(target, args);
      }
    };
  };
}

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss'],
})
@OnDestroyDecorator({
  arg: 'argument'
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
