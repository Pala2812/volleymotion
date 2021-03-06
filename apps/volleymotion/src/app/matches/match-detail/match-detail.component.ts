import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select } from '@ngrx/store';
import { Store } from '@ngrx/store';
import { Match, MatchComment, Player, Team } from '@volleymotion/models';
import { Observable } from 'rxjs';

import { User } from '../../core/models';
import { MatchActions } from '../../core/store/actions';
import { StoreState } from '../../core/store/reducers';
import { MatchSelectors, PlayerSelectors, TeamSelectors, UserSelectors } from '../../core/store/selectors';
import firebase from 'firebase/app';
import { take } from 'rxjs/operators';
import { loadMatchComments } from '../../core/store/actions/match/match.actions';

@Component({
  selector: 'vm-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.scss']
})
export class MatchDetailComponent implements OnInit {
  match$: Observable<Match>;
  matchComments$: Observable<MatchComment[]>;
  team$: Observable<Team>;
  user$: Observable<User>;
  players$: Observable<Player[]>;
  isAddingCommentToMatch$: Observable<boolean>;
  commentForm: FormGroup;

  constructor(private store: Store<StoreState>, private fs: AngularFirestore) { }

  ngOnInit(): void {
    this.match$ = this.store.pipe(select(MatchSelectors.selectMatch));
    this.user$ = this.store.pipe(select(UserSelectors.selectUser));
    this.team$ = this.store.pipe(select(TeamSelectors.selectTeam));
    this.players$ = this.store.pipe(select(PlayerSelectors.selectPlayers));
    this.isAddingCommentToMatch$ = this.store.pipe(select(MatchSelectors.selectIsAddingCommentToMatches));
    this.matchComments$ = this.store.pipe(select(MatchSelectors.selectMatchComments));
    this.match$.pipe(take(1)).subscribe(match => this.store.dispatch(loadMatchComments({ match })));
    this.commentForm = this.initCommentForm();
  }

  initCommentForm(): FormGroup {
    return new FormGroup({
      comment: new FormControl('', [Validators.required]),
    })
  }

  addComment(form: FormGroup, match: Match, user: User) {
    if (form?.valid) {
      const comment = form?.controls?.comment?.value;
      const uid = user?.uid;
      const id = this.fs.createId();
      const matchId = match?.id;
      const createdAt = firebase.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp;

      const matchComment: MatchComment = {
        uid,
        id,
        matchId,
        comment,
        createdAt
      };

      this.store.dispatch(MatchActions.addCommentToMatch({ match, matchComment }));

      form.reset();
    }
  }

  onMatchCommentDelete(matchComment: MatchComment) {
    this.store.dispatch(MatchActions.deleteMatchComment({ matchComment }));
  }
}
