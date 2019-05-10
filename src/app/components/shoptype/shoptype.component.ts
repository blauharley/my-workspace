import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Form, FormControl, FormControlName, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-shoptype',
  templateUrl: './shoptype.component.html',
  styleUrls: ['./shoptype.component.scss']
})
export class ShoptypeComponent implements OnInit {

  thenBlock: TemplateRef<any>|null = null;

  myForm: FormGroup = null;
  formControlName: string = null;
  formControl: FormControl = new FormControl();
  myFormControl: FormControl = null;

  show: boolean = true;
  show2: boolean = true;

  @ViewChild('primaryBlock')
  primaryBlock: TemplateRef<any>|null = null;
  @ViewChild('secondaryBlock')
  secondaryBlock: TemplateRef<any>|null = null;

  constructor(private route: ActivatedRoute) { }

  switchTemplate(){
    this.thenBlock = this.thenBlock === this.primaryBlock ? this.secondaryBlock : this.primaryBlock;
  }

  ngOnInit() {
    console.log('shop-type init');
    this.thenBlock = this.primaryBlock;
    this.route.paramMap.subscribe((data)=>{
      console.log(data);
    })
  }

}
