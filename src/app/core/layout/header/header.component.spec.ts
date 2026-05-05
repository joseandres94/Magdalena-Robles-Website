import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { HeaderComponent } from './header.component';
import { LanguageService } from '../../services/language.service';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;
  let routerEvents$: Subject<NavigationEnd>;
  let routerMock: { url: string; events: Subject<NavigationEnd> };

  beforeEach(async () => {
    routerEvents$ = new Subject<NavigationEnd>();
    routerMock = { url: '/', events: routerEvents$ };

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: Router, useValue: routerMock }],
    })
      .overrideComponent(HeaderComponent, { set: { imports: [] } })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    // detectChanges is called per-test so each test controls the initial router URL.
  });

  afterEach(() => {
    // Remove any own scrollY property added during scroll tests.
    delete (window as Record<string, unknown>)['scrollY'];
  });

  // ── isHomePage signal ───────────────────────────────────────────────

  describe('isHomePage signal', () => {
    it('is true when the initial router URL is "/"', () => {
      routerMock.url = '/';
      fixture.detectChanges();

      expect(component.isHomePage()).toBeTrue();
    });

    it('is true when navigated to the empty root path via NavigationEnd', () => {
      routerMock.url = '/something';
      fixture.detectChanges();

      routerEvents$.next(new NavigationEnd(1, '', ''));

      expect(component.isHomePage()).toBeTrue();
    });

    it('is false for any non-root route', () => {
      routerMock.url = '/collection';
      fixture.detectChanges();

      expect(component.isHomePage()).toBeFalse();
    });

    it('updates reactively when NavigationEnd fires', () => {
      routerMock.url = '/';
      fixture.detectChanges();
      expect(component.isHomePage()).toBeTrue();

      routerEvents$.next(new NavigationEnd(2, '/about', '/about'));

      expect(component.isHomePage()).toBeFalse();
    });
  });

  // ── isTransparent computed ──────────────────────────────────────────

  describe('isTransparent computed', () => {
    it('is true on the home page before any scrolling', () => {
      routerMock.url = '/';
      fixture.detectChanges(); // scrollY=0 in test env → scrolled=false

      expect(component.isTransparent()).toBeTrue();
    });

    it('is false on any non-home page regardless of scroll', () => {
      routerMock.url = '/collection';
      fixture.detectChanges();

      expect(component.isTransparent()).toBeFalse();
    });

    it('is false when on the home page and scrolled past the hero', () => {
      routerMock.url = '/';
      fixture.detectChanges();

      Object.defineProperty(window, 'scrollY', { configurable: true, value: 9999 });
      component.onScroll();

      expect(component.isTransparent()).toBeFalse();
    });
  });

  // ── onScroll() ──────────────────────────────────────────────────────

  describe('onScroll()', () => {
    it('sets scrolled to true when scrollY exceeds the hero height threshold', () => {
      routerMock.url = '/';
      fixture.detectChanges();

      Object.defineProperty(window, 'scrollY', { configurable: true, value: 9999 });
      component.onScroll();

      expect(component.scrolled()).toBeTrue();
    });

    it('does nothing when the current page is not the home page', () => {
      routerMock.url = '/collection';
      fixture.detectChanges();

      Object.defineProperty(window, 'scrollY', { configurable: true, value: 9999 });
      component.onScroll();

      expect(component.scrolled()).toBeFalse();
    });
  });

  // ── mobile menu ─────────────────────────────────────────────────────

  describe('mobile menu', () => {
    beforeEach(() => {
      routerMock.url = '/';
      fixture.detectChanges();
    });

    it('toggleMobile() sets mobileOpen to true when it was false', () => {
      expect(component.mobileOpen()).toBeFalse();

      component.toggleMobile();

      expect(component.mobileOpen()).toBeTrue();
    });

    it('toggleMobile() called twice returns mobileOpen to false', () => {
      component.toggleMobile();
      component.toggleMobile();

      expect(component.mobileOpen()).toBeFalse();
    });

    it('closeMobile() sets mobileOpen to false', () => {
      component.toggleMobile();
      expect(component.mobileOpen()).toBeTrue();

      component.closeMobile();

      expect(component.mobileOpen()).toBeFalse();
    });
  });

  // ── language toggle ─────────────────────────────────────────────────

  describe('toggleLang()', () => {
    it('delegates to LanguageService.toggle()', () => {
      routerMock.url = '/';
      fixture.detectChanges();

      const langService = TestBed.inject(LanguageService);
      spyOn(langService, 'toggle');

      component.toggleLang();

      expect(langService.toggle).toHaveBeenCalledOnce();
    });
  });

  // ── lifecycle ───────────────────────────────────────────────────────

  describe('ngOnDestroy()', () => {
    it('unsubscribes from router events to prevent memory leaks', () => {
      routerMock.url = '/';
      fixture.detectChanges();

      fixture.destroy();

      // After destroy, a NavigationEnd event must not update the component.
      routerEvents$.next(new NavigationEnd(1, '/collection', '/collection'));

      expect(component.isHomePage()).toBeTrue(); // unchanged — subscription is gone
    });
  });
});
