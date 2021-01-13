import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraningMatchesMapComponent } from './traning-matches-map.component';

describe('TraningMatchesMapComponent', () => {
  let component: TraningMatchesMapComponent;
  let fixture: ComponentFixture<TraningMatchesMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraningMatchesMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraningMatchesMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
