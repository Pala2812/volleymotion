import { Component, OnInit } from '@angular/core';
import { Tag, TagProposal } from '@volleymotion/models';
import { Observable, Subject } from 'rxjs';

import { TagProposalService } from '../shared/services.service';

@Component({
  selector: 'vm-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
})
export class TagListComponent implements OnInit {
  isLoadingProposals$ = new Subject<boolean>();
  isLoadingTags$ = new Subject<boolean>();
  tagProposals$: Observable<TagProposal[]>;
  tags$: Observable<Tag[]>;

  constructor(private tagProposalService: TagProposalService) {}

  ngOnInit(): void {
    this.tagProposals$ = this.tagProposalService.getTagProposals();
    this.tags$ = this.tagProposalService.getTags();
  }
}
