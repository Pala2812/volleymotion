import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { PasswordErrorMatcher } from '../password-error-matcher';

@Component({
  selector: 'vm-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  passwordMatcher = new PasswordErrorMatcher();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signUpForm = this.initSignUpForm();
  }

  initSignUpForm(): FormGroup {
    return new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        passwordMatch: new FormControl(''),
      },
      { validators: [this.validatePassword] }
    );
  }

  validatePassword(group: FormGroup) {
    const password = group.get('password').value;
    const passwordMatch = group.get('passwordMatch').value;

    return password === passwordMatch ? null : { mismatch: true };
  }

  signUpWithEmailAndPassword(form: FormGroup) {
    if (form.valid) {
      const controls = form.controls;
      const email = controls.email.value;
      const password = controls.password.value;
      this.authService
        .createUserWithEmailAndPassword(email, password)
        .subscribe(() => this.router.navigate(['turniere']));
    }
  }
}
