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

  /*
    todo
   */
  getHumExpCombinations(userString: string): Array<string>{
    let result: Array<string> =  [];
    let number: Array<string> = userString.match(/d[{]\d+[,](\d+)[}]/);
    let letter: Array<string> = userString.match(/w[{]\d+[,](\w+)[}]/);
    let placeholders = userString.replace(number[0],'number').replace(letter[0],'letter');
    let maxNumber: number = +number[1];
    let maxLetter: number = +letter[1];
    for(let numberIndex=0; numberIndex < maxNumber; numberIndex++){
      for(let letterIndex=0; letterIndex < maxLetter; letterIndex++){
        result.push(
            placeholders
                .replace('number',(new Array(numberIndex+1)).fill('N').join(''))
                .replace('letter',(new Array(letterIndex+1)).fill('L').join(''))
        )
      }
    }
    return result;
  }

}
