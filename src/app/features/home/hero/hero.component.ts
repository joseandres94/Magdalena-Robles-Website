import {
  Component, OnInit, AfterViewInit, inject,
  ChangeDetectionStrategy, signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { trigger, style, animate, transition, query } from '@angular/animations';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'mr-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  animations: [
    trigger('heroEnter', [
      transition(':enter', [
        query('.hero-ctas', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          animate('0.7s cubic-bezier(0.16,1,0.3,1)', style({ opacity: 1, transform: 'translateY(0)' })),
        ], { optional: true }),
      ]),
    ]),
  ],
})
export class HeroComponent implements OnInit, AfterViewInit {
  lang = inject(LanguageService);
  readonly ready = signal(false);

  /** Imagen de fondo del hero: coloca el archivo en `src/assets/hero/` con este nombre, o cambia la ruta. Cadena vacía = sin foto. */
  readonly heroBackdropSrc = '/assets/hero/hero-backdrop.jpg';

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => this.ready.set(true), 80);
  }
}
