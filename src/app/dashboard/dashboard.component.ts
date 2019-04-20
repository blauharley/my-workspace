import {Component, OnInit} from '@angular/core';
import {ToDo} from '../to-do';
import * as $ from "jquery";
import {HttpClient, HttpParams} from '@angular/common/http';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import {assertNumber} from '@angular/core/src/render3/assert';

let moveInAnimationDelay = 1.5;
let moveOutAnimationDelay = 0.5;
let maxRowOffsetLeft: number = -1500;

@Component({
  selector: 'app-dashboard',
  animations: [
    trigger('moveRowIn', [
      state('out', style({})),
      state('in', style({
        left: '0px'
      })),
      transition('out => in', [
        animate(moveInAnimationDelay+'s')
      ])
    ]),
    trigger('moveRowOut', [
      state('out', style({
        left: maxRowOffsetLeft+'px'
      })),
      state('in', style({})),
      transition('in => out', [
        animate(moveOutAnimationDelay+'s')
      ])
    ])
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  REST_BASE_URL: string = '/angularjs/my-workspace/server/%s.php';

  REST_URLS: object = {
    ALL : this.REST_BASE_URL.replace('%s','get_todos'),
    ADD: this.REST_BASE_URL.replace('%s','add_todo'),
    EDIT: this.REST_BASE_URL.replace('%s','edit_todo'),
    DELETE: this.REST_BASE_URL.replace('%s','delete_todo')
  };
  tableHead: Array<object> = [{label:'Date', col:4}, {label:'Name', col:8}];
  newToDo: ToDo = new ToDo({date: new Date()});
  todos: ToDo[] = [];

  mouseDownStartPosX: number = null;
  mouseDownTime: number = null;
  maxMoveDownTime: number = 1500;

  moveInAnimationFinish: boolean = false;

  addModalId: string = 'addToDo';
  addToDoModeOn: boolean = false;
  deleteModeOn: boolean = false;

  naviSearchText: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get(this.REST_URLS['ALL']).subscribe((data: Array<object>) => {
      data.forEach((todoData) => {
        todoData['date'] = new Date(todoData['date']*1000);
        this.todos.push(new ToDo(todoData));
        setTimeout(() => {
          this.startSetupAnimation(100);
        }, 1000);
      });
    });
  }

  changeToDo(todo: ToDo, propertyName: string, value: any) {
    switch (propertyName) {
      case 'name':
        todo.setName(value);
        break;
      case 'date':
        let dateParam = value.split("-");
        todo.setDate(new Date(dateParam[0],(+dateParam[1])-1,dateParam[2]));
        break;
      case 'priority':
        todo.setPriority(value);
        break;
      default:
        throw new Error('property for todo not found: ' + propertyName);
    }
    this.http.put(this.REST_URLS['EDIT'], todo.toJSON()).subscribe((data: Array<object>) => {

    });
  }

  onMouseDown(e) {
    this.mouseDownStartPosX = e.pageX;
    this.mouseDownTime = (new Date()).getTime();
  }

  onMouseUp(e: MouseEvent, movedTodo: ToDo) {
    let moveUpTime: number = (new Date()).getTime();
    if(this.mouseDownStartPosX > e.pageX && (moveUpTime - this.mouseDownTime) <= this.maxMoveDownTime){
      movedTodo.setMoveState('out');
      setTimeout(() => {
        this.todos = this.todos.filter((todo)=>{
          return movedTodo!==todo;
        });
        this.http
            .request('delete', this.REST_URLS['DELETE'], { body: movedTodo.toJSON() })
            .subscribe((data: Array<object>)=>{

        });
      },moveOutAnimationDelay*1000);
    }
  }

  onMouseOut(e: MouseEvent){
    this.mouseDownStartPosX = 0;
  }

  onCloseModal(e: any){
    if(e.save) {
      let params = '';
      let json = this.newToDo.toJSON();
      for(let paramName in json){
        if(params.length){
          params += '&';
        }
        params += paramName + '=' + json[paramName];
      }
      this.http.post(this.REST_URLS['ADD'], params, {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}).subscribe((data: any) => {
        if(data.success){
          this.newToDo = new ToDo({
            id: data.id,
            name: this.newToDo.getName(),
            date: this.newToDo.getDate(),
            priority: this.newToDo.getPriority()
          });
          this.todos.push(this.newToDo);

          setTimeout(()=>{
            this.applyMoveInAnimationOntoRow(this.newToDo);
            setTimeout(()=>{
              this.newToDo = new ToDo();
            },moveInAnimationDelay*1000)
          }, 0);
        }
      });
    }
    this.addToDoModeOn = false;
  }

  addToDo(){
    this.addToDoModeOn = true;
    this.deleteModeOn = false;
  }

  toggleDeleteMode(){
      this.deleteModeOn = !this.deleteModeOn;
      this.addToDoModeOn = false;
      if(this.deleteModeOn){
        $('.removeRowTrigger').show();
      }
      else{
        $('.removeRowTrigger').hide();
      }
  }

  private startSetupAnimation(delay: number=0){
    if(this.todos.length){
      let rows = document.getElementsByClassName('row-animation');
      for(let index=0; index < rows.length; index++){
        let row = rows[index];
        let itemOffset: number = 100;
        $(row).css('left', (maxRowOffsetLeft-index*itemOffset)+'px');
      }
      setTimeout(()=>{
        this.todos.forEach((todo: ToDo)=>{
          this.applyMoveInAnimationOntoRow(todo);
        });
        setTimeout(()=>{
          this.moveInAnimationFinish = true;
        },moveInAnimationDelay*1000);
      },delay);
    }
  }

  private applyMoveInAnimationOntoRow(todo: ToDo){
    if(todo){
      todo.setMoveState("in");
    }
  }

}
