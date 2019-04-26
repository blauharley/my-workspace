import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {RegExTranslatorService} from '../services/reg-ex-translator.service';

@Pipe({
  name: 'regExpHighlighter'
})
export class RegExpHighlighter implements PipeTransform {

  service: RegExTranslatorService = new RegExTranslatorService();

  constructor(private sanitizer: DomSanitizer=null){}

  getWrapperTagStart(){
    return "<span style=\"background:#F60;display:inline-block;color:#FFF;\">";
  }

  getWrapperTagEnd(){
    return "</span>";
  }

  transform(htmlContent: string, term?: any): any {
    if(!term){
      return htmlContent;
    }
    let humReadableTerm: string = this.service.translateToNormalizedExp(term);
    let maschineTranslatedTerm: string = this.service.translateToMaschineExp(humReadableTerm);
    let comboFound = this.service.getHumanExpCombinations(maschineTranslatedTerm).filter( (combo) => {
      return combo === humReadableTerm;
    });
    if(comboFound.length){
      htmlContent =
          this.getWrapperTagStart() + htmlContent.slice(0, maschineTranslatedTerm.length) + this.getWrapperTagEnd() +
          htmlContent.slice(maschineTranslatedTerm.length)
    }
    if(this.sanitizer){
      return this.sanitizer.bypassSecurityTrustHtml(htmlContent);
    }
    return htmlContent;
  }

}
