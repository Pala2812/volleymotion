import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { fil } from 'date-fns/locale';

@Component({
  selector: 'vm-training-match-filter',
  templateUrl: './training-match-filter.component.html',
  styleUrls: ['./training-match-filter.component.scss'],
})
export class TrainingMatchFilterComponent implements OnInit {
  divisions = [
    '1. Bundesliga',
    '2. Bundensliga',
    '3. Liga',
    'Regionalliga',
    'Oberliga',
    'Verbandsliga',
    'Landesliga',
    'Bezirksliga',
    'Bezirksklasse',
    'Kreisliga',
    'Kreisklasse',
    'Jugend',
    'Senioren',
    'Hobby / Mixed',
  ];
  teamTypes = ['Damen', 'Herren', 'Jugend', 'Senioren', 'Hobby / Mixed'];
  sportTypes = ['Hallenvolleyball', 'Beachvolleyball', 'Snowvolleyball'];
  form: FormGroup;

  constructor(private dialogRef: NbDialogRef<TrainingMatchFilterComponent>) {}

  ngOnInit(): void {
    this.form = this.initForm();
  }

  initForm() {
    return new FormGroup({
      sportType: new FormControl(''),
      teamType: new FormControl(''),
      division: new FormControl(''),
    });
  }

  applyFilters(form: FormGroup) {
    const filters = form.value;
    Object.keys(filters).forEach((key) => {
      if (!!filters[key] === false) {
        delete filters[key];
      }
    });
    this.dialogRef.close(filters);
  }

  resetFilters() {
    this.dialogRef.close('reset');
  }

  cancel() {
    this.dialogRef.close();
  }
}
