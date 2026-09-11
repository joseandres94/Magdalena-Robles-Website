import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BRAND_INFO } from '../../../data/brand.data';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'mr-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly brand = BRAND_INFO;
  readonly lang = inject(LanguageService);
  readonly year = new Date().getFullYear();
}
