import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CollectionService } from '../../../core/services/collection.service';
import { LanguageService } from '../../../core/services/language.service';
import { ImageFallbackDirective } from '../../../shared/directives/image-fallback.directive';

@Component({
  selector: 'mr-moodboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ImageFallbackDirective],
  templateUrl: './moodboard.component.html',
  styleUrl: './moodboard.component.scss',
})
export class MoodboardComponent {
  readonly collection = inject(CollectionService);
  readonly lang = inject(LanguageService);
}
