import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import type { Language } from '../models/navigation.model';
import { NAVIGATION_ITEMS } from '../../data/navigation.data';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly _lang = signal<Language>(this.readInitialLanguage());

  readonly currentLang = computed(() => this._lang());
  readonly isEs = computed(() => this._lang() === 'es');
  readonly isEn = computed(() => this._lang() === 'en');

  readonly navItems = computed(() =>
    NAVIGATION_ITEMS.map((item) => ({
      ...item,
      label: this._lang() === 'es' ? item.labelEs : item.labelEn,
    })),
  );

  constructor() {
    this.document.documentElement.lang = this._lang();
  }

  toggle(): void {
    this.set(this._lang() === 'es' ? 'en' : 'es');
  }

  set(language: Language): void {
    this._lang.set(language);
    this.document.documentElement.lang = language;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('mr-language', language);
    }
  }

  t(es: string, en: string): string {
    return this._lang() === 'es' ? es : en;
  }

  private readInitialLanguage(): Language {
    if (!isPlatformBrowser(this.platformId)) return 'es';
    return localStorage.getItem('mr-language') === 'en' ? 'en' : 'es';
  }
}
