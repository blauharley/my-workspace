import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import {EMPTY, of} from 'rxjs';
import {map, switchMap, catchError, mergeMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {ToDoGroup} from '../dataobjects/to-do-group';
import {ToDo} from '../dataobjects/to-do';


@Injectable({
  providedIn: 'root'
})
export class ToDoEffectService {

    REST_BASE_URL: string = '/angularjs/my-workspace/server/%s.php';

    REST_URLS: object = {
        ALL : this.REST_BASE_URL.replace('%s','get_todos'),
        ADD: this.REST_BASE_URL.replace('%s','add_todo'),
        EDIT: this.REST_BASE_URL.replace('%s','edit_todo'),
        DELETE: this.REST_BASE_URL.replace('%s','delete_todo')
    };

    @Effect()
    loadToDos$ = this.actions$
        .pipe(
            ofType('Load My ToDo-Groups'),
            mergeMap(() => this.http.get(this.REST_BASE_URL['ALL']).pipe(
                map((data: Array<object>) => {
                    let groups = [];
                    let group = new ToDoGroup();
                    data.forEach((todoData, index) => {
                        todoData['date'] = new Date(todoData['date']*1000);
                        group.items.push(new ToDo(todoData));
                        if((index+1)%5===0 || (index+1) === data.length ){
                            groups.push(group);
                            group = new ToDoGroup();
                        }

                    });
                    console.log(groups[0]);
                    return groups[0];
                }),
                catchError(() => EMPTY)
            ))
        );

    constructor(
        private actions$: Actions,
        private http: HttpClient
    ) {}

}
