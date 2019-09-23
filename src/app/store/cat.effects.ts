import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import * as CatActions from './cat.action';
import { Observable, of } from 'rxjs';
import Cat from './cat.model';

@Injectable()
export class CatEffects {
  constructor(private action$: Actions, private apiService: ApiService) {}

  GetCats$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(CatActions.BeginGetCatsAction),
      mergeMap(action =>
        this.apiService.getBreeds().pipe(
          map((data: Cat[]) => {
            //data = []; // little hack to test an empty response from the API
            return CatActions.SuccessGetCatsAction({ payload: data });
          }),
          catchError((error: Error) => {
            return of(CatActions.ErrorCatAction(error));
          })
        )
      )
    )
  );
}
