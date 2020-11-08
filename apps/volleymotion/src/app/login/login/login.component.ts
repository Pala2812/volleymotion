import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'vm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.initForm();
  }

  initForm(): FormGroup {
    return new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login(form: FormGroup) {
    if (form.valid) {
      const controls = form.controls;
      const email = controls.email.value;
      const password = controls.password.value;

      this.authService
        .signInWithEmailAndPassword(email, password)
        .subscribe(() => this.router.navigate(['turniere']));
    }
  }
}
