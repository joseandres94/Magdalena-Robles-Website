import { ChangeDetectionStrategy, Component, type OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/layout/header/header.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { SeoService } from './core/services/seo.service';
import { CollectionService } from './core/services/collection.service';
import { LookModalComponent } from './features/collection/look-modal/look-modal.component';

@Component({
  selector: 'mr-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, LookModalComponent],
  template: `
    <mr-header />
    <main id="main-content">
      <router-outlet />
    </main>
    <mr-footer />
    @if (collection.activeLook(); as look) {
      <mr-look-modal
        [look]="look"
        [currentIndex]="collection.activeLookIndex()!"
        [totalLooks]="collection.totalLooks()"
        (dismiss)="collection.closeLook()"
        (navigate)="collection.navigateLook($event)"
      />
    }
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
      }
      main {
        display: block;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  private seo = inject(SeoService);
  collection = inject(CollectionService);

  ngOnInit(): void {
    this.seo.setPage({});
  }
}
