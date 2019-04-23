import { Pipe, PipeTransform } from '@angular/core';
import {MyRegEx} from '../dataobjects/MyRegEx';
import {RegExTranslatorService} from '../services/reg-ex-translator.service';

@Pipe({
  name: 'regExpSearch'
})
export class RegExpSearchPipe implements PipeTransform {

  transform(regexes: MyRegEx[], searchTerm?: string): any {
    if(!searchTerm){
      return regexes;
    }
    return regexes.filter((regex: MyRegEx)=>{
      console.log(searchTerm,regex.value);
      return regex.value && regex.value.indexOf(searchTerm)===0;
    });
  }

}
