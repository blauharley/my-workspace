import { Pipe, PipeTransform } from '@angular/core';
import {ToDo} from './to-do';

@Pipe({
  name: 'toDoStatusPrio',
  pure: false
})
export class ToDoStatusPrioPipe implements PipeTransform {

  transform(todos: ToDo[], args?: any): any {
    return todos.sort((a: ToDo, b: ToDo) => {
      let res: number = b.getPriority() - a.getPriority();
      let proEqual: boolean = b.getPriority() === a. getPriority();
      if(proEqual){
        res = b.getDate().getTime() - a.getDate().getTime();
      }
      return res;
    });
  }

}
