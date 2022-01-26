import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'vm-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent implements OnInit {
  title: string | undefined;
  message: string | undefined;

  constructor(private dialogRef: NbDialogRef<DeleteDialogComponent>) {}

  ngOnInit(): void {}

  cancel() {
    this.dialogRef.close();
  }

  delete() {
    this.dialogRef.close(true);
  }
}
