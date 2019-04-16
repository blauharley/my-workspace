import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.scss']
})
export class NaviComponent implements OnInit {
  activePath: string;

  constructor(private location: Location) {

  }

  ngOnInit() {
    this.activePath = this.location.path().slice(1);
  }
}
