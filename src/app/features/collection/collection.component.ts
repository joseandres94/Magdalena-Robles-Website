import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CollectionService } from '../../core/services/collection.service';
import { LanguageService } from '../../core/services/language.service';
import { SeoService } from '../../core/services/seo.service';
import { LookCardComponent } from '../../shared/components/look-card/look-card.component';
import { LookModalComponent } from './look-modal/look-modal.component';

@Component({
  selector: 'mr-collection',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, LookCardComponent, LookModalComponent],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss',
})
export class CollectionComponent implements OnInit {
  collection = inject(CollectionService);
  lang       = inject(LanguageService);
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Colección — Lobotomy Chic SS25',
      description: "Lobotomy Chic — Primera colección de Magdalena Robles. Commedia dell'Arte reinterpretada a través de siluetas históricas, construcción experimental y materiales circulares.",
    });
  }
}
