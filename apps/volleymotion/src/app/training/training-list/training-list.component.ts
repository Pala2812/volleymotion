import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Season, Training, TrainingUnit } from '@volleymotion/models';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { DateTime } from 'luxon';
import { TrainingService } from '../../core/services/training.service';
import { SeasonSelectors } from '../../core/store/selectors';

@Component({
  selector: 'vm-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.scss'],
})
export class TrainingListComponent implements OnInit {
  trainingList$: Observable<Training[]> | undefined;
  trainingUnits$: Observable<TrainingUnit[]> | undefined;
  seasonId: string | undefined;
  teamId: string | undefined;
  uid: string | undefined;

  constructor(private store: Store, private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.store
      .pipe(
        select(SeasonSelectors.selectSeason),
        filter((season) => !!season),
        take(1)
      )
      .subscribe((season) => {
        this.seasonId = season?.id;
        this.teamId = season?.teamId;
        this.uid = season?.uid;

        this.trainingList$ = this.trainingService.getAll(
          season!.id,
          season!.teamId
        );

        this.trainingUnits$ = this.trainingService.getTrainingUnits(
          season!.id,
          season!.teamId
        );
      });
  }

  createTrainingUnit(
    training: Training,
    uid: string,
    seasonId: string,
    teamId: string
  ) {
    if (!seasonId || !teamId) {
      throw new Error('SeasonId or TeamId is undefined');
    }

    // get day - create for today or next day
    const today = DateTime.now().weekday;
    if (today === training.weekday) {
      const date = DateTime.now().endOf('day').toJSDate() as any;
      const trainingUnit: TrainingUnit = {
        id: this.trainingService.getId(),
        trainingId: training?.id,
        seasonId,
        teamId,
        uid,
        date,
        participantIds: [],
        exerciseIds: [],
        videoTrainingIds: [],
      };
      console.log(trainingUnit);
      this.trainingService
        .createTrainingUnit(trainingUnit)
        .subscribe(() => alert('Success'));
    } else {
    }
  }

  async deleteTraining(id: string, event: Event) {
    const deleteTraining = confirm(
      'Möchtest du diesen Trainingstag löschen und alle damit verbunden Einheiten?'
    );

    if (deleteTraining) {
      this.trainingService.delete(id).subscribe();
    }

    event.stopImmediatePropagation();
  }
}
