import { ChangeDetectionStrategy, Component, type OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'mr-not-found',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <section class="not-found" aria-labelledby="not-found-title">
      <span class="mr-eyebrow">Error 404</span>
      <h1 id="not-found-title">
        {{ lang.t('Esta pieza no existe.', 'This piece does not exist.') }}
      </h1>
      <p>
        {{
          lang.t(
            'La página que buscas se ha movido o nunca formó parte de la colección.',
            'The page you are looking for has moved or was never part of the collection.'
          )
        }}
      </p>
      <a routerLink="/" class="btn-line">{{ lang.t('Volver al inicio', 'Back home') }} →</a>
    </section>
  `,
  styles: `
    :host {
      display: block;
      min-height: 100vh;
      background: var(--mr-paper);
    }
    .not-found {
      display: grid;
      place-content: center;
      justify-items: start;
      min-height: 100vh;
      padding: 8rem 1.5rem;
    }
    h1 {
      max-width: 12ch;
      margin: 1.5rem 0;
      font-family: var(--font-display);
      font-size: clamp(3rem, 8vw, 7rem);
      line-height: 0.9;
      letter-spacing: -0.05em;
    }
    p {
      max-width: 48ch;
      margin-bottom: 2rem;
      line-height: 1.7;
      opacity: 0.65;
    }
  `,
})
export class NotFoundComponent implements OnInit {
  readonly lang = inject(LanguageService);
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setPage({
      title: this.lang.t('Página no encontrada', 'Page not found'),
      description: this.lang.t(
        'La página solicitada no existe.',
        'The requested page does not exist.',
      ),
      noIndex: true,
    });
  }
}
