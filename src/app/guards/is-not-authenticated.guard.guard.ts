import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../pages/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsNotAuthenticatedGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuthenticated$.pipe(
      map(isAuthenticated => {
        console.log(isAuthenticated);
        if (isAuthenticated) {
          this.router.navigate(['/goals'], { replaceUrl: true });
        }
        return true;
      })
    );
  }

}
