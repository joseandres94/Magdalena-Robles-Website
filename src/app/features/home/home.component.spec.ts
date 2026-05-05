import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home.component';
import { SeoService } from '../../core/services/seo.service';
import { BRAND_INFO } from '../../data/brand.data';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let seoSpy: jasmine.SpyObj<SeoService>;

  beforeEach(async () => {
    seoSpy = jasmine.createSpyObj<SeoService>('SeoService', ['setPage', 'setLookPage']);

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: SeoService, useValue: seoSpy },
        provideRouter([]),
      ],
    })
      .overrideComponent(HomeComponent, { set: { imports: [] } })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('sets SEO description for the home page on init', () => {
    expect(seoSpy.setPage).toHaveBeenCalledOnceWith({
      description:
        'Magdalena Robles — Fashion designer and specialist pattern maker. Lobotomy Chic SS25.',
    });
  });

  it('exposes the BRAND_INFO constant', () => {
    expect(component.brand).toBe(BRAND_INFO);
  });
});
