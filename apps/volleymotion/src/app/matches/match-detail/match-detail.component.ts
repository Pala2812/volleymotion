import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select } from '@ngrx/store';
import { Store } from '@ngrx/store';
import { Match, Player, Team } from '@volleymotion/models';
import { Observable } from 'rxjs';
import { StoreState } from '../../core/store/reducers';
import { MatchSelectors, PlayerSelectors, TeamSelectors } from '../../core/store/selectors';

@Component({
  selector: 'vm-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.scss']
})
export class MatchDetailComponent implements OnInit {
  match$: Observable<Match>;
  team$ : Observable<Team>;
  players$: Observable<Player[]>;
  commentForm: FormGroup;

  constructor(private store: Store<StoreState>) { }

  ngOnInit(): void {
    this.match$ = this.store.pipe(select(MatchSelectors.selectMatch));
    this.team$ = this.store.pipe(select(TeamSelectors.selectTeam));
    this.players$ = this.store.pipe(select(PlayerSelectors.selectPlayers));
    this.commentForm = this.initCommentForm();
  }

  initCommentForm():FormGroup {
    return new FormGroup({
      comment: new FormControl('', [Validators.required]),
    })
  }

}
