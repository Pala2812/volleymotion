import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Subject } from 'rxjs';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'vm-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.scss'],
})
export class ConfirmAccountComponent implements OnInit {
  isLoading$ = new Subject<boolean>();
  error: any | undefined;
  mode: string | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private auth: AngularFireAuth,
    private authService: AuthService,
    private toastService: NbToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      this.mode = queryParams?.mode;

      if (queryParams?.mode === 'verifyEmail') {
        this.verifyEmail(queryParams?.email, queryParams?.oobCode);
      }
    });
  }

  verifyEmail(email: string, oobCode: string) {
    if (!oobCode) {
      return;
    }

    this.isLoading$.next(true);
    this.auth
      .applyActionCode(oobCode)
      .then(() => this.authService.confirmAccount(email))
      .then(() => {
        this.isLoading$.next(false);
        this.toastService.success(
          'Dein Account wurde bestätigt :), Account Bestätigung',
          { duration: 5000 }
        );
        setTimeout(() => {
          this.router.navigate(['']);
        }, 3000);
      })
      .catch((error) => {
        this.isLoading$.next(false);
        this.toastService.danger(error.message, 'Fehler', {
          duration: 5000,
        });
        this.error = error;
      });
  }
}
