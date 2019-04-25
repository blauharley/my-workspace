import { Pipe, PipeTransform } from '@angular/core';
import {MyRegEx} from '../dataobjects/MyRegEx';
import {RegExTranslatorService} from '../services/reg-ex-translator.service';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'regExpSearch'
})
export class RegExpSearchPipe implements PipeTransform {

  constructor(private service: RegExTranslatorService=null){

  }

  transform(regexes: MyRegEx[], searchTerm?: string): any {
    if(!searchTerm){
      return regexes;
    }
    let humanReadableSearchTerm: string = this.service.translateToNormalizedExp(searchTerm);
    return regexes.filter((regex: MyRegEx)=>{
      let comboFound = this.service.getHumanExpCombinations(regex.value.pure).filter( (combo) => {
        return combo.indexOf(humanReadableSearchTerm)===0;
      });
      return comboFound.length;
    });
  }

}
