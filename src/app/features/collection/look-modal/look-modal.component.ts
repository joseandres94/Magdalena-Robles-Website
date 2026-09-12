import {
  type AfterViewInit,
  Component,
  type ElementRef,
  Input,
  Output,
  EventEmitter,
  type OnInit,
  type OnDestroy,
  HostListener,
  ChangeDetectionStrategy,
  PLATFORM_ID,
  inject,
  viewChild,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import type { Look } from '../../../core/models/look.model';
import { trigger, style, animate, transition } from '@angular/animations';
import { LookNumberPipe } from '../../../shared/pipes/look-number.pipe';
import { LanguageService } from '../../../core/services/language.service';
import { ImageFallbackDirective } from '../../../shared/directives/image-fallback.directive';

@Component({
  selector: 'mr-look-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LookNumberPipe, RouterLink, ImageFallbackDirective],
  templateUrl: './look-modal.component.html',
  styleUrl: './look-modal.component.scss',
  animations: [
    trigger('modalEnter', [
      transition(':enter', [style({ opacity: 0 }), animate('0.25s ease', style({ opacity: 1 }))]),
      transition(':leave', [animate('0.2s ease', style({ opacity: 0 }))]),
    ]),
    trigger('panelEnter', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(24px)' }),
        animate(
          '0.35s cubic-bezier(0.16,1,0.3,1)',
          style({ opacity: 1, transform: 'translateY(0)' }),
        ),
      ]),
    ]),
  ],
})
export class LookModalComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly lang = inject(LanguageService);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly dialog = viewChild<ElementRef<HTMLDivElement>>('dialog');
  private previousFocus: HTMLElement | null = null;

  @Input({ required: true }) look!: Look;
  @Input() currentIndex = 0;
  @Input() totalLooks = 0;
  @Output() dismiss = new EventEmitter<void>();
  @Output() navigate = new EventEmitter<1 | -1>();

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.previousFocus = this.document.activeElement as HTMLElement | null;
    this.document.body.style.overflow = 'hidden';
    this.setPageInert(true);
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    queueMicrotask(() => {
      this.dialog()?.nativeElement.querySelector<HTMLElement>('.modal-close')?.focus();
    });
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.document.body.style.overflow = '';
    this.setPageInert(false);
    this.previousFocus?.focus();
  }

  @HostListener('document:keydown', ['$event'])
  onKey(e: KeyboardEvent): void {
    if (e.key === 'Escape') this.dismiss.emit();
    if (e.key === 'ArrowRight') this.navigate.emit(1);
    if (e.key === 'ArrowLeft') this.navigate.emit(-1);
    if (e.key === 'Tab') this.trapFocus(e);
  }

  get hasPrev(): boolean {
    return this.currentIndex > 0;
  }
  get hasNext(): boolean {
    return this.currentIndex < this.totalLooks - 1;
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) this.dismiss.emit();
  }

  private trapFocus(event: KeyboardEvent): void {
    const focusable = this.dialog()?.nativeElement.querySelectorAll<HTMLElement>(
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

  private setPageInert(inert: boolean): void {
    for (const selector of ['mr-header', '#main-content', 'mr-footer']) {
      this.document.querySelector(selector)?.toggleAttribute('inert', inert);
    }
  }
}
