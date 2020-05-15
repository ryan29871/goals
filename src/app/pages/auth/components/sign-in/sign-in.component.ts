import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IonContent } from '@ionic/angular';
import { Router } from '@angular/router';

import { forkJoin, from, of } from 'rxjs';
import { delay, flatMap } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { FieldControlService } from 'src/app/components/form-module/services/field-control.service';
import { UiService } from 'src/app/services/ui.service';

import { DynamicFormComponent } from 'src/app/components/form-module/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {

  @Output() submit: EventEmitter<any>;
  @ViewChild(DynamicFormComponent, { static: false }) formValues: DynamicFormComponent;
  @ViewChild(IonContent, { static: false }) content: IonContent;

  fields: Array<any>;
  form: FormGroup;
  submitAttempt: boolean;

  get isValid() {
    if (this.form.valid) {
      return true;
    }
    return false;
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private fieldControlService: FieldControlService,
    private uiService: UiService,
  ) {
    this.authService.updateTitle('Sign In');
    this.submitAttempt = false;
    this.fields = authService.signInFields;
    this.form = this.fieldControlService.toFormGroup(this.fields);
  }

  onSignIn() {
    console.log(this.form.value);
    this.submitAttempt = true;
    if (!this.isValid) {
      return;
    }
    this.onSubmit(this.form.value);
  }

  onSubmit(formValues: any) {
    console.log(formValues);
    const loading$ = from(this.uiService.showLoading('Signing in...'));
    const delay$ = of('delay').pipe(delay(1000));
    const request$ = this.authService.signIn(formValues.email, formValues.password);
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
          this.uiService.showToast(`Welcome!, ${formValues.email}`, 2000, 'bottom');
          this.router.navigate(['goals/list'], { replaceUrl: true })
        },
        error => {
          this.uiService.dismissLoading();
          this.uiService.showAlert('Sign In Failed!', error.error.message);
        }
      );
  }

}
