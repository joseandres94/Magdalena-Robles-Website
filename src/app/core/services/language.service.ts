import { Injectable, signal, computed } from '@angular/core';
import type { Language } from '../models/navigation.model';
import { NAVIGATION_ITEMS } from '../../data/navigation.data';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly _lang = signal<Language>('es');

  readonly currentLang = computed(() => this._lang());
  readonly isEs = computed(() => this._lang() === 'es');
  readonly isEn = computed(() => this._lang() === 'en');

  readonly navItems = computed(() =>
    NAVIGATION_ITEMS.map((item) => ({
      ...item,
      label: this._lang() === 'es' ? item.labelEs : item.labelEn,
    })),
  );

  toggle(): void {
    this._lang.update((l) => (l === 'es' ? 'en' : 'es'));
  }

  t(es: string, en: string): string {
    return this._lang() === 'es' ? es : en;
  }
}
