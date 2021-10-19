import {Injectable, OnInit} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {isLoggedIn} from './auth.selectors';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private store: Store<AppState>,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log(`Inside canActivate.`);

    return this.store.pipe(
      select(isLoggedIn),
      tap(isLoggedIn => {
        if (!isLoggedIn) {
          this.router.navigateByUrl('/');
        }
      })
    )


  }

}
