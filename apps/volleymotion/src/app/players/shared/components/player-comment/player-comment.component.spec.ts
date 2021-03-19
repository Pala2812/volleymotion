import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCommentComponent } from './player-comment.component';

describe('PlayerCommentComponent', () => {
  let component: PlayerCommentComponent;
  let fixture: ComponentFixture<PlayerCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
