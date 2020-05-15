import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GoalEditComponent } from './goal-edit.component';

describe('GoalEditComponent', () => {
  let component: GoalEditComponent;
  let fixture: ComponentFixture<GoalEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalEditComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GoalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
