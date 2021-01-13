import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraningDetailComponent } from './traning-detail.component';

describe('TraningDetailComponent', () => {
  let component: TraningDetailComponent;
  let fixture: ComponentFixture<TraningDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraningDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraningDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
