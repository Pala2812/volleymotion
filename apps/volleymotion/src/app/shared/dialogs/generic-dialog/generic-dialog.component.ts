import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'vm-generic-dialog',
  templateUrl: './generic-dialog.component.html',
  styleUrls: ['./generic-dialog.component.scss'],
})
export class GenericDialogComponent implements OnInit {
  @Input() title = '';
  @Input() description = '';

  constructor(private dialogRef: NbDialogRef<GenericDialogComponent>) {}

  ngOnInit(): void {}

  cancel() {
    this.dialogRef.close();
  }
}
