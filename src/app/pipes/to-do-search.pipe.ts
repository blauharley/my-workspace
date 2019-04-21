import { Pipe, PipeTransform } from '@angular/core';
import {ToDo} from '../dataobjects/to-do';

@Pipe({
  name: 'toDoSearch'
})
export class ToDoSearchPipe implements PipeTransform {

  transform(todos: ToDo[], args?: string): any {
    if(args.length===0){
      return todos;
    }
    return todos.filter((todo)=>{
      return todo.getName().toLowerCase().indexOf(args.toLowerCase()) !== -1;
    });
  }

}
