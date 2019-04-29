import { Component, OnInit } from '@angular/core';
import {MyRegEx} from '../../dataobjects/MyRegEx';
import {RegExpSearchPipe} from '../../../../projects/use-your-own-reg-ex/src/pipes/reg-exp-search.pipe';
import {RegExpTranslations} from '../../../../projects/use-your-own-reg-ex/src/enums/reg-exp-translations.class';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  providers: [RegExpSearchPipe]
})
export class ShopComponent implements OnInit {

  addRegExModeOn: boolean = false;
  addModalId: string = 'addRegEx';
  naviSearchText: string = '';
  regexes: MyRegEx[] = [
      new MyRegEx('Headproduct-Search', {pure: '\\d{1,3}[-]\\d{1,3}', searchable: '111-111'}), // 123-456 or 678-000
      new MyRegEx('Subproduct-Search', {pure: '\\d{1,3}[-]\\d{1,3}[/]\\w{1,3}', searchable: '111-111/AAA'}) // 123-456/a or 123-456/abc
  ];

  constructor(private regexSearchPipe: RegExpSearchPipe) {
    // overwrite letter and number flags to use our own
    RegExpTranslations.LETTER = "A";
    RegExpTranslations.NUMBER = "1";
  }

  ngOnInit() {}

  addRegExp(){
    this.addRegExModeOn = true;
  }

  transformRegexes(regexes: Array<MyRegEx>): Array<string> {
    return regexes.map((regex)=>{
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

  getItem(index): RegExp{
    let r = this.regexSearchPipe.transform(this.regexes, {searchTerm: this.naviSearchText, transformFunction: this.transformRegexes });
    r = this.regexes.filter((regex)=>{
      return r.indexOf(regex.value.pure)!==-1;
    });
    return r[index];
  }

}
