import { Component, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { IonContent } from '@ionic/angular';

import { forkJoin, from, of, Observable } from 'rxjs';
import { delay, flatMap, first } from 'rxjs/operators';

import { GoalsService } from '../../services/goals.service';
import { UiService } from 'src/app/services/ui.service';

import { Goal } from '../../interfaces/goal.interface';

import { GoalStatus } from '../../enums/goal-status.enum';

@Component({
  selector: 'app-goal-edit',
  templateUrl: './goal-edit.component.html',
  styleUrls: ['./goal-edit.component.scss'],
})
export class GoalEditComponent implements OnInit {

  @Output() submit: EventEmitter<any>;
  @ViewChild(IonContent, { static: false }) content: IonContent;

  form: FormGroup;
  goal: Goal;
  private id: string;
  // state$: Observable<object>;
  statuses = GoalStatus;
  statusKeys: any[];
  submitAttempt: boolean;
  title$: Observable<string>;

  get isValid() {
    if (this.form.valid) {
      return true;
    }
    return false;
  }

  constructor(
    public activatedRoute: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder,
    public goalsService: GoalsService,
    private uiService: UiService,
  ) {
    this.goalsService.updateTitle('Update Goal');
    this.title$ = this.goalsService.title$;
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.statusKeys = Object.keys(this.statuses).filter(String);

    this.submitAttempt = false;


    // // Problem is this only exist when navigating to from list
    // this.state$ = this.activatedRoute.paramMap
    //   .pipe(map(() => window.history.state))
    // this.state$.pipe(
    //   tap(data => {
    //     console.log(data);
    //   })
    // )

    // This one is useful in top level components, because you cannot listen to the NavigationStart event from inside the component that you are navigating to.
    // this.state$ =  this.router.events.pipe(
    //   filter(e => e instanceof NavigationStart),
    //   map(() => this.router.getCurrentNavigation().extras.state)
    // )
  }

  ngOnInit() {
    this.createForm();
    this.goalsService.getGoal(this.id)
      .pipe(first())
      .subscribe(
        goal => {
          this.goal = goal;
          this.setupForm();
        },
        error => {
          console.log(error);
        });
  }

  private createForm() {
    this.form = this.formBuilder.group({
      status: [null, Validators.required]
    });
  }

  private setupForm() {
    if (this.goal.status) {
      this.form.get('status').setValue(this.goal.status);
    }
  }

  save() {
    console.log(this.form.value);
    this.submitAttempt = true;
    const goal: Goal = {
      id: this.goal.id,
      status: this.form.value.status
    }
    const loading$ = from(this.uiService.showLoading('Updating goal...'));
    const delay$ = of('delay').pipe(delay(1000));
    const request$ = this.goalsService.updateGoal(goal);
    loading$
      .pipe(
        flatMap(() => {
          return forkJoin([delay$, request$]);
        })
      )
      .subscribe(
        async data => {
          console.log(data);
          this.uiService.dismissLoading();
          this.uiService.showToast(`Success!, ${this.form.value.title$} updated`, 2000, 'bottom');
          this.goalsService.getGoals();
          this.router.navigate(['goals/list'], { replaceUrl: true })
        },
        error => {
          this.uiService.dismissLoading();
          this.uiService.showAlert('Update Goal Failed!', error.error.message);
        }
      );
  }

}
