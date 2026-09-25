import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { LanguageService } from '../../../core/services/language.service';

export interface TickerItem {
  text: string;
  strong?: boolean;
}

@Component({
  selector: 'mr-ticker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ticker.component.html',
  styleUrl: './ticker.component.scss',
})
export class TickerComponent {
  private readonly lang = inject(LanguageService);
  @Input() items: TickerItem[] = [];
  @Input() dark = true;

  get displayItems(): TickerItem[] {
    const source = this.items.length ? this.items : this.defaultItems;
    return [...source, ...source];
  }

  private get defaultItems(): TickerItem[] {
    return [
      { text: 'Lobotomy Chic', strong: true },
      { text: '—' },
      { text: this.lang.t('Materiales Circulares', 'Circular Materials') },
      { text: '✦' },
      { text: this.lang.t('Estudio Experimental', 'Experimental Studio') },
      { text: '✦' },
      {
        text: this.lang.t(
          'Artesanía, Sostenibilidad e Innovación',
          'Craftsmanship, Sustainability and Innovation',
        ),
      },
      { text: '✦' },
      { text: this.lang.t('Diseño de Autor', 'Designer Collection') },
      { text: '✦' },
      { text: this.lang.t('Patronaje Creativo', 'Creative Pattern-making') },
      { text: '✦' },
    ];
  }
}
