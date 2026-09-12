import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import type { Look } from '../../../core/models/look.model';
import { LookNumberPipe } from '../../pipes/look-number.pipe';
import { LanguageService } from '../../../core/services/language.service';
import { ImageFallbackDirective } from '../../directives/image-fallback.directive';

@Component({
  selector: 'mr-look-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LookNumberPipe, RouterLink, ImageFallbackDirective],
  templateUrl: './look-card.component.html',
  styleUrl: './look-card.component.scss',
})
export class LookCardComponent {
  readonly lang = inject(LanguageService);
  @Input({ required: true }) look!: Look;
  @Input() index = 0;
  @Output() cardClick = new EventEmitter<Look>();
}
