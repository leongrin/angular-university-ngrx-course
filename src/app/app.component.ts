import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {distinctUntilChanged, map} from 'rxjs/operators';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {AppState} from './reducers';
import {isLoggedIn, isLoggedOut} from './auth/auth.selectors';
import {AuthActions} from './auth/action-types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loading = true;

  iLoggedIn$: Observable<boolean>;

  iLoggedOut$: Observable<boolean>;

  constructor(private router: Router,
              private store: Store<AppState>) {

  }

  ngOnInit() {

    this.iLoggedIn$ = this.store.pipe(
      select(isLoggedIn)
    );

    this.iLoggedOut$ = this.store.pipe(
      select(isLoggedOut)
    );

    /*this.iLoggedOut$ = this.store.pipe(
      map(state => !state['auth'].user),
      distinctUntilChanged()
    );*/

    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });

  }

  logout() {
    console.log('Logging out...');
    this.store.dispatch(AuthActions.logout({user: null}));
  }

}
