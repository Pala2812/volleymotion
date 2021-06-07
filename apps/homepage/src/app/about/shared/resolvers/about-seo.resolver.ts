import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { SeoService } from '../../../core/services/seo.service';

@Injectable()
export class AboutSeoResolver implements Resolve<any> {
  constructor(private seoService: SeoService) {}

  resolve(): Promise<any> | any {
    this.seoService.clearMeta();
    this.seoService.setTitle('Volleymotion - Die Mission der Digitalisierung');
    this.seoService.setTags([
      'Volleyball',
      'Digitalisierung',
      'Volleyballtraining',
      'Volleyballverein',
      'Volleyballtrainer',
      'Trainingsverwaltung',
    ]);
    this.seoService.setDescription(
      'Volleymotion ist ein Projekt um die Digitalisierung im Volleyballbereich voranzutreiben!'
    );
    return {};
  }
}
