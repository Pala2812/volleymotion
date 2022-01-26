import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Player, Season, Tag, Team } from '@volleymotion/models';
import { Observable, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { PlayerActions } from '../../core/store/actions';

import { StoreState } from '../../core/store/reducers';
import {
  PlayerSelectors,
  SeasonSelectors,
  TagSelectors,
  TeamSelectors,
} from '../../core/store/selectors';
import { TagExplanationComponent } from '../../shared/dialogs/tag-explanation/tag-explanation.component';

@Component({
  selector: 'vm-player-create',
  templateUrl: './player-create.component.html',
  styleUrls: ['./player-create.component.scss'],
})
export class PlayerCreateComponent implements OnInit, OnDestroy {
  isUpdatingPlayer$: Observable<boolean> | undefined;
  isCreatingPlayer$: Observable<boolean> | undefined;
  player$: Observable<Player | undefined> | undefined;
  team$: Observable<Team | undefined> | undefined;
  player: Player | undefined;
  season$: Observable<Season | undefined> | undefined;
  tags$: Observable<Tag[]> | undefined;
  filteredTags: Observable<Tag[]> | undefined;
  unsubscribe$ = new Subject();
  form: FormGroup = this.initForm();

  positions = [
    'Außenangreifer*in',
    'Diagonalangreifer*in',
    'Mittelblocker*in',
    'Zuspieler*in',
    'Libero | Libera',
  ];

  constructor(
    private fs: AngularFirestore,
    private store: Store<StoreState>,
    private router: Router,
    private actions$: Actions,
    private dialog: NbDialogService
  ) {}

  ngOnInit(): void {
    this.team$ = this.store.pipe(select(TeamSelectors.selectTeam));
    this.season$ = this.store.pipe(select(SeasonSelectors.selectSeason));
    this.tags$ = this.store.pipe(select(TagSelectors.selectTags));
    this.player$ = this.store.pipe(select(PlayerSelectors.selectPlayer));
    this.filteredTags = this.store.pipe(select(TagSelectors.selectTags));
    this.isCreatingPlayer$ = this.store.pipe(
      select(PlayerSelectors.selectIsCreatingPlayer)
    );
    this.isUpdatingPlayer$ = this.store.pipe(
      select(PlayerSelectors.selectIsUpdatingPlayer)
    );

    this.player$
      .pipe(
        filter((player) => !!player),
        take(1)
      )
      .subscribe((player) => {
        this.player = player;
        this.form = this.initForm(player);
      });

    this.actions$
      .pipe(
        ofType(
          PlayerActions.createPlayerSuccess,
          PlayerActions.updatePlayerSuccess
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => this.router.navigate(['spieler']));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initForm(player?: Player) {
    return new FormGroup({
      firstname: new FormControl(player?.firstname ?? '', [
        Validators.required,
      ]),
      lastname: new FormControl(player?.lastname ?? '', [Validators.required]),
      position: new FormControl(player?.position ?? '', [Validators.required]),
      strengths: new FormArray(this.getControlArray(player?.strengths ?? [])),
      weaknesses: new FormArray(this.getControlArray(player?.weaknesses ?? [])),
      improvements: new FormArray(
        this.getControlArray(player?.improvements ?? [])
      ),
    });
  }

  getControlArray(array: any[]) {
    return array?.map((value) => new FormControl(value));
  }

  get strengths() {
    return this.form.controls.strengths as FormArray;
  }

  get weaknesses() {
    return this.form.controls.weaknesses as FormArray;
  }

  get improvements() {
    return this.form.controls.improvements as FormArray;
  }

  onStrengthTagSelected(event: any) {
    const control = new FormControl(event.option.value);
    this.strengths.push(control);
  }

  onWeaknessesSelected(event: any) {
    const control = new FormControl(event.option.value);
    this.weaknesses.push(control);
  }

  onImprovementSelected(event: any) {
    const control = new FormControl(event.option.value);
    this.improvements.push(control);
  }

  submit(form: FormGroup, team: Team, season: Season, oldPlayer?: Player) {
    if (form.valid && team && season) {
      const id = oldPlayer?.id ?? this.fs.createId();
      const uid = team.uid;
      const teamId = team.id;
      const seasonId = season.id;
      const firstname = form.controls.firstname.value;
      const lastname = form.controls.lastname.value;
      const position = form.controls.position.value;
      const strengths = [...new Set(form.controls.strengths.value as any[])];
      const weaknesses = [...new Set(form.controls.weaknesses.value as any[])];
      const improvements = [
        ...new Set(form.controls.improvements.value as any[]),
      ];

      let player: Player = {
        id,
        uid,
        teamId,
        seasonId,
        firstname,
        lastname,
        position,
        strengths,
        weaknesses,
        improvements,
      };

      if (oldPlayer) {
        player = { ...oldPlayer, ...player };
        this.store.dispatch(PlayerActions.updatePlayer({ player }));
        return;
      }

      this.store.dispatch(PlayerActions.createPlayer({ player }));
    }
  }

  openTagDialog() {
    this.dialog.open(TagExplanationComponent);
  }
}
