import {Component, OnInit} from '@angular/core';
import {ToDo} from '../to-do';
import * as $ from "jquery";
import {HttpClient} from '@angular/common/http';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

let MoveOutAnimationDelay = 0.5;

@Component({
  selector: 'app-dashboard',
  animations: [
    trigger('moveRowIn', [
      state('out', style({})),
      state('in', style({
        left: '0px'
      })),
      transition('out => in', [
        animate('3s')
      ])
    ]),
    trigger('moveRowOut', [
      state('out', style({
        left: '-1500px'
      })),
      state('in', style({})),
      transition('in => out', [
        animate(MoveOutAnimationDelay+'s')
      ])
    ])
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  REST_URLS: object = {
    ALL : '/angularjs/my-workspace/server/get_todos.php',
    EDIT: '/angularjs/my-workspace/server/edit_todo.php'
  };
  tableHead: string[] = ['Priority', 'Date', 'Name'];
  todos: ToDo[] = [];

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
        todo.setDate(new Date(dateParam[0],dateParam[1],dateParam[2]));
        break;
      case 'priority':
        todo.setPriority(value);
        break;
      default:
        throw new Error('property for todo not found: ' + propertyName);
    }
    this.http.put(this.REST_URLS['EDIT'], todo.toJSON()).subscribe((data: Array<object>) => {
      console.log(data);
    });
  }

  startPosX: number = null;

  onMouseDown(e) {
    this.startPosX = e.pageX;
  }

  onMouseUp(e: MouseEvent, movedTodo: ToDo) {
    if(this.startPosX > e.pageX){
      movedTodo.setMoveState('out');
      setTimeout(() => {
        this.todos = this.todos.filter((todo)=>{
          return movedTodo!==todo;
        });
      },MoveOutAnimationDelay*1000);
    }
  }

  private startSetupAnimation(delay: number=0){
    if(this.todos.length){
      let rows = document.getElementsByClassName('row-animation');
      for(let index=0; index < rows.length; index++){
        let row = rows[index];
        $(row).css('left', (-1500-index*50)+'px');
      }
      setTimeout(()=>{
        this.todos.forEach((todo: ToDo)=>{
          this.applyMoveInAnimationOntoRow(todo);
        });
      },delay);
    }
  }

  private applyMoveInAnimationOntoRow(todo: ToDo){
    if(todo){
      todo.setMoveState("in");
    }
  }

}
