import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GoalListComponent } from './goal-list.component';

describe('GoalListComponent', () => {
  let component: GoalListComponent;
  let fixture: ComponentFixture<GoalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GoalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
