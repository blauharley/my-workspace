import { Component, OnInit } from '@angular/core';
import {ToDo} from '../to-do';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title: string = 'Your ToDo Table...';
  tableHead: string[] = ['Priority', 'Date', 'Name'];

  todos: ToDo[] = [
    new ToDo('Sigmatek', new Date(2019, 5, 15, 15, 30), 'high')
  ];

  constructor() {

  }

  ngOnInit() {
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
