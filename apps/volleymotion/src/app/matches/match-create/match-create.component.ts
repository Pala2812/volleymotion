import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'vm-match-create',
  templateUrl: './match-create.component.html',
  styleUrls: ['./match-create.component.scss'],
})
export class MatchCreateComponent implements OnInit {
  form: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.form = this.initForm();
  }

  initForm() {
    return new FormGroup({
      opponent: new FormControl(''),
      startTime: new FormControl(''),
    });
  }
}
