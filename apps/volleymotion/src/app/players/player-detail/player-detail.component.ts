import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Player, PlayerComment } from '@volleymotion/models';
import { Observable } from 'rxjs';
import { filter, mergeMapTo, take } from 'rxjs/operators';
import { User, } from '../../core/models';
import { PlayerActions } from '../../core/store/actions';
import { StoreState } from '../../core/store/reducers';
import { PlayerSelectors, UserSelectors } from '../../core/store/selectors';
import { isLoadingPlayerComments } from '../../core/store/selectors/player/player.selectors';

@Component({
  selector: 'vm-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss']
})
export class PlayerDetailComponent implements OnInit {
  user$: Observable<User>;
  player$: Observable<Player>;
  isLoadingPlayerComments$: Observable<boolean>;
  playerComments$: Observable<PlayerComment[]>;
  commentForm: FormGroup;
  isAddingCommentToPlayer$: Observable<boolean>;

  trainData = [
    ['Anwesend', 11],
    ['Abwesend', 2],
  ];

  options = {
    backgroundColor: 'transparent',
    width: window.screen.availWidth * .2,
    height: window.screen.availWidth * .2,
    chartArea: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 50,
    },
    legend: { position: 'bottom', textStyle: { color: '#fff', fontSize: 14 } },
  };

  constructor(private store: Store<StoreState>, private route: ActivatedRoute) { }

  initCommentForm() {
    return new FormGroup({
      comment: new FormControl('', [Validators.required]),
    })
  };

  ngOnInit(): void {
    this.player$ = this.store.pipe(select(PlayerSelectors.selectPlayer));
    this.user$ = this.store.pipe(select(UserSelectors.selectUser));
    this.isAddingCommentToPlayer$ = this.store.pipe(select(PlayerSelectors.isAddingCommentToPlayer));
    this.isLoadingPlayerComments$ = this.store.pipe(select(PlayerSelectors.isLoadingPlayerComments));
    this.playerComments$ = this.store.pipe(select(PlayerSelectors.playerComments));
    this.commentForm = this.initCommentForm();
    this.loadPlayerIfUndefined();
    this.loadPlayerComments();
  }

  loadPlayerComments() {
    this.player$.pipe(filter(player => !!player), take(1)).subscribe((player) => this.store.dispatch(PlayerActions.loadPlayerComments({ player })));
  }

  loadPlayerIfUndefined() {
    this.player$.pipe(filter(player => !player), mergeMapTo(this.route.params), take(1))
      .subscribe(params => {
        const { id } = params;
        this.store.dispatch(PlayerActions.loadPlayerById({ id }));
      });
  }

  addComment(form: FormGroup, player: Player, user: User) {
    if (form?.valid) {
      const comment = form.controls.comment.value;
      const playerComment: Partial<PlayerComment> = {
        uid: user.uid,
        playerId: player.id,
        comment
      };

      form.reset();
      this.store.dispatch(PlayerActions.addCommentToPlayer({ playerComment }));
    }
  }

  onPlayerCommentDelete(playerComment: PlayerComment) {
    this.store.dispatch(PlayerActions.deletePlayerComment({ playerComment }));
  }
}
