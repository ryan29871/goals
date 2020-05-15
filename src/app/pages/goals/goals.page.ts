import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { NavController, MenuController } from '@ionic/angular';

import { from, of, forkJoin, Observable } from 'rxjs';
import { delay, flatMap, share, tap } from 'rxjs/operators';

import { AuthService } from '../auth/services/auth.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.page.html',
  styleUrls: ['./goals.page.scss'],
})
export class GoalsPage implements OnInit {

  @ViewChild('myNavigationMenu', { static: false }) navigationMenu: NavController;

  isAuthenticated$: Observable<any>;

  constructor(
    private menuController: MenuController,
    private navController: NavController,
    private router: Router,
    private authService: AuthService,
    private uiService: UiService
  ) { }

  ngOnInit() {
    this.isAuthenticated$ = this.authService.isAuthenticated$.pipe(
      share()
    );
  }

  load(page: string) {
    console.log('Page', page);
    this.navController.navigateRoot(page);
    this.menuController.close();
  }

  logout() {
    const loading$ = from(this.uiService.showLoading('Logging out...'));
    const delay$ = of('delay complete').pipe(delay(1000));
    const request$ = from(this.authService.logout());
    loading$
      .pipe(
        flatMap(() => {
          return forkJoin([delay$, request$]);
        })
      )
      .subscribe(
        async () => {
          this.uiService.dismissLoading();
          await this.menuController.close();
          this.uiService.showToast(`Logged out successfully`, 2000, 'bottom');
          this.router.navigate(['/auth/signin'], { replaceUrl: true })
        },
        error => {
          this.uiService.dismissLoading();
          this.uiService.showAlert('Logout Failed!', error);
        }
      );
  }

}
