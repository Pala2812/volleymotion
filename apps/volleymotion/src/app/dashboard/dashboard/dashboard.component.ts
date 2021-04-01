import { Component, HostListener, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { select, Store } from '@ngrx/store';
import { Match, Player, Season, Tag, Team } from '@volleymotion/models';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { StoreState } from '../../core/store/reducers';
import { MatchSelectors, PlayerSelectors, SeasonSelectors, TeamSelectors } from '../../core/store/selectors';
import { MatchActions, PlayerActions, SeasonActions } from '../../core/store/actions';

@Component({
  selector: 'vm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  team$: Observable<Team>;
  season$: Observable<Season>;
  matchParticipationChart$: Observable<any>;
  matches$: Observable<Match[]>;
  nextMatch$: Observable<Match>;
  points$: Observable<{ scoredPoints: number, collectedPoints: number }>;
  participations$: Observable<any>;
  attendance$: Observable<any>;
  strengths$: Observable<Tag[]>;
  improvements$: Observable<Tag[]>;
  weaknesses$: Observable<Tag[]>;
  players$: Observable<Player[]>;
  data = [
    ['Ausstehend', 11],
    ['gewonnen', 2],
    ['verloren', 2],
  ];

  trainData = [
    ['Anwesend', 11],
    ['Abwesend', 2],
  ];
  width = window.outerWidth * .15;

  trainFocusData = [
    ['Kondition', 2],
    ['Aufschlag', 4],
    ['Annahme', 6],
    ['Block', 3],
    ['Kommunikation', 1]
  ];

  options = {
    backgroundColor: 'transparent',
    chartArea: {
      top: 5,
      left: 5,
      right: 5,
      bottom: 5,
      width: '100%',
    },
    legend: {
      position: 'bottom',
      alignment: 'center',
      textStyle: { color: '#fff', fontSize: 14 },
      pagingTextStyle: {
        color: '#fff'
      },
      scrollArrows: {
        activeColor: '#fff',
        inactiveColor: '#fff'
      }
    },
  };

  constructor(private store: Store<StoreState>, private mediaMatcher: MediaMatcher) { }

  ngOnInit(): void {
    this.team$ = this.store.pipe(select(TeamSelectors.selectTeam));
    this.season$ = this.store.pipe(select(SeasonSelectors.selectSeason));
    this.matches$ = this.store.pipe(select(MatchSelectors.selectMatches));
    this.players$ = this.store.pipe(select(PlayerSelectors.selectPlayers));

    this.season$.pipe(filter(season => !!season), take(1)).subscribe(season => {
      const { teamId, id } = season;
      this.store.dispatch(SeasonActions.loadSeasonById({ id }));
      this.store.dispatch(MatchActions.loadMatches({ teamId, seasonId: id }));
      this.store.dispatch(PlayerActions.loadPlayers({ teamId, seasonId: id }));
    })

    this.matchParticipationChart$ = this.matches$.pipe(map(matches => {
      const pending = matches?.filter(match => match.status === 'Ausstehend').length;
      const won = matches?.filter(match => match.status === 'Gewonnen').length;
      const lost = matches?.filter(match => match.status === 'Verloren').length;
      return [
        ['Ausstehend', pending],
        ['Gewonnen', won],
        ['Verloren', lost],
      ];
    }));

    this.points$ = this.matches$.pipe(map(matches => {
      let scoredPoints = 0;
      let collectedPoints = 0;

      matches.forEach(match => {
        scoredPoints += match.result.scoredPoints;
        collectedPoints += match.result.collectedPoints;
      });
      return { scoredPoints, collectedPoints };
    }));

    this.participations$ = this.matches$.pipe(filter(matches => !!matches), map(matches => {
      let result = {};
      let data = [];

      matches.forEach(match => {
        match.playerParticipations.forEach(playerParticipation => {
          const name = `${playerParticipation.firstname} ${playerParticipation.lastname}`;
          result[name] = {
            name: name,
            percentage: playerParticipation.percentage + (result[name]?.percentage ?? 0),
          };
        });
      });

      Object.keys(result).forEach(key => {
        data.push([result[key].name, result[key].percentage]);
      });

      return data;
    }));

    this.attendance$ = this.matches$.pipe(filter(matches => !!matches), map((matches) => {
      let result = {};
      let data = [];

      matches.forEach(match => {
        match.playerParticipations.forEach(playerParticipation => {
          const name = `${playerParticipation.firstname} ${playerParticipation.lastname}`;
          result[name] = {
            name: name,
            attendance: playerParticipation.didParticipate ? ((result[name]?.attendance ?? 0) + 1) : ((result[name]?.attendance ?? 0) + 0),
          };
        })
      });

      Object.keys(result).forEach(key => {
        data.push([result[key].name, result[key].attendance]);
      });
      return data;
    }));

    const medium = this.mediaMatcher.matchMedia('(min-width: 769px)');
    if (medium.matches) {
      this.options.legend.position = 'right';
      this.options.chartArea.width = '100%';
    }
    medium.addEventListener('change', (event) => {
      if (event.matches) {
        this.options.legend.position = 'right';
        this.options.chartArea.width = '100%';
      }
    });
    this.mediaMatcher.matchMedia('(max-width: 768px)').addEventListener('change', (event) => {
      if (event.matches) {
        this.options.legend.position = 'bottom';
        this.options.chartArea.width = '100%';
      }
    });

    this.weaknesses$ = this.players$.pipe(filter(players => !!players?.length), map(players => {
      let weaknesses = players?.map(player => player.weaknesses) ?? [];
      let combined = weaknesses?.reduce((prev, current) => [...prev, ...current]);
      return combined.sort((a, b) => a.name?.localeCompare(b?.name));
    }));

    this.strengths$ = this.players$.pipe(filter(players => !!players?.length), map(players => {
      let strengths = players?.map(player => player.strengths) ?? [];
      let combined = strengths?.reduce((prev, current) => [...prev, ...current]);
      return combined.sort((a, b) => a.name?.localeCompare(b?.name));
    }));

    this.improvements$ = this.players$.pipe(filter(players => !!players?.length), map(players => {
      let improvements = players?.map(player => player.improvements) ?? [];
      let combined = improvements?.reduce((prev, current) => [...prev, ...current]);
      return combined.sort((a, b) => a.name?.localeCompare(b?.name));
    }));

    this.nextMatch$ = this.matches$.pipe(map(matches => {
      const today = new Date();
      today.setHours(23);
      today.setMinutes(59);
      let min = Number.MAX_SAFE_INTEGER;
      let nextMatch;
      matches.forEach(match => {
        const offset = new Date(match.date.seconds * 1000).valueOf() - today.valueOf();
        if (offset > 0 && offset < min) {
          min = offset;
          nextMatch = match;
        }
      });
      return nextMatch;
    }));
  }
}
