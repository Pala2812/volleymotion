import { Component, OnInit } from '@angular/core';
import { TrainingMatch } from '@volleymotion/models';

@Component({
  selector: 'vm-training-match-detail',
  templateUrl: './training-match-detail.component.html',
  styleUrls: ['./training-match-detail.component.scss'],
})
export class TrainingMatchDetailComponent implements OnInit {
  trainingMatch: TrainingMatch | undefined;
  constructor() {}

  ngOnInit(): void {}
}
