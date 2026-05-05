import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AboutComponent } from './about.component';
import { SeoService } from '../../core/services/seo.service';
import { BRAND_INFO, PROCESS_STEPS } from '../../data/brand.data';

describe('AboutComponent', () => {
  let fixture: ComponentFixture<AboutComponent>;
  let component: AboutComponent;
  let seoSpy: jasmine.SpyObj<SeoService>;

  beforeEach(async () => {
    seoSpy = jasmine.createSpyObj<SeoService>('SeoService', ['setPage', 'setLookPage']);

    await TestBed.configureTestingModule({
      imports: [AboutComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: SeoService, useValue: seoSpy },
        provideRouter([]),
      ],
    })
      .overrideComponent(AboutComponent, { set: { imports: [] } })
      .compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('sets SEO title and description for the about page on init', () => {
    expect(seoSpy.setPage).toHaveBeenCalledOnceWith({
      title: 'Sobre la diseñadora',
      description:
        'Magdalena Robles — Fashion designer and specialist pattern maker. Couture construction, experimental pattern-making, circular materials.',
    });
  });

  it('exposes the BRAND_INFO constant', () => {
    expect(component.brand).toBe(BRAND_INFO);
  });

  it('exposes all process steps', () => {
    expect(component.processSteps).toEqual(PROCESS_STEPS);
    expect(component.processSteps.length).toBe(4);
  });
});
