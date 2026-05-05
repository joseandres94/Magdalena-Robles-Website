import {
  Component,
  type OnInit,
  inject,
  ChangeDetectionStrategy,
  signal,
  computed,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CollectionService } from '../../core/services/collection.service';
import { SeoService } from '../../core/services/seo.service';
import { LanguageService } from '../../core/services/language.service';
import { LookNumberPipe } from '../../shared/pipes/look-number.pipe';
import type { Look } from '../../core/models/look.model';

@Component({
  selector: 'mr-look-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, LookNumberPipe],
  templateUrl: './look-detail.component.html',
  styleUrl: './look-detail.component.scss',
})
export class LookDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private collection = inject(CollectionService);
  private seo = inject(SeoService);
  lang = inject(LanguageService);

  readonly look = signal<Look | undefined>(undefined);

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

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    const found = this.collection.getLookBySlug(slug);
    this.look.set(found);
    if (found) this.seo.setLookPage(found);
  }
}
