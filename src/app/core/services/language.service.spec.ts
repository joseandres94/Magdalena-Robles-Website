import { TestBed } from '@angular/core/testing';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
  let service: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageService);
  });

  it('initialises with Spanish as the active language', () => {
    expect(service.currentLang()).toBe('es');
  });

  it('isEs is true and isEn is false on init', () => {
    expect(service.isEs()).toBeTrue();
    expect(service.isEn()).toBeFalse();
  });

  it('toggle() switches the language from es to en', () => {
    service.toggle();

    expect(service.currentLang()).toBe('en');
    expect(service.isEn()).toBeTrue();
    expect(service.isEs()).toBeFalse();
  });

  it('toggle() called twice returns to es', () => {
    service.toggle();
    service.toggle();

    expect(service.currentLang()).toBe('es');
  });

  it('t() returns the Spanish string when language is es', () => {
    expect(service.t('Hola', 'Hello')).toBe('Hola');
  });

  it('t() returns the English string when language is en', () => {
    service.toggle();

    expect(service.t('Hola', 'Hello')).toBe('Hello');
  });

  it('navItems exposes Spanish labels by default', () => {
    const items = service.navItems();

    expect(items[0].label).toBe('Colección');
    expect(items[1].label).toBe('Diseñadora');
  });

  it('navItems switches to English labels after toggle()', () => {
    service.toggle();
    const items = service.navItems();

    expect(items[0].label).toBe('Collection');
    expect(items[1].label).toBe('About');
  });
});
