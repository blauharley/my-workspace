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
    ALL : '/angularjs/my-workspace/server/get_todos.php'
  };

  tableHead: string[] = ['Priority', 'Date', 'Name'];

  todos: ToDo[] = [
    //new ToDo('Sigmatek', new Date(2019, 5, 15, 15, 30), TODO_STATUS_TYPES['LOW']),
    //new ToDo('Findologic', new Date(2019, 5, 23, 9, 30), TODO_STATUS_TYPES['HIGH']),
    //new ToDo('Pixelart', new Date(2019, 5, 17, 8, 0), TODO_STATUS_TYPES['HIGH'])
  ];

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.http.get(this.REST_URLS['ALL']).subscribe((data: Array<object>) => {
      console.log(data);
      data.forEach((todoData) => {
        this.todos.push(new ToDo(todoData['name'], new Date(todoData['date']*1000), todoData['priority']));
      });
    });
  }

  changeToDo(todo: ToDo, propertyName: string, value: any) {
    switch (propertyName) {
      case 'name':
        todo.setName(value);
        break;
      case 'date':
        todo.setDate(value);
        break;
      case 'priority':
        todo.setPriority(value);
        break;
      default:
        throw new Error('property for todo not found: ' + propertyName);
    }
  }

}
