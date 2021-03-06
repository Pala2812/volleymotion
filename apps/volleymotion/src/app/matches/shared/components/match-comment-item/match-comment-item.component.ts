import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatchComment } from '@volleymotion/models';

@Component({
  selector: 'vm-match-comment-item',
  templateUrl: './match-comment-item.component.html',
  styleUrls: ['./match-comment-item.component.scss']
})
export class MatchCommentItemComponent implements OnInit {
  @Output() deleteMatchComment = new EventEmitter<MatchComment>();
  @Input() matchComment: MatchComment;

  constructor() { }

  ngOnInit(): void {
  }

  onDeleteItem(matchComment: MatchComment) {
    this.deleteMatchComment.next(matchComment);
  }
}
