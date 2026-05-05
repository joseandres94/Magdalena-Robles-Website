import {
  Component, Input, Output, EventEmitter, OnInit, OnDestroy,
  HostListener, ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import type { Look } from '../../../core/models/look.model';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'mr-look-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink],
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
  @Output() close = new EventEmitter<void>();
  @Output() navigate = new EventEmitter<1 | -1>();

  ngOnInit(): void {
    document.body.style.overflow = 'hidden';
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown', ['$event'])
  onKey(e: KeyboardEvent): void {
    if (e.key === 'Escape')      this.close.emit();
    if (e.key === 'ArrowRight')  this.navigate.emit(1);
    if (e.key === 'ArrowLeft')   this.navigate.emit(-1);
  }

  get hasPrev(): boolean { return this.currentIndex > 0; }
  get hasNext(): boolean { return this.currentIndex < this.totalLooks - 1; }
}
