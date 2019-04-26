import { Pipe, PipeTransform } from '@angular/core';
import {RegExTranslatorService} from '../services/reg-ex-translator.service';

@Pipe({
  name: 'regExpSearch'
})
export class RegExpSearchPipe implements PipeTransform {

  service: RegExTranslatorService = new RegExTranslatorService();

  constructor(){}

  transform(regexes: any[], args: { searchTerm: string, transformFunction?: Function}): any {
    let transformedArray = args.transformFunction ? args.transformFunction(regexes) : regexes;
    if(!args.searchTerm){
      return transformedArray;
    }
    let humanReadableSearchTerm: string = this.service.translateToNormalizedExp(args.searchTerm);
    return transformedArray.filter((transformedRegex: string)=>{
      let comboFound = this.service.getHumanExpCombinations(transformedRegex).filter( (combo) => {
        return combo.indexOf(humanReadableSearchTerm)===0;
      });
      return comboFound.length;
    });
  }

}
