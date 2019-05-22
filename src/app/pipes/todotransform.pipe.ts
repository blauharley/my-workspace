import { Pipe, PipeTransform } from '@angular/core';
import {ToDoGroup} from '../dataobjects/to-do-group';

@Pipe({
  name: 'todotransform'
})
export class TodotransformPipe implements PipeTransform {

  transform(todogroup: ToDoGroup, args?: any): any {
    return todogroup.items;
  }

}
