import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MyRegEx} from '../../../dataobjects/MyRegEx';
import {RegExTranslatorService} from '../../../../../projects/use-your-own-reg-ex/src/services/reg-ex-translator.service';
declare let $;

/*
Letters => A
Numbers => 1
Slash => /
Backslash => \
Comma => -
 */
@Component({
  selector: 'app-regex',
  templateUrl: './regex.component.html',
  styleUrls: ['./regex.component.scss']
})
export class RegexComponent implements OnInit {
  @Input() name: string = null;
  @Output() close: EventEmitter<any> = new EventEmitter();

  currentRegEx: MyRegEx = new MyRegEx();

  constructor(private regexpService: RegExTranslatorService) { }

  ngOnInit() {
    this.currentRegEx = new MyRegEx();
  }

  closeModal(saveToDo: boolean=false){
    $('#'+this.name).modal('hide');
    if(saveToDo){
      this.currentRegEx.value.pure = this.regexpService.translateToMaschineExp(this.currentRegEx.value.searchable);
    }
    let clone: MyRegEx = Object.assign( Object.create( Object.getPrototypeOf(this.currentRegEx)), this.currentRegEx);
    this.close.emit({save: saveToDo, data: clone});
    this.currentRegEx = new MyRegEx();
  }

}
