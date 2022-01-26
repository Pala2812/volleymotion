import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Tag, VideoTraining } from '@volleymotion/models';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { VideoTrainingService } from '../../core/services/video-training.service';
import {
  AuthSelectors,
  TagSelectors,
  UserSelectors,
} from '../../core/store/selectors';

@Component({
  selector: 'vm-video-training-create',
  templateUrl: './video-training-create.component.html',
  styleUrls: ['./video-training-create.component.scss'],
})
export class VideoTrainingCreateComponent implements OnInit {
  sportTypes = ['Hallenvolleyball', 'Beachvolleyball', 'Snowvolleyball'];
  form: FormGroup = this.initForm();
  isCreating$: Observable<boolean> | undefined;
  filteredTags$: Observable<Tag[]> | undefined;
  tags$: Observable<Tag[]> | undefined;
  uid$: Observable<string | undefined> | undefined;

  constructor(
    private store: Store,
    private videoTrainingService: VideoTrainingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.uid$ = this.store.pipe(select(AuthSelectors.selectUid));
    this.tags$ = this.store.pipe(select(TagSelectors.selectTags));
    this.tags$.subscribe(console.log);
  }

  initForm() {
    return new FormGroup({
      sportType: new FormControl('', Validators.required),
      tags: new FormArray([]),
      url: new FormControl('', [Validators.required]),
    });
  }

  submit(form: FormGroup) {
    if (form.valid) {
      this.uid$?.pipe(take(1)).subscribe((uid) => {
        if (!uid) {
          throw new Error('Unable to retrieve uid');
        }
        const { sportType, url, title } = form.value;
        const tagIds = (form?.controls?.tags.value as Tag[]).map(
          (tag) => tag.id
        );

        const id = this.videoTrainingService.getId();
        const videoTraining: VideoTraining = {
          id,
          uid,
          sportType,
          tagIds,
          url,
        };

        this.videoTrainingService
          .createVideoTraining(videoTraining)
          .subscribe(() => this.router.navigate(['video-training']));
      });
    }
  }

  get tags() {
    return this.form.controls.tags as FormArray;
  }

  onTagClicked(event: any) {
    const tag = event.option.value;
    (this.form.controls.tags as FormArray).push(new FormControl(tag));
  }

  removeTag(index: number, event: Event) {
    (this.form.controls.tags as FormArray).removeAt(index);
    event.stopImmediatePropagation();
  }

  onInputChanged(event: any) {
    console.log(event.target.value);
    this.filteredTags$ = this.tags$?.pipe(
      map((tags) =>
        [...tags].filter((tag) =>
          tag.name.toLowerCase().includes(event.target.value)
        )
      )
    );
  }
}
