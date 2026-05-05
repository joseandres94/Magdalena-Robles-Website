import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BRAND_INFO } from '../../../data/brand.data';

@Component({
  selector: 'mr-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  brand = BRAND_INFO;
  year = new Date().getFullYear();
}
