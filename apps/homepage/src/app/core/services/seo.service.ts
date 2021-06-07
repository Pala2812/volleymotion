import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(private title: Title, private meta: Meta) {}

  setTitle(title: string) {
    this.title.setTitle(title);
    this.meta.addTag({ property: 'og:title', content: title });
  }

  setTags(tags: string[]) {
    this.meta.addTag({ property: 'tags', content: tags.join(' ') });
  }

  setDescription(content: string = '') {
    this.meta.addTag({ property: 'description', content });
    this.meta.addTag({ property: 'og:description', content });
  }

  setImage(url: string) {
    this.meta.addTag({ property: 'og:image', content: url });
  }

  clearMeta() {
    this.meta.removeTag('description');
    this.meta.removeTag('tags');
    this.meta.removeTag("property='og:title'");
    this.meta.removeTag("property='og:description'");
    this.meta.removeTag("property='og:image'");
  }
}
