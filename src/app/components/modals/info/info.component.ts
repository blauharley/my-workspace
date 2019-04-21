import {Component, Input, OnInit, Output} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  @Input() title: string;
  @Input() name: string;
  @Input() message: string;

  constructor() { }

  ngOnInit() {

  }

}
