import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import type { Look } from '../../../core/models/look.model';

@Component({
  selector: 'mr-look-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './look-card.component.html',
  styleUrl: './look-card.component.scss',
})
export class LookCardComponent {
  @Input({ required: true }) look!: Look;
  @Input() index = 0;
  @Output() cardClick = new EventEmitter<Look>();
}
