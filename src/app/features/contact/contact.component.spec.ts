import { type ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ContactComponent } from './contact.component';
import { SeoService } from '../../core/services/seo.service';

describe('ContactComponent', () => {
  let fixture: ComponentFixture<ContactComponent>;
  let component: ContactComponent;
  let seoSpy: jasmine.SpyObj<SeoService>;

  beforeEach(async () => {
    seoSpy = jasmine.createSpyObj<SeoService>('SeoService', ['setPage', 'setLookPage']);

    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [{ provide: SeoService, useValue: seoSpy }, provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('SEO', () => {
    it('sets SEO with the contact title on init', () => {
      expect(seoSpy.setPage).toHaveBeenCalledOnceWith(
        jasmine.objectContaining({ title: 'Contacto' }),
      );
    });
  });

  describe('form structure', () => {
    it('has all required form controls', () => {
      ['name', 'email', 'reason', 'message', 'acceptPrivacy'].forEach((ctrl) => {
        expect(component.form.contains(ctrl)).withContext(ctrl).toBeTrue();
      });
    });

    it('reasons list contains all expected options', () => {
      const values = component.reasons.map((r) => r.value);
      expect(values).toEqual(['press', 'styling', 'collaboration', 'bespoke', 'other']);
    });
  });

  describe('validation', () => {
    it('name is required', () => {
      component.field('name').setValue('');
      expect(component.field('name').hasError('required')).toBeTrue();
    });

    it('name must be at least 2 characters', () => {
      component.field('name').setValue('A');
      expect(component.field('name').hasError('minlength')).toBeTrue();
    });

    it('email is required', () => {
      component.field('email').setValue('');
      expect(component.field('email').hasError('required')).toBeTrue();
    });

    it('email must be a valid address', () => {
      component.field('email').setValue('not-an-email');
      expect(component.field('email').hasError('email')).toBeTrue();
    });

    it('reason is required', () => {
      component.field('reason').setValue('');
      expect(component.field('reason').hasError('required')).toBeTrue();
    });

    it('message must be at least 10 characters', () => {
      component.field('message').setValue('Short');
      expect(component.field('message').hasError('minlength')).toBeTrue();
    });

    it('acceptPrivacy must be true', () => {
      component.field('acceptPrivacy').setValue(false);
      expect(component.field('acceptPrivacy').invalid).toBeTrue();
    });
  });

  describe('isInvalid()', () => {
    it('returns false for a pristine field', () => {
      expect(component.isInvalid('name')).toBeFalse();
    });

    it('returns true for a required field that has been touched', () => {
      component.field('name').markAsTouched();
      expect(component.isInvalid('name')).toBeTrue();
    });
  });

  describe('onSubmit()', () => {
    it('marks all fields as touched when the form is invalid', () => {
      component.onSubmit();
      expect(component.form.touched).toBeTrue();
    });

    it('sets loading true immediately when the form is valid', fakeAsync(() => {
      fillValidForm(component);
      component.onSubmit();

      expect(component.formState().loading).toBeTrue();
      tick(1200);
    }));

    it('transitions to success after 1200 ms', fakeAsync(() => {
      fillValidForm(component);
      component.onSubmit();
      tick(1200);

      expect(component.formState().loading).toBeFalse();
      expect(component.formState().success).toBeTrue();
    }));
  });
});

function fillValidForm(component: ContactComponent): void {
  component.field('name').setValue('Ana García');
  component.field('email').setValue('ana@example.com');
  component.field('reason').setValue('press');
  component.field('message').setValue('Me gustaría colaborar en un editorial de moda.');
  component.field('acceptPrivacy').setValue(true);
}
