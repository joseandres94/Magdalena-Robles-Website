import {
  Component, Input, Output, EventEmitter, type OnInit, type OnDestroy,
  HostListener, ChangeDetectionStrategy,
} from '@angular/core';
import type { Look } from '../../../core/models/look.model';
import { trigger, style, animate, transition } from '@angular/animations';
import { LookNumberPipe } from '../../../shared/pipes/look-number.pipe';

@Component({
  selector: 'mr-look-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LookNumberPipe],
  templateUrl: './look-modal.component.html',
  styleUrl: './look-modal.component.scss',
  animations: [
    trigger('modalEnter', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.25s ease', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('0.2s ease', style({ opacity: 0 })),
      ]),
    ]),
    trigger('panelEnter', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(24px)' }),
        animate('0.35s cubic-bezier(0.16,1,0.3,1)', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class LookModalComponent implements OnInit, OnDestroy {
  @Input({ required: true }) look!: Look;
  @Input() currentIndex = 0;
  @Input() totalLooks = 6;
  @Output() dismiss = new EventEmitter<void>();
  @Output() navigate = new EventEmitter<1 | -1>();

  ngOnInit(): void {
    document.body.style.overflow = 'hidden';
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown', ['$event'])
  onKey(e: KeyboardEvent): void {
    if (e.key === 'Escape')      this.dismiss.emit();
    if (e.key === 'ArrowRight')  this.navigate.emit(1);
    if (e.key === 'ArrowLeft')   this.navigate.emit(-1);
  }

  get hasPrev(): boolean { return this.currentIndex > 0; }
  get hasNext(): boolean { return this.currentIndex < this.totalLooks - 1; }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) this.dismiss.emit();
  }
}
