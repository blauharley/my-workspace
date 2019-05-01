import {Component, EventEmitter, OnInit} from '@angular/core';
import {MyRegEx} from '../../../dataobjects/MyRegEx';
import {RegExTranslatorService} from '../../../../../projects/use-your-own-reg-ex/src/services/reg-ex-translator.service';
import {JqueryNofifierService} from '../../../services/jquery-nofifier.service';
import {ActivatedRoute} from '@angular/router';
import {MessengerService} from '../../../services/messenger.service';

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
  name: string = null;

  currentRegEx: MyRegEx = new MyRegEx();

  constructor(private regexpService: RegExTranslatorService, private route: ActivatedRoute, private messenger: MessengerService) {
    let notifier: JqueryNofifierService = new JqueryNofifierService();
    this.route.paramMap.subscribe((data: any)=>{
      this.name = data.params.name;
      notifier.doesExist('#'+this.name);
    });
    notifier.isJqueryLoaded.asObservable().subscribe((isthere) => {
      if(isthere){
        $('#'+this.name).modal('show');
      }
    });
  }

  ngOnInit() {
    this.currentRegEx = new MyRegEx();
    console.log('init');
  }

  closeModal(saveToDo: boolean=false){
    $('#'+this.name).modal('hide');
    if(saveToDo){
      console.log(this.currentRegEx.value.searchable);
      this.currentRegEx.value.pure = this.regexpService.translateToMaschineExp(this.currentRegEx.value.searchable);
    }
    let clone: MyRegEx = Object.assign( Object.create( Object.getPrototypeOf(this.currentRegEx)), this.currentRegEx);
    this.messenger.setMessage({save: saveToDo, data: clone});
    this.currentRegEx = new MyRegEx();
  }

}
