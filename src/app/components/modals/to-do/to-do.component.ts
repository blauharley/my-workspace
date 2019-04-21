import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ToDo} from '../../../dataobjects/to-do';
declare var $ :any;

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnInit {
  @Input() name: string;
  @Input() newToDo: ToDo;
  @Output() close: EventEmitter<any> = new EventEmitter();

  originalToDo: ToDo = null;

  constructor() { }

  ngOnInit() {
    let originalData: any = this.newToDo.toJSON();
    let date = new Date();
    date.setTime(originalData.date);
    this.originalToDo = new ToDo({name: originalData.name, priority: originalData.priority, date: date});
  }

  changeDate(date: string){
    let dateParam: Array<any> = date.split("-");
    this.newToDo.setDate(new Date(dateParam[0],(+dateParam[1])-1,dateParam[2]));
  }

  closeModal(saveToDo: boolean=false){
    if(!saveToDo){
      this.newToDo = this.originalToDo;
    }
    $('#'+this.name).modal('hide');
    this.close.emit({save: saveToDo, data: this.newToDo});
  }

}
