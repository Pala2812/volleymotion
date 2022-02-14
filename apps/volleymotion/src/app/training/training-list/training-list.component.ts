import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Training, TrainingUnit } from '@volleymotion/models';
import { Observable, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
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
  subscriptions: Subscription[] = [];

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

    this.trainingList$?.subscribe((trainingDays) => {
      trainingDays.forEach((trainingDay) => {
        this.trainingService
          .getTrainingUnits(trainingDay.id, trainingDay.seasonId, 2)
          .subscribe((units) => trainingDay.trainingUnits = units);
      });
    });
  }

  async deleteTraining(id: string, event: Event) {
    const deleteTraining = await confirm(
      'Möchtest du diesen Trainingstag löschen und alle damit verbunden Einheiten?'
    );
    event.stopImmediatePropagation();
    if (deleteTraining) {
      this.trainingService.delete(id).subscribe(() => console.log('deleted'));
    }
  }

  editTraining() {

  }
}
