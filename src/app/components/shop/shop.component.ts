import { Component, OnInit } from '@angular/core';
import {MyRegEx} from '../../dataobjects/MyRegEx';
import {RegExTranslatorService} from '../../services/reg-ex-translator.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  addRegExModeOn: boolean = false;
  addModalId: string = 'addRegEx';
  naviSearchText: string = '';
  regexes: MyRegEx[] = [
      new MyRegEx('Headproduct-Search', {pure: '\\d{1,3}[-]\\d{1,3}', searchable: 'NNN-NNN'}), // 123-456 or 678-000
      new MyRegEx('Subproduct-Search', {pure: '\\d{1,3}[-]\\d{1,3}[/]\\w{1,3}', searchable: 'NNN-NNN/LLL'}) // 123-456/a or 123-456/abc
  ];

  constructor() { }

  ngOnInit() {}

  addRegExp(){
    this.addRegExModeOn = true;
  }

  transformRegexes(regexes: Array<MyRegEx>): Array<string> {
    return regexes.map((regex)=>{
      console.log(regex);
      return regex.value.pure;
    });
  }

  handleNewRegEx(e: any){
    if(e.save) {
      this.regexes.push(e.data);
      this.regexes = [].concat(this.regexes);
    }
    this.addRegExModeOn = false;
  }

}
