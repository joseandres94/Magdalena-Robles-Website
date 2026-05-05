import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LookDetailComponent } from './look-detail.component';
import { SeoService } from '../../core/services/seo.service';
import { LOOKS_DATA } from '../../data/collection.data';

describe('LookDetailComponent', () => {
  let fixture: ComponentFixture<LookDetailComponent>;
  let component: LookDetailComponent;
  let seoSpy: jasmine.SpyObj<SeoService>;
  let slugValue: string;

  beforeEach(async () => {
    slugValue = 'pedrolino';
    seoSpy = jasmine.createSpyObj<SeoService>('SeoService', ['setPage', 'setLookPage']);

    await TestBed.configureTestingModule({
      imports: [LookDetailComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: SeoService, useValue: seoSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => slugValue } } },
        },
      ],
    })
      .overrideComponent(LookDetailComponent, { set: { imports: [] } })
      .compileComponents();

    fixture = TestBed.createComponent(LookDetailComponent);
    component = fixture.componentInstance;
    // detectChanges is called per-test to allow each test to set its own slug.
  });

  describe('ngOnInit — look resolution', () => {
    it('sets the look signal for a valid slug', () => {
      slugValue = 'pedrolino';
      fixture.detectChanges();

      expect(component.look()?.name).toBe('Pedrolino');
    });

    it('leaves the look signal undefined for an unknown slug', () => {
      slugValue = 'nonexistent-slug';
      fixture.detectChanges();

      expect(component.look()).toBeUndefined();
    });

    it('calls seo.setLookPage with the resolved look', () => {
      slugValue = 'colombina';
      fixture.detectChanges();

      expect(seoSpy.setLookPage).toHaveBeenCalledOnceWith(
        jasmine.objectContaining({ slug: 'colombina' }),
      );
    });

    it('does not call seo.setLookPage when the slug is not found', () => {
      slugValue = 'nonexistent-slug';
      fixture.detectChanges();

      expect(seoSpy.setLookPage).not.toHaveBeenCalled();
    });
  });

  describe('prevLook computed', () => {
    it('is undefined when the look is the first in the collection', () => {
      slugValue = LOOKS_DATA[0].slug; // index 0
      fixture.detectChanges();

      expect(component.prevLook()).toBeUndefined();
    });

    it('returns the look at the previous index', () => {
      slugValue = LOOKS_DATA[1].slug; // index 1
      fixture.detectChanges();

      expect(component.prevLook()?.name).toBe(LOOKS_DATA[0].name);
    });
  });

  describe('nextLook computed', () => {
    it('is undefined when the look is the last in the collection', () => {
      const lastLook = LOOKS_DATA[LOOKS_DATA.length - 1];
      slugValue = lastLook.slug;
      fixture.detectChanges();

      expect(component.nextLook()).toBeUndefined();
    });

    it('returns the look at the next index', () => {
      slugValue = LOOKS_DATA[0].slug; // index 0
      fixture.detectChanges();

      expect(component.nextLook()?.name).toBe(LOOKS_DATA[1].name);
    });
  });
});
