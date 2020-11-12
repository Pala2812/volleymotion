import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';

import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EffectsModule } from '@ngrx/effects';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { QuillModule } from 'ngx-quill';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { effects } from './core/store/effects';
import { reducers } from './core/store/reducers';
import { LayoutModule } from './core/layout/layout.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictActionImmutability: true,
        strictActionTypeUniqueness: true,
        strictActionWithinNgZone: true,
        strictStateImmutability: true,
      },
    }),
    EffectsModule.forRoot(effects),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    QuillModule.forRoot(),
    MatNativeDateModule,
    LayoutModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'auto' },
    },
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
