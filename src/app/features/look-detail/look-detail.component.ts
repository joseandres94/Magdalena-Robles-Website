import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CollectionService } from '../../core/services/collection.service';
import { SeoService } from '../../core/services/seo.service';
import { LanguageService } from '../../core/services/language.service';
import type { Look } from '../../core/models/look.model';

@Component({
  selector: 'mr-look-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, CommonModule],
  templateUrl: './look-detail.component.html',
  styleUrl: './look-detail.component.scss',
})
export class LookDetailComponent implements OnInit {
  private route      = inject(ActivatedRoute);
  private collection = inject(CollectionService);
  private seo        = inject(SeoService);
  lang               = inject(LanguageService);

  look: Look | undefined;

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.look = this.collection.getLookBySlug(slug);
    if (this.look) this.seo.setLookPage(this.look);
  }

  get prevLook(): Look | undefined {
    if (!this.look) return undefined;
    const idx = this.collection.looks().findIndex(l => l.slug === this.look!.slug);
    return idx > 0 ? this.collection.looks()[idx - 1] : undefined;
  }

  get nextLook(): Look | undefined {
    if (!this.look) return undefined;
    const idx = this.collection.looks().findIndex(l => l.slug === this.look!.slug);
    const looks = this.collection.looks();
    return idx < looks.length - 1 ? looks[idx + 1] : undefined;
  }
}
