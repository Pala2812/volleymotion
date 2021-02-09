import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { TagProposalService } from '../shared/services.service';
@Component({
  selector: 'vm-tag-create',
  templateUrl: './tag-create.component.html',
  styleUrls: ['./tag-create.component.scss'],
})
export class TagCreateComponent implements OnInit {
  isSending$ = new Subject<boolean>();
  form: FormGroup;

  constructor(
    private tagProposalService: TagProposalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.initForm();
  }

  initForm() {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });
  }

  submit(form: FormGroup) {
    if (form.valid) {
      const id = this.tagProposalService.getId();
      const tagProposal = { ...form.value, id };
      this.tagProposalService
        .addTagProposal(tagProposal)
        .pipe(
          tap(() => this.isSending$.next(true)),
          finalize(() => this.isSending$.next(false))
        )
        .subscribe(() => this.router.navigate(['tags']));
    }
  }
}
