import {Component, Input, OnInit} from '@angular/core';
import {Form, FormControl, FormControlName} from '@angular/forms';

@Component({
  selector: 'app-formblock',
  templateUrl: './formblock.component.html',
  styleUrls: ['./formblock.component.scss']
})
export class FormblockComponent implements OnInit {

  @Input() condition: any;

  constructor() { }

  ngOnInit() {
  }

}
