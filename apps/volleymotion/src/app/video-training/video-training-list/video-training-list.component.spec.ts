import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoTrainingListComponent } from './video-training-list.component';

describe('VideoTrainingListComponent', () => {
  let component: VideoTrainingListComponent;
  let fixture: ComponentFixture<VideoTrainingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoTrainingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoTrainingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
