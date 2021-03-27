import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
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
    private router: Router,
    private toastService: NbToastrService
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

      if (this.router.url.includes('abc-erstellen')) {
        delete tagProposal.description;
        this.tagProposalService.addTag(tagProposal).subscribe(() => {
          this.router.navigate(['tags']);
        });
        return;
      }
      
      this.tagProposalService
        .addTagProposal(tagProposal)
        .pipe(
          tap(() => this.isSending$.next(true)),
          finalize(() => this.isSending$.next(false))
        )
        .subscribe(() => {
          this.router.navigate(['tags']);
          this.toastService.success(
            'Vielen Dank für deinen Beitrag :)',
            'Danke!'
          );
        });
    }
  }
}
