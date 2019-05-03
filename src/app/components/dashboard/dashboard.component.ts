import {Component, OnInit} from '@angular/core';
import {ToDo} from '../../dataobjects/to-do';
import * as $ from "jquery";
import {HttpClient} from '@angular/common/http';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import {PageEvent} from '@angular/material';
import {ToDoGroup} from '../../dataobjects/to-do-group';

let moveInAnimationDelay = 1.5;
let moveOutAnimationDelay = 0.5;
let maxRowOffsetLeft: number = -1500;

let fadeAnimationDelay = 0.5;

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
    ]),
    trigger('fade', [
      state('out', style({
        opacity: '0'
      })),
      state('in', style({
        opacity: '1'
      })),
      transition('out => in', [
        animate(fadeAnimationDelay+'s')
      ]),
      transition('in => out', [
        animate('0s')
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
  todogroups: ToDoGroup[] = [];

  mouseDownStartPosX: number = null;
  mouseDownTime: number = null;
  maxMoveDownTime: number = 1500;

  moveInAnimationFinish: boolean = false;

  addModalId: string = 'addToDo';
  addToDoModeOn: boolean = false;
  deleteModeOn: boolean = false;

  naviSearchText: string = '';

  pageSize: number = 5;
  currentPage: number = 0;
  toDoCount: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get(this.REST_URLS['ALL']).subscribe((data: Array<object>) => {
      this.toDoCount = data.length;
      let group = new ToDoGroup();
      data.forEach((todoData, index) => {
        todoData['date'] = new Date(todoData['date']*1000);
        group.items.push(new ToDo(todoData));
        if((index+1)%this.pageSize===0 || (index+1) === data.length ){
          this.todogroups.push(group);
          group = new ToDoGroup();
        }
        setTimeout(() => {
          this.startSetupAnimation(100);
        }, 1000);
      });
    });
  }

  handlePageChange(e: PageEvent){
    this.currentPage = e.pageIndex;
    if(this.pageSize !== e.pageSize){
      this.pageSize = e.pageSize;
      this.reStructureToDoGroups();
    }
    console.log(this.currentPage);
    this.getCurrentToDoGroup().items.forEach((todo: ToDo)=>{
      todo.setMoveState("out");
    });
    this.moveInAnimationFinish = false;
    setTimeout(() => {
      this.startSetupAnimation(100);
    }, 1000);
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
        let currentGroup = this.getCurrentToDoGroup();
        currentGroup.items = currentGroup.items.filter((todo)=>{
          return movedTodo!==todo;
        });
        this.http
            .request('delete', this.REST_URLS['DELETE'], { body: movedTodo.toJSON() })
            .subscribe((data: Array<object>)=>{
              this.toDoCount--;
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
          let currentGroup = this.getCurrentToDoGroup();
          if(currentGroup.items.length===this.pageSize){
            let pushIntoLastGroup = this.todogroups[this.todogroups.length-1].items.length < this.pageSize;
            if(pushIntoLastGroup){
              currentGroup = this.todogroups[this.todogroups.length-1];
            }
            else{
              currentGroup = new ToDoGroup();
            }
            currentGroup.items.push(this.newToDo);
            if(!pushIntoLastGroup){
              this.todogroups.push(currentGroup);
            }
          }
          else{
            currentGroup.items.push(this.newToDo);
          }
          setTimeout(()=>{
            this.newToDo.setMoveState("in");
            this.toDoCount++;
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

  getCurrentToDoGroup(){
    return this.todogroups[this.currentPage] ? this.todogroups[this.currentPage] : new ToDoGroup();
  }

  reStructureToDoGroups(){
    let todos = this.todogroups.reduce((prevGroup: Array<ToDo>, currentGroup: ToDoGroup) => {
      return prevGroup.concat(currentGroup.items);
    }, []);
    let todogroups = [];
    let group = new ToDoGroup();
    for(let index=0; index < todos.length; index++){
      group.items.push(todos[index]);
      if((index+1) % this.pageSize === 0 || (index+1) === todos.length){
        todogroups.push(group);
        group = new ToDoGroup();
      }
    }
    this.todogroups = todogroups;
  }

  private startSetupAnimation(delay: number=0){
    if(this.todogroups.length){
      let rows = document.getElementsByClassName('row-animation');
      for(let index=0; index < rows.length; index++){
        let row = rows[index];
        let itemOffset: number = 100;
        $(row).css('left', (maxRowOffsetLeft-index*itemOffset)+'px');
      }
      setTimeout(()=>{
        this.getCurrentToDoGroup().items.forEach((todo: ToDo)=>{
          todo.setMoveState("in");
        });
        setTimeout(()=>{
          this.moveInAnimationFinish = true;
        },moveInAnimationDelay*1000);
      },delay);
    }
  }

}
