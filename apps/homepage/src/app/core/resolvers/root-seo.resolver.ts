import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { SeoService } from '../../core/services/seo.service';

@Injectable()
export class RootSeoResolver implements Resolve<any> {
  constructor(private seoService: SeoService) {}

  resolve(): Promise<any> | any {
    this.seoService.clearMeta();
    this.seoService.setTitle('Volleymotion - Die Plattform für Volleyballer!');
    this.seoService.setTags([
      'Volleyball',
      'Volley',
      'Beachvolleyball',
      'Hallenvolleyball',
      'Digitalisierung',
      'Volleyballtraining',
      'Volleyballverein',
      'Volleyballtrainer',
      'Trainingsverwaltung',
    ]);
    this.seoService.setDescription(
      `Volleymotion ist eine moderne Plattform für Volleyballtrainer und Volleyballspieler. 
      Als Community-Projekt hilft Volleymotion bei der Digitalisierung von Angeboten rund um Volleyball!`
    );
    return {};
  }
}
