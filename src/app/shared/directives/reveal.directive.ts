import {
  Directive, ElementRef, OnInit, OnDestroy, Renderer2, inject,
} from '@angular/core';

/**
 * mrReveal — adds .revealed class when element enters viewport.
 * Usage: <div mrReveal> ... </div>
 * CSS: [mrReveal] { opacity:0; transform:translateY(12px); transition: ... }
 *      [mrReveal].revealed { opacity:1; transform:none; }
 */
@Directive({
  selector: '[mrReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  private el       = inject(ElementRef);
  private renderer = inject(Renderer2);
  private observer!: IntersectionObserver;

  ngOnInit(): void {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      this.renderer.addClass(this.el.nativeElement, 'revealed');
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.renderer.addClass(this.el.nativeElement, 'revealed');
          this.observer.unobserve(this.el.nativeElement);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
