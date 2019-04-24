import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MyRegExValue} from '../dataobjects/MyRegEx';
import {RegExTranslatorService} from '../services/reg-ex-translator.service';

@Pipe({
  name: 'highlighter'
})
export class HighlighterPipe implements PipeTransform {

  constructor(private service: RegExTranslatorService=null, private sanitizer: DomSanitizer=null){

  }

  getWrapperTagStart(){
    return "<span style=\"background:#F60;display:inline-block;color:#FFF;\">";
  }

  getWrapperTagEnd(){
    return "</span>";
  }

  transform(regexpValue: MyRegExValue, term?: any): any {
    let htmlContent: string = regexpValue.pure;
    if(!term){
      return htmlContent;
    }
    let maschineTranslatedTerm: string = this.service.translateToMaschineExp(term);
    let searchMaschineTranslatedTerm = maschineTranslatedTerm.slice(0, maschineTranslatedTerm.length-2);
    if(regexpValue.pure.indexOf(searchMaschineTranslatedTerm) !== -1){
      htmlContent =
          this.getWrapperTagStart() + regexpValue.pure.slice(0, maschineTranslatedTerm.length) + this.getWrapperTagEnd() +
          regexpValue.pure.slice(maschineTranslatedTerm.length)
    }
    if(this.sanitizer){
      return this.sanitizer.bypassSecurityTrustHtml(htmlContent);
    }
    return htmlContent;
  }

}