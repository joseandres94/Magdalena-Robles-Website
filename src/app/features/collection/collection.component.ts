import { Component, type OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CollectionService } from '../../core/services/collection.service';
import { LanguageService } from '../../core/services/language.service';
import { SeoService } from '../../core/services/seo.service';
import { LookCardComponent } from '../../shared/components/look-card/look-card.component';

@Component({
  selector: 'mr-collection',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LookCardComponent],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss',
})
export class CollectionComponent implements OnInit {
  readonly collection = inject(CollectionService);
  readonly lang = inject(LanguageService);
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Colección — Lobotomy Chic SS25',
      description:
        "Lobotomy Chic — Primera colección de Magdalena Robles. Commedia dell'Arte reinterpretada a través de siluetas históricas, construcción experimental y materiales circulares.",
    });
  }
}
