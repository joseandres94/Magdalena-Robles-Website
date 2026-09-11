import {
  DestroyRef,
  type ElementRef,
  Component,
  type OnInit,
  HostListener,
  PLATFORM_ID,
  signal,
  computed,
  inject,
  ChangeDetectionStrategy,
  viewChild,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'mr-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  readonly lang = inject(LanguageService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly mobileMenu = viewChild<ElementRef<HTMLDivElement>>('mobileMenu');
  private readonly burger = viewChild<ElementRef<HTMLButtonElement>>('burger');

  readonly isHomePage = signal(false);
  readonly mobileOpen = signal(false);
  readonly scrolled = signal(false);
  readonly isTransparent = computed(() => this.isHomePage() && !this.scrolled());

  ngOnInit(): void {
    this.checkRoute(this.router.url);
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((e) => this.checkRoute((e as NavigationEnd).url));
  }

  private checkRoute(url: string): void {
    const isHome = url === '/' || url === '';
    this.isHomePage.set(isHome);
    if (isHome && isPlatformBrowser(this.platformId)) {
      this.scrolled.set(window.scrollY > window.innerHeight * 0.85);
    }
    this.closeMobile(false);
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (!this.isHomePage() || !isPlatformBrowser(this.platformId)) return;
    const hero = this.document.getElementById('hero-section');
    const heroH = hero ? hero.offsetHeight : window.innerHeight;
    this.scrolled.set(window.scrollY > heroH - 80);
  }

  toggleMobile(): void {
    this.mobileOpen() ? this.closeMobile() : this.openMobile();
  }

  closeMobile(restoreFocus = true): void {
    if (!this.mobileOpen()) return;
    this.mobileOpen.set(false);
    this.setPageInert(false);
    if (isPlatformBrowser(this.platformId)) {
      this.document.body.style.overflow = '';
      if (restoreFocus) this.burger()?.nativeElement.focus();
    }
  }

  toggleLang(): void {
    this.lang.toggle();
  }

  @HostListener('document:keydown', ['$event'])
  onDocumentKeydown(event: KeyboardEvent): void {
    if (!this.mobileOpen()) return;
    if (event.key === 'Escape') {
      this.closeMobile();
      return;
    }
    if (event.key !== 'Tab') return;

    const focusable = this.mobileMenu()?.nativeElement.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable?.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && this.document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && this.document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  private openMobile(): void {
    this.mobileOpen.set(true);
    this.setPageInert(true);
    if (isPlatformBrowser(this.platformId)) {
      this.document.body.style.overflow = 'hidden';
      queueMicrotask(() => {
        this.mobileMenu()?.nativeElement.querySelector<HTMLElement>('.mobile-close')?.focus();
      });
    }
  }

  private setPageInert(inert: boolean): void {
    this.document.getElementById('main-content')?.toggleAttribute('inert', inert);
    this.document.querySelector('mr-footer')?.toggleAttribute('inert', inert);
  }
}
