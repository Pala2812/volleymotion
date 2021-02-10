import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TrainingMatch } from '@volleymotion/models';
import { off } from 'process';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TraningMatchActions } from '../../core/store/actions';
import { StoreState } from '../../core/store/reducers';
import { TrainingMatchSelectors } from '../../core/store/selectors';

@Component({
  selector: 'vm-traning-matches-map',
  templateUrl: './traning-matches-map.component.html',
  styleUrls: ['./traning-matches-map.component.scss'],
})
export class TraningMatchesMapComponent implements OnInit {
  latitude = 51.164305;
  longitude = 10.4541205;
  traningMatches$: Observable<TrainingMatch[]>;

  constructor(private store: Store<StoreState>) {}

  ngOnInit(): void {
    this.traningMatches$ = this.store.pipe(
      select(TrainingMatchSelectors.selectTrainingMatches),
      map((trainingMatches) =>
        trainingMatches.map((trainingMatch) => {
          const copy = JSON.parse(JSON.stringify(trainingMatch));
          const offset = Math.round(Math.random() * 10).toString();
          const latitude = (copy._geoloc.lat + '').split('');
          const longitude = (copy._geoloc.lng + '').split('');
          latitude[latitude.length - 4] = offset;
          longitude[longitude.length - 9] = offset;

          copy._geoloc.lat = Number(latitude.join(''));
          copy._geoloc.lng = Number(longitude.join(''));
          return copy;
        })
      )
    );

    this.store.dispatch(TraningMatchActions.loadTrainingMatches());
  }

  viewDetails() {
    // open dialog with details
  }
}
