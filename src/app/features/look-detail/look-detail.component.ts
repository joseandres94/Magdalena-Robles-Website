import { Component, inject, ChangeDetectionStrategy, computed, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { CollectionService } from '../../core/services/collection.service';
import { SeoService } from '../../core/services/seo.service';
import { LanguageService } from '../../core/services/language.service';
import { LookNumberPipe } from '../../shared/pipes/look-number.pipe';
import type { Look } from '../../core/models/look.model';
import { ImageFallbackDirective } from '../../shared/directives/image-fallback.directive';

@Component({
  selector: 'mr-look-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, LookNumberPipe, ImageFallbackDirective],
  templateUrl: './look-detail.component.html',
  styleUrl: './look-detail.component.scss',
})
export class LookDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly collection = inject(CollectionService);
  private readonly seo = inject(SeoService);
  readonly lang = inject(LanguageService);

  private readonly slug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('slug') ?? '')),
    { initialValue: this.route.snapshot.paramMap.get('slug') ?? '' },
  );
  readonly look = computed(() => this.collection.getLookBySlug(this.slug()));

  readonly prevLook = computed<Look | undefined>(() => {
    const current = this.look();
    if (!current) return undefined;
    const idx = this.collection.looks().findIndex((l) => l.slug === current.slug);
    return idx > 0 ? this.collection.looks()[idx - 1] : undefined;
  });

  readonly nextLook = computed<Look | undefined>(() => {
    const current = this.look();
    if (!current) return undefined;
    const looks = this.collection.looks();
    const idx = looks.findIndex((l) => l.slug === current.slug);
    return idx < looks.length - 1 ? looks[idx + 1] : undefined;
  });

  constructor() {
    effect(() => {
      this.lang.currentLang();
      const look = this.look();
      if (look) {
        this.seo.setLookPage(look);
      } else {
        this.seo.setPage({
          title: this.lang.t('Look no encontrado', 'Look not found'),
          description: this.lang.t(
            'El look solicitado no existe.',
            'The requested look does not exist.',
          ),
          noIndex: true,
        });
      }
    });
  }
}
