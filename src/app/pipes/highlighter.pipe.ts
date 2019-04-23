import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'highlighter'
})
export class HighlighterPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer=null){

  }

  getWrapperTag(){
    return "<span style=\"background:#F60;display:inline-block;color:#FFF;\">#VALUE#</span>";
  }

  transform(htmlContent: any, term?: any): any {
    if(!term){
      return htmlContent;
    }
    let spanTag = this.getWrapperTag();
    htmlContent = htmlContent.split('').map(function(sign,index){
      if(sign===term[index] || (/^[0-9]$/.test(sign) && /^[0-9]$/.test(term[index]))) {
        return spanTag.replace('#VALUE#',sign);
      }
      return sign;
    }).join('');
    if(this.sanitizer){
      return this.sanitizer.bypassSecurityTrustHtml(htmlContent);
    }
    return htmlContent;
  }

}
