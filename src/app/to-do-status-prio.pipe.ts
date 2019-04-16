import { Pipe, PipeTransform } from '@angular/core';
import {ToDo} from './to-do';

@Pipe({
  name: 'toDoStatusPrio',
  pure: false
})
export class ToDoStatusPrioPipe implements PipeTransform {

  transform(todos: ToDo[], args?: any): any {
    return todos.sort((a: ToDo, b: ToDo) => {
      return b.getPriority() - a. getPriority();
    });
  }

}
