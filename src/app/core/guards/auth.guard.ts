import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from '@core/authentication/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private authServ: AuthService, private router: Router) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    /* This is a guard that checks if the user is logged in. If not, it redirects to the login page. */
    if (!this.authServ.isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
