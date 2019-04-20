import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Location} from '@angular/common';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.scss']
})
export class NaviComponent implements OnInit {
  @Input() search: string = '';
  @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();

  activePath: string;

  constructor(private location: Location, private appComponent: AppComponent) {

  }

  ngOnInit() {
    this.activePath = this.location.path().slice(1);
  }

  emitText(text){
    this.searchChange.emit(text);
  }

}
