import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegExTranslatorService {

  regExpTranslateTable: object = {
    'L' : '\\w{min,max}',
    'N' : '\\d{min,max}',
    '/' : '[/]',
    '\\' : '[\\]',
    '-' : '[-]'
  };

  constructor() { }

  translateToHumanExp(userString: string): string{
      return userString.split('').map((sign)=>{
        if(/^[0-9]+$/.test(sign)){
          return 'N';
        }
        else if(/^[a-zA-Z]+$/.test(sign)){
          return "L";
        } else if(/^-$/.test(sign)){
          return '-';
        } else if(/^\/$/.test(sign)){
          return '/';
        } else if(/^\\$/.test(sign)){
          return '\\';
        }
      }).join('');
  }

  translateToMaschineExp(userString: string): string{
    let lastSequenceType: string = null;
    let result: string = '';
    let counter: any = 1;
    userString.split("").forEach((sign,index,array)=>{
      if(lastSequenceType === sign){
        counter++;
      }
      let isLastIteration = index+1 === array.length;
      if(lastSequenceType === null || lastSequenceType !== sign || isLastIteration){
        if(lastSequenceType !== null){
          result = result
              .replace("min","1")
              .replace("max",counter);
          counter = 1;
        }
        if(lastSequenceType !== sign){
          result += this.regExpTranslateTable[sign];
        }
        if(isLastIteration){
          result = result
              .replace("min","1")
              .replace("max", "1");
        }
        lastSequenceType = sign;
      }
    });
    return result;
  }

  getHumanExpCombinations(userString: string): Array<string>{
    let result: Array<string> =  [];
    let firstRegexpInfo: {count: number, transformedString: string, placeholderName: string, placeholderFinalName: string} = this.getNumberRegExpInfo(userString);
    let firstRegexpInfo2: {count: number, transformedString: string, placeholderName: string, placeholderFinalName: string} = this.getNumberRegExpInfo(firstRegexpInfo.transformedString);
    let placeholders = firstRegexpInfo2.transformedString;
    placeholders = this.replaceAll(placeholders,'[-]','-');
    placeholders = this.replaceAll(placeholders,'[\\]','\\');
    placeholders = this.replaceAll(placeholders,'[/]','/');
    let maxNumber: number = firstRegexpInfo.count;
    let maxNumber2: number = firstRegexpInfo2.count;
    for(let numberIndex=0; numberIndex < maxNumber; numberIndex++){
      for(let numberIndex2=0; numberIndex2 < maxNumber2; numberIndex2++){
        result.push(
            placeholders
                .replace(firstRegexpInfo.placeholderName,(new Array(numberIndex+1)).fill(firstRegexpInfo.placeholderFinalName).join(''))
                .replace(firstRegexpInfo2.placeholderName,(new Array(numberIndex2+1)).fill(firstRegexpInfo2.placeholderFinalName).join(''))
        )
      }
    }
    return result;
  }
/*
  comb(array){
    let count = 1;
    if(array.length){
      var elements = array.shift();
      count = elements.length;
      elements.forEach(function(){
        count *= comb(array);
      });
    }
    return count;
  }
*/
  getNumberRegExpInfo(userString: string): {count: number, transformedString: string, placeholderName: string, placeholderFinalName: string} {
    let regexpInfo: Array<string> = userString.match(/[w|d][{]\d+[,](\d+)[}]/);
    if(regexpInfo){
      let placeHolderName = regexpInfo[0].indexOf('w')!==-1 ? 'LETTER' : 'NUMBER';
      let placeHolderNameFinal = placeHolderName === 'LETTER' ? 'L' : 'N';
      userString = userString.replace('\\'+regexpInfo[0], placeHolderName);
      return {
        count: +regexpInfo[1],
        transformedString: userString,
        placeholderName: placeHolderName,
        placeholderFinalName: placeHolderNameFinal
      };
    }
    return {
      count: 0,
      transformedString: userString,
      placeholderName: '',
      placeholderFinalName: ''
    }
  }

  replaceAll(str: string, search: string, replace: string):string{
    if(str.indexOf(search)!==-1){
      return this.replaceAll(str.replace(search,replace),search,replace);
    }
    return str;
  }

}
