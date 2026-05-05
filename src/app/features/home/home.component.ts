import { Component, type OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroComponent } from './hero/hero.component';
import { MoodboardComponent } from './moodboard/moodboard.component';
import { TickerComponent } from '../../shared/components/ticker/ticker.component';
import { LookCardComponent } from '../../shared/components/look-card/look-card.component';
import { CollectionService } from '../../core/services/collection.service';
import { LanguageService } from '../../core/services/language.service';
import { SeoService } from '../../core/services/seo.service';
import { BRAND_INFO } from '../../data/brand.data';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { LookModalComponent } from '../collection/look-modal/look-modal.component';

@Component({
  selector: 'mr-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    HeroComponent,
    MoodboardComponent,
    TickerComponent,
    LookCardComponent,
    NewsletterComponent,
    LookModalComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  collection = inject(CollectionService);
  lang = inject(LanguageService);
  private seo = inject(SeoService);

  brand = BRAND_INFO;

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Magdalena Robles — Designer & Pattern Maker',
      description:
        'Magdalena Robles — Fashion designer and specialist pattern maker. Lobotomy Chic SS25.',
    });
  }
}
