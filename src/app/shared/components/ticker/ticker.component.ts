import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

export interface TickerItem {
  text: string;
  strong?: boolean;
}

@Component({
  selector: 'mr-ticker',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ticker.component.html',
  styleUrl: './ticker.component.scss',
})
export class TickerComponent {
  @Input() items: TickerItem[] = [
    { text: 'Lobotomy Chic', strong: true },
    { text: '—' },
    { text: 'Primera Colección' },
    { text: '✦' },
    { text: 'Designer & Pattern Maker' },
    { text: '✦' },
    { text: "Commedia dell'Arte", strong: true },
    { text: '—' },
    { text: 'Reinterpretada' },
    { text: '✦' },
    { text: 'Almería — España' },
    { text: '✦' },
    { text: 'Couture / Ready-to-wear' },
    { text: '✦' },
    { text: 'Materiales Circulares', strong: true },
    { text: '✦' },
    { text: 'Impresión 3D & Corte Láser' },
    { text: '✦' },
    { text: 'Lobotomy Chic', strong: true },
    { text: '—' },
    { text: 'Primera Colección' },
    { text: '✦' },
    { text: 'Designer & Pattern Maker' },
    { text: '✦' },
    { text: "Commedia dell'Arte", strong: true },
    { text: '—' },
    { text: 'Reinterpretada' },
    { text: '✦' },
    { text: 'Almería — España' },
    { text: '✦' },
    { text: 'Couture / Ready-to-wear' },
    { text: '✦' },
    { text: 'Materiales Circulares', strong: true },
    { text: '✦' },
    { text: 'Impresión 3D & Corte Láser' },
  ];

  @Input() dark = true;
}
