import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import type { Look } from '../models/look.model';

export interface SeoData {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

const BASE_TITLE = 'Magdalena Robles';
const BASE_DESC =
  'Fashion designer and specialist pattern maker based in Almería. First collection: Lobotomy Chic SS25.';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);

  setPage(data: Partial<SeoData>): void {
    const t = data.title ? `${data.title} — ${BASE_TITLE}` : BASE_TITLE;
    const d = data.description ?? BASE_DESC;

    this.title.setTitle(t);
    this.meta.updateTag({ name: 'description', content: d });
    this.meta.updateTag({ property: 'og:title', content: t });
    this.meta.updateTag({ property: 'og:description', content: d });
    if (data.image) {
      this.meta.updateTag({ property: 'og:image', content: data.image });
    }
  }

  setLookPage(look: Look): void {
    this.setPage({
      title: `${look.name} — Lobotomy Chic SS25`,
      description: look.editorialDescription,
    });
  }
}
