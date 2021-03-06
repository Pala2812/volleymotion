import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select } from '@ngrx/store';
import { Store } from '@ngrx/store';
import {
  Match,
  MatchComment,
  Player,
  PlayerParticipation,
  Team,
  User,
} from '@volleymotion/models';
import { combineLatest, Observable, Subject } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { serverTimestamp } from 'firebase/firestore';

import { MatchActions } from '../../core/store/actions';
import { StoreState } from '../../core/store/reducers';
import {
  MatchSelectors,
  PlayerSelectors,
  TeamSelectors,
  UserSelectors,
} from '../../core/store/selectors';
import {
  filter,
  map,
  mergeMapTo,
  take,
  takeUntil,
  withLatestFrom,
} from 'rxjs/operators';
import { loadMatchComments } from '../../core/store/actions/match/match.actions';
@Component({
  selector: 'vm-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.scss'],
})
export class MatchDetailComponent implements OnInit, OnDestroy {
  match$: Observable<Match | undefined> | undefined;
  matchComments$: Observable<MatchComment[]> | undefined;
  team$: Observable<Team | undefined> | undefined;
  user$: Observable<User | undefined> | undefined;
  players$: Observable<Player[]> | undefined;
  isAddingCommentToMatch$: Observable<boolean> | undefined;
  matchForm: FormGroup | undefined;
  commentForm: FormGroup = this.initCommentForm();
  playerParticipations: PlayerParticipation[] | undefined;

  private unsubscribe$ = new Subject();

  constructor(
    private store: Store<StoreState>,
    private fs: AngularFirestore,
    private route: ActivatedRoute,
    private actions$: Actions
  ) {}

  ngOnInit(): void {
    this.match$ = this.store.pipe(select(MatchSelectors.selectMatch));
    this.user$ = this.store.pipe(select(UserSelectors.selectUser));
    this.team$ = this.store.pipe(select(TeamSelectors.selectTeam));
    this.players$ = this.store.pipe(select(PlayerSelectors.selectPlayers));
    this.isAddingCommentToMatch$ = this.store.pipe(
      select(MatchSelectors.selectIsAddingCommentToMatches)
    );
    this.matchComments$ = this.store.pipe(
      select(MatchSelectors.selectMatchComments)
    );
    this.match$
      .pipe(
        filter((match) => !!match),
        take(1)
      )
      .subscribe((match) => this.store.dispatch(loadMatchComments({ match })));
    this.loadMatchIfUndefined();

    combineLatest([this.players$, this.match$])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params) => {
        const [players, match] = params;
        this.playerParticipations = players.map((player) => {
          const { id, firstname, lastname } = player;
          const playerParticipation: PlayerParticipation = {
            id,
            firstname,
            lastname,
            percentage: 0,
            didParticipate: false,
          };
          return playerParticipation;
        });

        match?.playerParticipations?.forEach((playerParticipation) => {
          this.playerParticipations?.forEach((participation) => {
            if (playerParticipation?.id === participation?.id) {
              participation.didParticipate =
                playerParticipation?.didParticipate;
              participation.percentage = playerParticipation?.percentage;
            }
          });
        });
      });

    this.actions$
      .pipe(
        ofType(MatchActions.updateMatchSuccess),
        mergeMapTo(this.route.params),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((params) => {
        this.store.dispatch(MatchActions.loadMatchById({ id: params.id }));
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadMatchIfUndefined() {
    this.match$
      ?.pipe(
        filter((match) => !match),
        mergeMapTo(this.route.params),
        take(1)
      )
      .subscribe((params) => {
        const { id } = params;
        this.store.dispatch(MatchActions.loadMatchById({ id }));
      });
  }

  initCommentForm(): FormGroup {
    return new FormGroup({
      comment: new FormControl('', [Validators.required]),
    });
  }

  addComment(form: FormGroup, match: Match, user: User) {
    if (form?.valid) {
      const comment = form?.controls?.comment?.value;
      const uid = user?.uid;
      const id = this.fs.createId();
      const matchId = match?.id;
      const createdAt = serverTimestamp();

      const matchComment: MatchComment = {
        uid,
        id,
        matchId,
        comment,
        createdAt,
      };

      this.store.dispatch(
        MatchActions.addCommentToMatch({ match, matchComment })
      );

      form.reset();
    }
  }

  changePlayerParticipation(playerParticipation: PlayerParticipation) {
    playerParticipation.didParticipate = !playerParticipation?.didParticipate;
    if (!playerParticipation?.didParticipate) {
      playerParticipation.percentage = 0;
    }
  }

  onMatchCommentDelete(matchComment: MatchComment) {
    this.store.dispatch(MatchActions.deleteMatchComment({ matchComment }));
  }

  saveMatch(matchObj: Match, playerParticipations: PlayerParticipation[]) {
    if (matchObj && playerParticipations) {
      const match = { ...matchObj, playerParticipations };
      this.store.dispatch(MatchActions.updateMatch({ match }));
    }
  }
}
