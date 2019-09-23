import Cat from './cat.model';

export default class CatState {
  cats: Array<Cat>;
  catError: Error;
  isLoaded: false;
}

export const initializeState = () => {
  return { cats: Array<Cat>() };
};
