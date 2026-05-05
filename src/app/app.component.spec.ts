import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { SeoService } from './core/services/seo.service';
import { CollectionService } from './core/services/collection.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let seoSpy: jasmine.SpyObj<SeoService>;
  let collection: CollectionService;

  beforeEach(async () => {
    seoSpy = jasmine.createSpyObj<SeoService>('SeoService', ['setPage', 'setLookPage']);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: SeoService, useValue: seoSpy }, provideRouter([])],
    })
      .overrideComponent(AppComponent, { set: { imports: [] } })
      .compileComponents();

    collection = TestBed.inject(CollectionService);
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('calls seo.setPage({}) on init to set default metadata', () => {
    expect(seoSpy.setPage).toHaveBeenCalledOnceWith({});
  });

  it('does not render the look modal when no look is active', () => {
    expect(fixture.nativeElement.querySelector('mr-look-modal')).toBeNull();
  });

  it('renders the look modal when a look becomes active', () => {
    collection.openLook(0);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('mr-look-modal')).not.toBeNull();
  });

  it('hides the look modal again once the look is closed', () => {
    collection.openLook(0);
    fixture.detectChanges();

    collection.closeLook();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('mr-look-modal')).toBeNull();
  });
});
