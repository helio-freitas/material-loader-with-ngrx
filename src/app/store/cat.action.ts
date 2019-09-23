import { createAction, props } from '@ngrx/store';
import Cat from './cat.model';

export const GetCatsAction = createAction('[Cat] - Get Cats');

export const BeginGetCatsAction = createAction('[Cat] - Begin Get Cats');

export const SuccessGetCatsAction = createAction(
  '[Cat] - Success Get Cats',
  props<{ payload: Cat[] }>()
);

export const ErrorCatAction = createAction('[Cat] - Error', props<Error>());
