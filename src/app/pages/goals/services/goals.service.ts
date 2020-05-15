import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';

import { FieldBase } from '../../../components/form-module/classes/field-base';
import { TextboxField } from '../../../components/form-module/classes/field-textbox';

import { Goal } from '../interfaces/goal.interface';

@Injectable({
  providedIn: 'root'
})
export class GoalsService implements OnDestroy {

  private baseUrl: string;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private titleChanged$ = new BehaviorSubject<string>(null);

  private fbSubs: Subscription[] = [];
  private subject = new BehaviorSubject<Goal[]>([]);
  readonly goals$: Observable<Goal[]> = this.subject.asObservable();

  get createGoalFields() {
    const fields: FieldBase<any>[] = [
      new TextboxField({
        order: 1,
        key: 'title',
        label: 'Title',
        type: 'title',
        placeHolder: 'Title',
        required: true,
      }),
      new TextboxField({
        order: 2,
        key: 'description',
        label: 'Description',
        type: 'description',
        placeHolder: 'Description',
        required: true,
      })
    ];
    return fields.sort((a, b) => a.order - b.order);
  }

  get title$(): Observable<string> {
    return this.titleChanged$.asObservable();
  }

  constructor(
    private httpClient: HttpClient,
  ) {
    this.baseUrl = environment.host;
  }

  ngOnDestroy() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  createGoal(goal: Goal) {
    const url = `${this.baseUrl}goals`;
    const body = {
      title: goal.title,
      description: goal.description
    };
    return this.httpClient.post(url, body, this.httpOptions);
  }

  deleteGoal(goal: Goal) {
    const url = `${this.baseUrl}goals/${goal.id}`;
    return this.httpClient.delete(url, this.httpOptions);
  }

  getGoal(id: string) {
    const url = `${this.baseUrl}goals/${id}`;
    return this.httpClient.get<Goal>(url, this.httpOptions);
  }

  getGoals() {
    const url = `${this.baseUrl}goals`;
    console.log(url);
    this.httpClient.get<Goal[]>(url, this.httpOptions)
      .pipe(
        tap(goals => {
          console.log(goals);
          this.subject.next(goals);
        })
      ).subscribe();
  }

  replaceGoal(goal: Goal) {
    const url = `${this.baseUrl}goals/${goal.id}`;
    const body = {
      title: goal.title,
      description: goal.description
    };
    return this.httpClient.put(url, body, this.httpOptions);
  }

  // should i resubscribe for each search to to get request
  searchGoals(term: string) {
    if (!term.trim()) {
      return this.goals$;
      // return of([]);
    }
    return this.goals$
      .pipe(
        map(goals => goals.filter(goal => goal.title.includes(term)))
      );
  }

  updateGoal(goal: Goal) {
    const url = `${this.baseUrl}goals/${goal.id}/status`;
    const body = {
      status: goal.status
    };
    return this.httpClient.patch(url, body, this.httpOptions);
  }

  updateTitle(title: string) {
    this.titleChanged$.next(title);
  }

}
