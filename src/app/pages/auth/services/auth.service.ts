import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, from } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';

import { StorageService } from 'src/app/services/storage.service';

import { FieldBase } from '../../../components/form-module/classes/field-base';
import { TextboxField } from '../../../components/form-module/classes/field-textbox';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private titleChanged$ = new BehaviorSubject<string>(null);

  get isAuthenticated$() {
    return from(this.checkAuth());
    // return this.authChanged$.asObservable();
  }

  get accessToken() {
    return this.storageService.get('accesstoken');
  }

  get signInFields() {
    const fields: FieldBase<any>[] = [
      new TextboxField({
        order: 1,
        key: 'email',
        label: 'Email',
        type: 'email',
        placeHolder: 'Email',
        required: true,
        emailValidator: true,
      }),
      new TextboxField({
        order: 2,
        key: 'password',
        label: 'Password',
        type: 'password',
        placeHolder: 'Password',
        required: true,
        minLength: 8,
        eye: true
      })
    ];
    return fields.sort((a, b) => a.order - b.order);
  }

  get signUpFields() {
    const fields: FieldBase<any>[] = [
      new TextboxField({
        order: 1,
        key: 'email',
        label: 'Email',
        type: 'email',
        placeHolder: 'Email',
        required: true,
        emailValidator: true,
      }),
      new TextboxField({
        order: 2,
        key: 'password',
        label: 'Password',
        type: 'password',
        placeHolder: 'Password',
        required: true,
        minLength: 8,
        eye: true
      }),
      new TextboxField({
        order: 3,
        key: 'confirmPassword',
        label: 'Confirm Password',
        type: 'confirmPassword',
        placeHolder: 'Confirm Password',
        required: true,
        eye: true,
        passwordVerify: true
      })
    ];
    return fields.sort((a, b) => a.order - b.order);
  }

  get title$(): Observable<string> {
    return this.titleChanged$.asObservable();
  }

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private storageService: StorageService
  ) {
    this.baseUrl = environment.host;
  }

  async checkAuth() {
    const accessToken = await this.storageService.get('accesstoken');
    console.log(accessToken);
    if (!accessToken) {
      console.log('Access token missing');
      return false;
    } else {
      try {
        await this.validateAccessToken();
        return true;
      } catch (error) {
        console.error(error);
        await this.storageService.removeKey('accesstoken');
        return false;
      }
    }
  }

  async logout(): Promise<void> {
    try {
      await this.storageService.clear();
      await this.storageService.removeKey('accesstoken');
      return;
    } catch (error) {
      console.error(error);
      throw error.message;
    }
  }

  signIn(email: string, password: string) {
    const url = `${this.baseUrl}auth/signin`;
    const body = {
      username: email,
      password
    };
    return this.httpClient.post(url, body, this.httpOptions)
      .pipe(
        tap(data => {
          console.log(data);
          this.storageService.save('accesstoken', data['accessToken'])
        })
      );
  }

  signUp(email: string, password: string) {
    const url = `${this.baseUrl}auth/signup`;
    const body = {
      username: email,
      password
    };
    return this.httpClient.post(url, body, this.httpOptions)
      .pipe(
        tap(data => {
          console.log(data);
        })
      );
  }

  updateTitle(title: string) {
    this.titleChanged$.next(title);
  }

  async validateAccessToken() {
    const url = `${this.baseUrl}goals`;
    return this.httpClient.get(url, this.httpOptions).toPromise();
  }

}
