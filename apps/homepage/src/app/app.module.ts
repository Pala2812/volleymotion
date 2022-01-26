import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { CardComponent } from './core/layout/card/card.component';
import { LandingPageComponent } from './core/layout/landing-page/landing-page.component';
import { RootSeoResolver } from './core/resolvers/root-seo.resolver';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingPageComponent,
    FooterComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RouterModule.forRoot(
      [
        {
          path: '',
          component: LandingPageComponent,
          resolve: [RootSeoResolver],
        },
        {
          path: 'about',
          loadChildren: () =>
            import('./about/about.module').then((m) => m.AboutModule),
        },
        {
          path: 'impressum',
          loadChildren: () =>
            import('./impressum/impressum.module').then(
              (m) => m.ImpressumModule
            ),
        },
        {
          path: 'datenschutz',
          loadChildren: () =>
            import('./datenschutz/datenschutz.module').then(
              (m) => m.DatenschutzModule
            ),
        },
      ],
      { initialNavigation: 'enabled' }
    ),
  ],
  providers: [RootSeoResolver],
  bootstrap: [AppComponent],
})
export class AppModule {}
