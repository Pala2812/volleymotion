import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import de from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';
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
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { effects } from './core/store/effects';
import { reducers, metaReducers } from './core/store/reducers';
import { LayoutModule } from './core/layout/layout.module';
import {
  NbThemeModule,
  NbSidebarModule,
  NbMenuModule,
  NbTimepickerModule,
  NbDatepickerModule,
  NbToastrModule,
  NbDialogModule,
  NbLayoutModule,
} from '@nebular/theme';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AngularMaterialModule } from './shared/angular-material/angular-material.module';
import { AppInitService } from './core/services/app-init.service';

registerLocaleData(de, 'de-DE');

export function initializeApp(appInitService: AppInitService) {
  return (): Promise<any> => {
    return appInitService.init();
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictActionImmutability: true,
        strictActionTypeUniqueness: true,
        strictActionWithinNgZone: true,
        strictStateImmutability: true,
      },
      metaReducers,
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
    NbEvaIconsModule,
    NbLayoutModule,
    AngularMaterialModule,
    NbMenuModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDateFnsDateModule.forRoot({ format: 'dd.MM.yyyy' }),
    NbTimepickerModule.forRoot(),
    NbToastrModule.forRoot({ preventDuplicates: true, duration: 2000 }),
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbDialogModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'auto' },
    },
    {
      provide: LOCALE_ID,
      useValue: 'de-DE',
    },
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppInitService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
