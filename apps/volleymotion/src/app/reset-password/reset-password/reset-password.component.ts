import { Component, OnInit } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'vm-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  constructor(private auth: AngularFireAuth, private toastService: NbToastrService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.initForm();
  }

  initForm() {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  sendEmail(form: FormGroup) {
    if (form.valid) {
      const { email } = form.value;
      this.auth.sendPasswordResetEmail(email)
        .then(() => this.router.navigate(['login']))
        .then(() => this.toastService.success('E-Mail wurde versendet'))
        .catch(error => this.toastService.danger(error?.message));
    }
  }

}
