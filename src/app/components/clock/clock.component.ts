import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AlertService} from '../../services/alert-service.service';
import {AlertMockService} from '../../services/alert-mock-service.service';
import {environment} from '../../../environments/environment';

const heroServiceFactory = () => {
  return environment.production ? new AlertService() : new AlertMockService();
};

const alertServiceProvider =
    { provide: AlertService,
      useFactory: heroServiceFactory,
      deps: []
    };

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss'],
  providers: [alertServiceProvider]
})
export class ClockComponent implements OnInit, OnDestroy {

  timeInterval: Observable<Date>=null;

  constructor(service: AlertService) {
    service.alert();
    this.timeInterval = interval(1000).pipe(map(() => new Date()));
  }

  ngOnInit() {

  }

  ngOnDestroy(){}

}
