import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authservice: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.authservice.user.pipe(
      take(1), // take is very imp here, we want our guard listen to user only once i.e when the user try to access a route without login
      map((user) => {
        const isAuth = !!user; // !!=> converts a truthy value(like a object here) i.e not null or undefined to a real boolean
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/auth']); // all this logic, the whole guard will run only once bcoz of take operator
      })
      //   tap((isAuth) => {
      //     if (!isAuth) {
      //       this.router.navigate(['/auth']);
      //     }
      //   })
    );
  }
}
