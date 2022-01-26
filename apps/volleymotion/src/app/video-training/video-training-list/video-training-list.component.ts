import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NbDialogService } from '@nebular/theme';
import { select, Store } from '@ngrx/store';
import { Tag, VideoTraining } from '@volleymotion/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { ArticleListFilterDialogComponent } from '../../article/article-list/article-list-filter-dialog/article-list-filter-dialog.component';
import { VideoTrainingService } from '../../core/services/video-training.service';
import { TagSelectors } from '../../core/store/selectors';

@Component({
  selector: 'vm-video-training-list',
  templateUrl: './video-training-list.component.html',
  styleUrls: ['./video-training-list.component.scss'],
})
export class VideoTrainingListComponent implements OnInit {
  isLoading$ = new BehaviorSubject(false);
  tags$: Observable<Tag[]> | undefined;
  videoTrainings$: Observable<VideoTraining[] | any[]> | undefined;
  selectedTags: Tag[] = [];
  sportType = 'Hallenvolleyball';

  constructor(
    private store: Store,
    private videoTrainingService: VideoTrainingService,
    private dialog: NbDialogService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadVideos(this.sportType);
    this.tags$ = this.store.pipe(select(TagSelectors.selectTags));
  }

  loadVideos(sportType: string, tagIds?: string[]) {
    this.videoTrainings$ = this.videoTrainingService
      .loadVideoTrainingList(sportType, tagIds)
      .pipe(
        tap(() => this.isLoading$.next(true)),
        map((videos) =>
          videos.map((video) => ({
            ...video,
            url: this.sanitizer.bypassSecurityTrustResourceUrl(video.url),
          }))
        ),
        finalize(() => this.isLoading$.next(false))
      );
  }

  showFilterDialog() {
    const ref = this.dialog.open(ArticleListFilterDialogComponent, {
      context: { tags: this.selectedTags, sportType: this.sportType },
    });

    ref.onClose.subscribe(
      (data: { tags: Tag[] | undefined; sportType: string } | 'reset') => {
        if (data === 'reset') {
          this.selectedTags = [];
          return;
        }

        this.selectedTags = data?.tags as Tag[];
        this.sportType = data?.sportType;
        const tagIds = (data?.tags as Tag[])?.map((tag) => tag.id) ?? [];
        this.loadVideos(data?.sportType, tagIds);
      }
    );
  }
}
