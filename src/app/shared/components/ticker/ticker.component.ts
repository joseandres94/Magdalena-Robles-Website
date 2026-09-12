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
      { text: this.lang.t('Primera colección', 'First collection') },
      { text: '✦' },
      { text: 'Designer & Pattern Maker' },
      { text: '✦' },
      { text: "Commedia dell'Arte", strong: true },
      { text: '—' },
      { text: this.lang.t('Reinterpretada', 'Reinterpreted') },
      { text: '✦' },
      { text: this.lang.t('Almería — España', 'Almería — Spain') },
      { text: '✦' },
      { text: 'Couture / Ready-to-wear' },
      { text: '✦' },
      { text: this.lang.t('Materiales circulares', 'Circular materials'), strong: true },
      { text: '✦' },
      { text: this.lang.t('Impresión 3D & corte láser', '3D printing & laser cutting') },
      { text: '✦' },
    ];
  }
}
