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

  constructor(private regExpService: RegExTranslatorService) { }

  ngOnInit() {
  }

  translatedSearchTerm(searchTerm){
    return this.regExpService.translateToNormalizedExp(searchTerm);
  }

  addRegExp(){
    this.addRegExModeOn = true;
  }

  onCloseModal(e: any){
    if(e.save) {
      this.regexes.push(e.data);
    }
    this.addRegExModeOn = false;
  }

}
