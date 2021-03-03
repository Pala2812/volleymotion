import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Player } from '@volleymotion/models';
import { Observable } from 'rxjs';
import { StoreState } from '../../core/store/reducers';
import { PlayerSelectors } from '../../core/store/selectors';

@Component({
  selector: 'vm-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss']
})
export class PlayerDetailComponent implements OnInit {
  player$: Observable<Player>;

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
  
  constructor(private store: Store<StoreState>) { }

  ngOnInit(): void {
    this.player$ = this.store.pipe(select(PlayerSelectors.selectPlayer));
  }

}
