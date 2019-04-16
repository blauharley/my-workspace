import { Component, OnInit } from '@angular/core';
import {ToDo} from '../to-do';
import { ToDoStatus, TODO_STATUS_TYPES } from '../to-do-status';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
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

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.http.get(this.REST_URLS['ALL']).subscribe((data: Array<object>) => {
      console.log(data);
      data.forEach((todoData) => {
        todoData['date'] = new Date(todoData['date']*1000);
        this.todos.push(new ToDo(todoData));
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
        console.log(dateParam);
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

}
