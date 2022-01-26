import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoTrainingCreateComponent } from './video-training-create.component';

describe('VideoTrainingCreateComponent', () => {
  let component: VideoTrainingCreateComponent;
  let fixture: ComponentFixture<VideoTrainingCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoTrainingCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoTrainingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
