import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LanguageService } from '../../../core/services/language.service';
import { ImageFallbackDirective } from '../../../shared/directives/image-fallback.directive';

@Component({
  selector: 'mr-moodboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ImageFallbackDirective],
  templateUrl: './moodboard.component.html',
  styleUrl: './moodboard.component.scss',
})
export class MoodboardComponent {
  readonly lang = inject(LanguageService);
}
