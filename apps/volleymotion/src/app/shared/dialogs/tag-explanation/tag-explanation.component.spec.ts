import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagExplanationComponent } from './tag-explanation.component';

describe('TagExplanationComponent', () => {
  let component: TagExplanationComponent;
  let fixture: ComponentFixture<TagExplanationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagExplanationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagExplanationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
