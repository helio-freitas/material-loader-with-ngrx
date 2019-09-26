import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import Cat from './store/cat.model';
import CatState from './store/cat.state';
import * as CatActions from './store/cat.action';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  emptyListimg =
    'https://img.freepik.com/free-photo/pretty-cat-white-banner_122935-76.jpg?size=626&ext=jpg';
  dataSource: MatTableDataSource<Cat>;
  cat$: Observable<CatState>;
  catSubscription: Subscription;
  catList: Cat[];
  catError: Error;
  displayedColumns: string[] = [
    'name',
    'origin',
    'temperament',
    'life_span',
    'alt_names'
  ];
  isCatListLoaded = false;

  constructor(private store: Store<CatState>) {
    this.cat$ = store.pipe(select('cats'));
  }

  ngOnInit() {
    this.catSubscription = this.cat$
      .pipe(
        map((catState: CatState) => {
          this.catList = catState.cats;
          this.catError = catState.catError;
          this.isCatListLoaded = catState.isLoaded;
          this.dataSource = new MatTableDataSource(this.catList);
          this.dataSource.paginator = this.paginator;
        })
      )
      .subscribe();
    this.store.dispatch(CatActions.BeginGetCatsAction());
  }

  isDataSourceEmpty(): boolean {
    return this.dataSource && this.dataSource.data.length === 0;
  }

  ngOnDestroy() {
    this.catSubscription.unsubscribe();
  }
}
