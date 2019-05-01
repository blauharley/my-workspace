import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
declare let window;

@Injectable({
  providedIn: 'root'
})
export class JqueryNofifierService {

  isJqueryLoaded: Subject<boolean> = new Subject<boolean>();

  constructor() {}

  private checkJqueryLib(elementName: string): boolean{
    return !!window.$ && $(elementName).length > 0;
  }

  public doesExist(elementName: string){
    let interval = setInterval( () => {
      if(this.checkJqueryLib(elementName)){
        this.isJqueryLoaded.next(true);
        clearInterval(interval);
      }
    },100);
  }

}
