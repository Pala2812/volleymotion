import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyCreateEditComponent } from './survey-create-edit.component';

describe('SurveyCreateEditComponent', () => {
  let component: SurveyCreateEditComponent;
  let fixture: ComponentFixture<SurveyCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
