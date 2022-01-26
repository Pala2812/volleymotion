import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { select, Store } from '@ngrx/store';
import { Match, TrainingMatch } from '@volleymotion/models';
import { object } from 'firebase-functions/lib/providers/storage';
import { off } from 'process';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { TraningMatchActions } from '../../core/store/actions';
import { StoreState } from '../../core/store/reducers';
import { TrainingMatchSelectors } from '../../core/store/selectors';
import { TrainingMatchDetailComponent } from '../training-match-detail/training-match-detail.component';
import { TrainingMatchFilterComponent } from '../training-match-filter/training-match-filter.component';

@Component({
  selector: 'vm-traning-matches-map',
  templateUrl: './traning-matches-map.component.html',
  styleUrls: ['./traning-matches-map.component.scss'],
})
export class TraningMatchesMapComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean> | undefined;
  latitude = 51.164305;
  longitude = 10.4541205;
  traningMatches$: Observable<TrainingMatch[]> | undefined;
  filteredMatches$ = new BehaviorSubject<TrainingMatch[]>([]);
  unsubscribe$ = new Subject();
  filters:
    | { division: string; teamType: string; sportType: string }
    | undefined;

  constructor(
    private store: Store<StoreState>,
    private dialog: NbDialogService
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.traningMatches$ = this.store.pipe(
      select(TrainingMatchSelectors.selectTrainingMatches),
      map((trainingMatches) =>
        trainingMatches.map((trainingMatch) => {
          const copy = JSON.parse(JSON.stringify(trainingMatch));
          const offset = Math.round(Math.random() * 10).toString();
          const latitude = (copy._geoloc.lat + '').split('');
          const longitude = (copy._geoloc.lng + '').split('');
          latitude[latitude.length - 2] = offset;
          longitude[longitude.length - 2] = offset;

          copy._geoloc.lat = Number(latitude.join(''));
          copy._geoloc.lng = Number(longitude.join(''));
          return copy;
        })
      )
    );

    this.isLoading$ = this.store.pipe(
      select(TrainingMatchSelectors.selectIsLoadingTrainingMatches)
    );

    this.traningMatches$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((matches) => this.filteredMatches$.next(matches));

    this.store.dispatch(TraningMatchActions.loadTrainingMatches());
  }

  viewDetails(trainingMatch: TrainingMatch) {
    this.dialog.open(TrainingMatchDetailComponent, {
      context: {
        trainingMatch,
      },
    });
  }

  showFilter() {
    const ref = this.dialog.open(TrainingMatchFilterComponent, {
      context: { filters: this.filters },
    });

    ref.onClose.subscribe((res) => {
      if (!res) {
        return;
      }

      if (res === 'reset') {
        this.traningMatches$?.pipe(take(1)).subscribe((matches) => {
          this.filteredMatches$.next(matches);
        });
      }

      if (!res?.length && Object?.keys(res)?.length) {
        this.filters = res;
        this.traningMatches$?.pipe(take(1)).subscribe((matches) => {
          let filteredMatches: TrainingMatch[] = [];
          const filtered = matches.filter((match) => {
            if (res?.teamType && res?.division && res?.sportType) {
              return (
                match['teamType'] === res['teamType'] &&
                match['division'] === res['division'] &&
                match['sportType'] === res['sportType']
              );
            }

            if (res?.teamType && res?.sportType) {
              return (
                match['teamType'] === res['teamType'] &&
                match['sportType'] === res['sportType']
              );
            }

            if (res?.teamType && res?.division) {
              return (
                match['teamType'] === res['teamType'] &&
                match['division'] === res['division']
              );
            }

            if (res?.sportType && res?.division) {
              return (
                match['sportType'] === res['sportType'] &&
                match['division'] === res['division']
              );
            }
          });
          filteredMatches = filteredMatches.concat(filtered);
          this.filteredMatches$.next(filteredMatches);
        });
      }
    });
  }
}
