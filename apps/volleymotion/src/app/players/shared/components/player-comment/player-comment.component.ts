import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlayerComment } from '@volleymotion/models';

@Component({
  selector: 'vm-player-comment',
  templateUrl: './player-comment.component.html',
  styleUrls: ['./player-comment.component.scss']
})
export class PlayerCommentComponent implements OnInit {
  @Output() deletePlayerComment = new EventEmitter<PlayerComment>();
  @Input() playerComment: PlayerComment | undefined;

  constructor() { }

  ngOnInit(): void { }

  onDeleteItem(playerComment: PlayerComment | undefined) {
    this.deletePlayerComment.next(playerComment);
  }
}
