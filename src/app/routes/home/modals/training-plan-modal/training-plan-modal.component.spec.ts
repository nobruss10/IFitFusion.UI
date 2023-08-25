import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingPlanModalComponent } from './training-plan-modal.component';

describe('TrainingPlanModalComponent', () => {
  let component: TrainingPlanModalComponent;
  let fixture: ComponentFixture<TrainingPlanModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingPlanModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingPlanModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
