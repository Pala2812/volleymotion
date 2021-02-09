import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { FeedbackService } from '../shared/services/feedback.service';
@Component({
  selector: 'vm-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
  isSending$ = new Subject<boolean>();
  form: FormGroup;

  constructor(private feedbackService: FeedbackService) {}

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
      const id = this.feedbackService.getId();
      const feedback = { ...form.value, id };

      this.feedbackService.createFeedback(feedback).pipe(
        tap(() => this.isSending$.next(true)),
        finalize(() => this.isSending$.next(false))
      ).subscribe(() => this.resetForm(form));
    }
  }

  resetForm(form: FormGroup) {
    form.reset();
    Object.keys(form).forEach((key) => form.controls[key].setErrors(null));
  }
}