import { Pipe, PipeTransform } from '@angular/core';
import {MyRegEx} from '../dataobjects/MyRegEx';

@Pipe({
  name: 'regExpSearch'
})
export class RegExpSearchPipe implements PipeTransform {

  transform(regexes: MyRegEx[], searchTerm?: string): any {
    if(!searchTerm){
      return regexes;
    }
    return regexes.filter((regex: MyRegEx)=>{
      return regex.value && regex.value.searchable.indexOf(searchTerm)===0;
    });
  }

}
