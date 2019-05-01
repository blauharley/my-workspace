import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Location} from '@angular/common';
import {AppComponent} from '../../app.component';
import {AuthenticationServiceService} from '../../services/authentication-service.service';
import {User} from '../../dataobjects/user';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.scss']
})
export class NaviComponent implements OnInit {
  @Input() search: string = '';
  @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();

  activePath: string;
  currentUser: User;

  constructor(private location: Location, public appComponent: AppComponent, private authenticationService: AuthenticationServiceService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.activePath = this.location.path().slice(1);
  }

  emitText(text){
    this.searchChange.emit(text);
  }

}
