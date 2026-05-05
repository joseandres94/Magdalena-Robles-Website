import {
  Component,
  type OnInit,
  type OnDestroy,
  HostListener,
  signal,
  computed,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter, type Subscription } from 'rxjs';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'mr-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  lang = inject(LanguageService);
  private router = inject(Router);
  private sub!: Subscription;

  readonly isHomePage = signal(false);
  readonly mobileOpen = signal(false);
  readonly scrolled = signal(false);
  readonly isTransparent = computed(() => this.isHomePage() && !this.scrolled());

  ngOnInit(): void {
    this.checkRoute(this.router.url);
    this.sub = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => this.checkRoute((e as NavigationEnd).url));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private checkRoute(url: string): void {
    const isHome = url === '/' || url === '';
    this.isHomePage.set(isHome);
    if (isHome) this.scrolled.set(window.scrollY > window.innerHeight * 0.85);
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (!this.isHomePage()) return;
    const hero = document.getElementById('hero-section');
    const heroH = hero ? hero.offsetHeight : window.innerHeight;
    this.scrolled.set(window.scrollY > heroH - 80);
  }

  toggleMobile(): void {
    this.mobileOpen.update((v) => !v);
  }

  closeMobile(): void {
    this.mobileOpen.set(false);
  }

  toggleLang(): void {
    this.lang.toggle();
  }
}
