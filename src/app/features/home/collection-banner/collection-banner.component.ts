import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ImageFallbackDirective } from '../../../shared/directives/image-fallback.directive';

@Component({
  selector: 'mr-collection-banner',
  imports: [ImageFallbackDirective],
  templateUrl: './collection-banner.component.html',
  styleUrl: './collection-banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionBannerComponent {}
