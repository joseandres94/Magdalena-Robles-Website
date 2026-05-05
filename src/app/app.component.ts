import { ChangeDetectionStrategy, Component, type OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/layout/header/header.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { SeoService } from './core/services/seo.service';

@Component({
  selector: 'mr-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <mr-header />
    <main id="main-content">
      <router-outlet />
    </main>
    <mr-footer />
  `,
  styles: [`
    :host { display: block; min-height: 100vh; }
    main  { display: block; }
  `],
})
export class AppComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setPage({});
  }
}
