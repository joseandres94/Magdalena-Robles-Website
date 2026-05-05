import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CollectionComponent } from './collection.component';
import { SeoService } from '../../core/services/seo.service';

describe('CollectionComponent', () => {
  let fixture: ComponentFixture<CollectionComponent>;
  let seoSpy: jasmine.SpyObj<SeoService>;

  beforeEach(async () => {
    seoSpy = jasmine.createSpyObj<SeoService>('SeoService', ['setPage', 'setLookPage']);

    await TestBed.configureTestingModule({
      imports: [CollectionComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: SeoService, useValue: seoSpy },
        provideRouter([]),
      ],
    })
      .overrideComponent(CollectionComponent, { set: { imports: [] } })
      .compileComponents();

    fixture = TestBed.createComponent(CollectionComponent);
    fixture.detectChanges();
  });

  it('creates the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('sets SEO title and description for the collection page on init', () => {
    expect(seoSpy.setPage).toHaveBeenCalledOnceWith({
      title: 'Colección — Lobotomy Chic SS25',
      description:
        "Lobotomy Chic — Primera colección de Magdalena Robles. Commedia dell'Arte reinterpretada a través de siluetas históricas, construcción experimental y materiales circulares.",
    });
  });
});
