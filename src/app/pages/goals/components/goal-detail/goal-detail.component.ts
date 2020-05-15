import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { GoalsService } from '../../services/goals.service';

import { Goal } from '../../interfaces/goal.interface';

@Component({
  selector: 'app-goal-detail',
  templateUrl: './goal-detail.component.html',
  styleUrls: ['./goal-detail.component.scss'],
})
export class GoalDetailComponent {

  goal$: Observable<Goal>;
  private id: string;
  title$: Observable<string>;

  constructor(
    public activatedRoute: ActivatedRoute,
    public goalsService: GoalsService
  ) {
    this.goalsService.updateTitle('Goal Details');
    this.title$ = this.goalsService.title$;
    this.goal$ = this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.goalsService.getGoal(params.get('id')))
    );
  }

}
