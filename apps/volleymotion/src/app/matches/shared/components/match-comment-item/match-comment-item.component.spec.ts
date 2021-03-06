import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchCommentItemComponent } from './match-comment-item.component';

describe('MatchCommentItemComponent', () => {
  let component: MatchCommentItemComponent;
  let fixture: ComponentFixture<MatchCommentItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchCommentItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchCommentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
