import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ActionSheetController, MenuController } from '@ionic/angular';

import { Observable, Subject, Subscription, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, startWith } from 'rxjs/operators';

import { debug } from 'src/app/services/debug.service';
import { GoalsService } from '../../services/goals.service';
import { UiService } from 'src/app/services/ui.service';

import { Goal } from '../../interfaces/goal.interface';

import { RxJsLoggingLevel } from 'src/app/enums/rxJsLoggingLevel.enum';

@Component({
  selector: 'app-goal-list',
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.scss'],
})
export class GoalListComponent implements OnInit, OnDestroy {

  @ViewChild('goalsList', {static: false}) goalsList;
  @ViewChild('refresherRef', {static: false}) refresherRef;
  @ViewChild('slidingGoal', {static: false}) slidingGoal;

  private fbSubs: Subscription[] = [];
  goalsExist$: Observable<boolean> = of(true);
  goals$: Observable<Goal[]> = of(null);

  private searchTerms = new Subject<string>();

  constructor(
    private actionSheetController: ActionSheetController,
    private menuController: MenuController,
    private router: Router,
    private goalsService: GoalsService,
    private uiService: UiService,
  ) { }

  ngOnInit() {
    this.goalsService.getGoals();
    this.goals$ = this.goalsService.goals$;
    this.goals$ = this.searchTerms.pipe(
      debug(RxJsLoggingLevel.INFO, 'Goal search'),
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.goalsService.searchGoals(term)),
    );
  }

  ngOnDestroy() {
    this.goalsList.closeSlidingItems();
    this.refresherRef.complete();
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  async createGoal() {
    await this.goalsList.closeSlidingItems();
    this.router.navigateByUrl('goals/create');
  }

  async doRefresh(event) {
    this.goalsList.closeSlidingItems();
    this.goalsService.getGoals();
    event.target.complete()
  }

  async editGoal(goal: Goal, slidingGoal) {
    await this.goalsList.closeSlidingItems();
    console.log(goal);
    this.router.navigateByUrl(`goals/edit/${goal.id}/status`, { state: goal });
  }

  async openMenu() {
    this.goalsList.closeSlidingItems();
    const menu = await this.menuController.get('appMenu');
    menu.toggle();
  }

  async deleteGoal(goal: Goal, slidingGoal) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Delete Goal',
      subHeader: 'Are you sure you want to delete this goal?',
      buttons: [
        {
          text: 'Confirm',
          role: 'destructive',
          handler: () => {
            slidingGoal.close();
            this.goalsService.deleteGoal(goal).subscribe(
              () => {
                console.log('Goal deleted');
                this.goalsService.getGoals();
              },
              async error => {
                this.uiService.showAlert('Goal Delete Failed!', error);
              }
            );
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            slidingGoal.close();
          }
        }
      ],
      backdropDismiss: true
    });
    await actionSheet.present();
  }

  searchGoals(event: any): void {
    this.searchTerms.next(event.target.value);
  }

}
