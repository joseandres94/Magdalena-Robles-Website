import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import type { Look } from '../models/look.model';
import { APP_ENVIRONMENT } from '../app-environment';

export interface SeoData {
  title: string;
  description: string;
  image?: string;
  url?: string;
  noIndex?: boolean;
}

const BRAND_NAME = 'Magdalena Robles';
const BASE_TITLE = `${BRAND_NAME} — Designer & Pattern Maker`;
const BASE_DESC =
  'Fashion designer and specialist pattern maker based in Almería. First collection: Lobotomy Chic SS25.';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private document = inject(DOCUMENT);
  private environment = inject(APP_ENVIRONMENT);

  setPage(data: Partial<SeoData>): void {
    const t = data.title ? `${data.title} — ${BRAND_NAME}` : BASE_TITLE;
    const d = data.description ?? BASE_DESC;
    const path = data.url ?? this.document.location?.pathname ?? '/';
    const canonicalUrl = new URL(path, this.environment.publicUrl).toString();
    const image = new URL(
      data.image ?? '/assets/placeholders/hero-placeholder.svg',
      this.environment.publicUrl,
    ).toString();

    this.title.setTitle(t);
    this.meta.updateTag({ name: 'description', content: d });
    this.meta.updateTag({ property: 'og:title', content: t });
    this.meta.updateTag({ property: 'og:description', content: d });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: t });
    this.meta.updateTag({ name: 'twitter:description', content: d });
    this.meta.updateTag({ name: 'twitter:image', content: image });
    this.meta.updateTag({
      name: 'robots',
      content: data.noIndex ? 'noindex, nofollow' : 'index, follow',
    });
    this.updateCanonical(canonicalUrl);
    this.updateStructuredData(canonicalUrl);
  }

  setLookPage(look: Look): void {
    const isEnglish = this.document.documentElement.lang === 'en';
    this.setPage({
      title: `${look.name} — Lobotomy Chic SS25`,
      description: isEnglish ? look.editorialDescriptionEn : look.editorialDescription,
      image: look.images[0]?.src,
      url: `/collection/${look.slug}`,
    });
  }

  private updateCanonical(url: string): void {
    let canonical = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }
    canonical.href = url;
  }

  private updateStructuredData(url: string): void {
    const id = 'mr-structured-data';
    let script = this.document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = this.document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: BRAND_NAME,
      jobTitle: 'Fashion Designer & Pattern Maker',
      url,
      homeLocation: { '@type': 'Place', name: 'Almería, España' },
    });
  }
}
