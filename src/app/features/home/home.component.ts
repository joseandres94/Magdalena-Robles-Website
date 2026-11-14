import { Component, type OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroComponent } from './hero/hero.component';
import { MoodboardComponent } from './moodboard/moodboard.component';
import { LookCardComponent } from '../../shared/components/look-card/look-card.component';
import { CollectionService } from '../../core/services/collection.service';
import { LanguageService } from '../../core/services/language.service';
import { SeoService } from '../../core/services/seo.service';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { CollectionBannerComponent } from './collection-banner/collection-banner.component';
@Component({
  selector: 'mr-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    HeroComponent,
    MoodboardComponent,
    LookCardComponent,
    NewsletterComponent,
    CollectionBannerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  readonly collection = inject(CollectionService);
  readonly lang = inject(LanguageService);
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setPage({
      description:
        'Magdalena Robles — Fashion designer and specialist pattern maker. Lobotomy Chic.',
    });
  }
}
