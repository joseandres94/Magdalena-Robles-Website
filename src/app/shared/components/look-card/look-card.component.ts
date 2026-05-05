import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import type { Look } from '../../../core/models/look.model';
import { LookNumberPipe } from '../../pipes/look-number.pipe';

@Component({
  selector: 'mr-look-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LookNumberPipe],
  templateUrl: './look-card.component.html',
  styleUrl: './look-card.component.scss',
})
export class LookCardComponent {
  @Input({ required: true }) look!: Look;
  @Input() index = 0;
  @Output() cardClick = new EventEmitter<Look>();
}
