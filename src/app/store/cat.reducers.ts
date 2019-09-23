import { Action, createReducer, on, createFeatureSelector, createSelector, State } from '@ngrx/store';
import * as CatActions from './cat.action';
import CatState, { initializeState } from './cat.state';

export const intialState = initializeState();

const reducer = createReducer(
  intialState,
  on(CatActions.GetCatsAction, state => state),
  on(CatActions.SuccessGetCatsAction, (state: CatState, { payload }) => {
    return { ...state, cats: payload, isLoaded: true };
  }),
  on(CatActions.ErrorCatAction, (state: CatState, error: Error) => {
    console.log(error);
    return { ...state, CatError: error };
  })
);

export function CatReducer(state: CatState | undefined, action: Action) {
  return reducer(state, action);
}
