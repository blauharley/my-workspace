import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-shoptype',
  templateUrl: './shoptype.component.html',
  styleUrls: ['./shoptype.component.scss']
})
export class ShoptypeComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('shop-type init');
    this.route.paramMap.subscribe((data)=>{
      console.log(data);
    })
  }

}
