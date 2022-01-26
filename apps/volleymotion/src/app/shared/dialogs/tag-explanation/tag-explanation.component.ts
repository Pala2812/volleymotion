import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'vm-tag-explanation',
  templateUrl: './tag-explanation.component.html',
  styleUrls: ['./tag-explanation.component.scss'],
})
export class TagExplanationComponent implements OnInit {
  constructor(private dialogRef: NbDialogRef<TagExplanationComponent>) {}

  ngOnInit(): void {}

  cancel() {
    this.dialogRef.close();
  }
}
