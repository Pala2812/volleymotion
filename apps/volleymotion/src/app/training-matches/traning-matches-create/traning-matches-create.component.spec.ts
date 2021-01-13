import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraningMatchesCreateComponent } from './traning-matches-create.component';

describe('TraningMatchesCreateComponent', () => {
  let component: TraningMatchesCreateComponent;
  let fixture: ComponentFixture<TraningMatchesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraningMatchesCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraningMatchesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
