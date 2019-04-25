import { Pipe, PipeTransform } from '@angular/core';
import {MyRegEx} from '../dataobjects/MyRegEx';

@Pipe({
  name: 'transformMyRegExpIntoStrings'
})
export class TransformMyRegExpIntoStringsPipe implements PipeTransform {

  transform(regexes: Array<MyRegEx>, args?: any): any {
    return regexes.map((regex)=>{
      console.log(regex);
      return regex.value.pure;
    });
  }

}
