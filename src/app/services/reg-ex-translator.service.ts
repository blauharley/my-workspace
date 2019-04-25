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
    let placeholder = this.getPlaceholderUserString(userString);
    let recursion = (userString: string, iterationInfos: Array<{currentIteration: number, count: number, foundExp: string, transformedString: string, placeholderName: string, placeholderFinalName: string}> = null) => {
      let regexpInfo: {currentIteration: number, count: number, foundExp: string, transformedString: string, placeholderName: string, placeholderFinalName: string} = this.getNumberRegExpInfo(userString);
      if(regexpInfo.count===0){
        let first = iterationInfos[0];
        let second = iterationInfos[1];
        let third = iterationInfos[2];
        if(first && !second && !third){
          for(let index=0; index < first.count; index++){
            let tmpPlaceholder: string = placeholder;
            tmpPlaceholder = tmpPlaceholder
                .replace(first.placeholderName,(new Array(index+1)).fill(first.placeholderFinalName).join(''));
            result.push(tmpPlaceholder);
          }
        }
        if(first && second && !third){
          for(let index=0; index < first.count; index++){
            for(let index2=0; index2 < second.count; index2++){
              let tmpPlaceholder: string = placeholder;
              tmpPlaceholder = tmpPlaceholder
                  .replace(first.placeholderName,(new Array(index+1)).fill(first.placeholderFinalName).join(''))
                  .replace(second.placeholderName,(new Array(index2+1)).fill(second.placeholderFinalName).join(''));
              result.push(tmpPlaceholder);
            }
          }
        }
        else if(first && second && third){
          for(let index=0; index < first.count; index++){
            for(let index2=0; index2 < second.count; index2++){
              for(let index3=0; index3 < third.count; index3++) {
                let tmpPlaceholder: string = placeholder;
                tmpPlaceholder = tmpPlaceholder
                    .replace(first.placeholderName, (new Array(index + 1)).fill(first.placeholderFinalName).join(''))
                    .replace(second.placeholderName, (new Array(index2 + 1)).fill(second.placeholderFinalName).join(''))
                    .replace(third.placeholderName, (new Array(index3 + 1)).fill(third.placeholderFinalName).join(''));
                result.push(tmpPlaceholder);
              }
            }
          }
        }
      }
      else{
        iterationInfos.push(regexpInfo);
        recursion(userString.slice(regexpInfo.foundExp.length+1), iterationInfos);
      }
    };
    userString = this.replaceAll(userString,'[-]','');
    userString = this.replaceAll(userString,'[\\]','');
    userString = this.replaceAll(userString,'[/]','');
    recursion(userString, []);
    return result;
  }

  private getNumberRegExpInfo(userString: string): {currentIteration: number, count: number, foundExp: string, transformedString: string, placeholderName: string, placeholderFinalName: string} {
    let regexpInfo: Array<string> = userString.match(/[w|d][{]\d+[,](\d+)[}]/);
    if(regexpInfo){
      let placeHolderName = regexpInfo[0].indexOf('w')!==-1 ? 'LETTER' : 'NUMBER';
      let placeHolderNameFinal = placeHolderName === 'LETTER' ? 'L' : 'N';
      userString = userString.replace('\\'+regexpInfo[0], placeHolderName);
      return {
        currentIteration: 0,
        count: +regexpInfo[1],
        foundExp: regexpInfo[0],
        transformedString: userString,
        placeholderName: placeHolderName,
        placeholderFinalName: placeHolderNameFinal
      };
    }
    return {
      currentIteration: 0,
      count: 0,
      foundExp: '',
      transformedString: userString,
      placeholderName: '',
      placeholderFinalName: ''
    }
  }

  private getPlaceholderUserString(userString: string){
    let placeholder = userString;
    let foundExps = userString.match(/[w|d][{]\d+[,](\d+)[}]/g);
    (foundExps ? foundExps : []).forEach(function(foundExp){
      let isLetter = foundExp.indexOf("w") !== -1;
      placeholder = placeholder.replace('\\'+foundExp,isLetter ? 'LETTER' : 'NUMBER');
    });
    placeholder = this.replaceAll(placeholder,'[-]','-');
    placeholder = this.replaceAll(placeholder,'[\\]','\\');
    placeholder = this.replaceAll(placeholder,'[/]','/');
    return placeholder;
  }

  private replaceAll(str: string, search: string, replace: string):string{
    if(str.indexOf(search)!==-1){
      return this.replaceAll(str.replace(search,replace),search,replace);
    }
    return str;
  }

}
