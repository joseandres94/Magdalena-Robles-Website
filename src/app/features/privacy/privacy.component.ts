import { ChangeDetectionStrategy, Component, type OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BRAND_INFO } from '../../data/brand.data';
import { LanguageService } from '../../core/services/language.service';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'mr-privacy',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss',
})
export class PrivacyComponent implements OnInit {
  readonly lang = inject(LanguageService);
  readonly brand = BRAND_INFO;
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setPage({
      title: this.lang.t('Política de privacidad', 'Privacy policy'),
      description: this.lang.t(
        'Información sobre el tratamiento de datos personales en Magdalena Robles.',
        'Information about personal data processing at Magdalena Robles.',
      ),
      noIndex: false,
    });
  }
}
