import { Component, type OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { SeoService } from '../../core/services/seo.service';
import { TickerComponent } from '../../shared/components/ticker/ticker.component';
import { BRAND_INFO, PROCESS_STEPS } from '../../data/brand.data';

@Component({
  selector: 'mr-about',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, TickerComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit {
  lang = inject(LanguageService);
  private seo = inject(SeoService);

  brand = BRAND_INFO;
  processSteps = PROCESS_STEPS;

  /**
   * Retrato en la columna izquierda de /about.
   * 1) Guarda tu imagen en `src/assets/about/` (p. ej. `designer-portrait.jpg`).
   * 2) Pon aquí la ruta pública, p. ej. `'assets/about/designer-portrait.jpg'`.
   * Cadena vacía = se muestra el placeholder (silueta + texto).
   */
  readonly aboutPortraitSrc = 'assets/about/magdalena-about.jpg';

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Sobre la diseñadora',
      description:
        'Magdalena Robles — Fashion designer and specialist pattern maker. Couture construction, experimental pattern-making, circular materials.',
    });
  }
}
