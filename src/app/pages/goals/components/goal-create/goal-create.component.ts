import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { IonContent } from '@ionic/angular';

import { forkJoin, from, of, Observable } from 'rxjs';
import { delay, flatMap } from 'rxjs/operators';

import { GoalsService } from '../../services/goals.service';
import { FieldControlService } from 'src/app/components/form-module/services/field-control.service';
import { UiService } from 'src/app/services/ui.service';

import { DynamicFormComponent } from 'src/app/components/form-module/dynamic-form/dynamic-form.component';

import { Goal } from '../../interfaces/goal.interface';

@Component({
  selector: 'app-goal-create',
  templateUrl: './goal-create.component.html',
  styleUrls: ['./goal-create.component.scss'],
})
export class GoalCreateComponent {

  @Output() submit: EventEmitter<any>;
  @ViewChild(DynamicFormComponent, { static: false }) formValues: DynamicFormComponent;
  @ViewChild(IonContent, { static: false }) content: IonContent;

  fields: Array<any>;
  form: FormGroup;
  submitAttempt: boolean;
  title$: Observable<string>;

  get isValid() {
    if (this.form.valid) {
      return true;
    }
    return false;
  }

  constructor(
    private router: Router,
    private goalsService: GoalsService,
    private fieldControlService: FieldControlService,
    private uiService: UiService,
  ) {
    this.goalsService.updateTitle('Create Goal');
    this.title$ = this.goalsService.title$;
    this.submitAttempt = false;
    this.fields = goalsService.createGoalFields;
    this.form = this.fieldControlService.toFormGroup(this.fields);
  }

  onCreate() {
    console.log(this.form.value);
    this.submitAttempt = true;
    if (!this.isValid) {
      return;
    }
    this.onSubmit(this.form.value);
  }

  onSubmit(formValues: any) {
    console.log(formValues);
    const goal: Goal = {
      title: formValues.title,
      description: formValues.description
    }
    const loading$ = from(this.uiService.showLoading('Creating goal...'));
    const delay$ = of('delay').pipe(delay(1000));
    const request$ = this.goalsService.createGoal(goal);
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
          this.uiService.showToast(`Success!, ${formValues.title} created`, 2000, 'bottom');
          this.router.navigate(['goals/list'], { replaceUrl: true })
        },
        error => {
          this.uiService.dismissLoading();
          this.uiService.showAlert('Create Goal Failed!', error.error.message);
        }
      );
  }

}
