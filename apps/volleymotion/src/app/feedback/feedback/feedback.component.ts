import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'vm-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
  form: FormGroup;
  constructor() {}

  ngOnInit(): void {
    this.form = this.initForm();
  }

  initForm() {
    return new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  submit(form: FormGroup) {
    if (form.valid) {
      const feedback = form.value;

      // send feedback

      this.resetForm(form);
    }
  }

  resetForm(form: FormGroup) {
    form.reset();
    Object.keys(form).forEach((key) => form.controls[key].setErrors(null));
  }
}
