import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { select, Store } from '@ngrx/store';
import { TrainingMatch } from '@volleymotion/models';
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
  latitude = 51.164305;
  longitude = 10.4541205;
  traningMatches$: Observable<TrainingMatch[]>;
  filteredMatches$ = new BehaviorSubject<TrainingMatch[]>([]);
  unsubscribe$ = new Subject();

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
    const ref = this.dialog.open(TrainingMatchFilterComponent);

    ref.onClose.subscribe((res) => {
      if (res === 'reset') {
        console.log('reset');
        this.traningMatches$.pipe(take(1)).subscribe((matches) => {
          console.log(matches);
          this.filteredMatches$.next(matches);
        });
      }

      if (!res?.length && Object?.keys(res)?.length) {
        this.traningMatches$.pipe(take(1)).subscribe((matches) => {
          let filteredMatches = [];
          Object.keys(res).forEach((key) => {
            const filtered = matches.filter((match) => {
              return match[key] === res[key];
            });
            filteredMatches = filteredMatches.concat(filtered);
          });
          this.filteredMatches$.next(filteredMatches);
        });
      }
    });
  }
}
