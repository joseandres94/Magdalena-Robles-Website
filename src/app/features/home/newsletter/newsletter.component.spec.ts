import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NewsletterComponent } from './newsletter.component';

describe('NewsletterComponent', () => {
  let fixture: ComponentFixture<NewsletterComponent>;
  let component: NewsletterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsletterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('form structure', () => {
    it('has email, acceptPrivacy and interests controls', () => {
      expect(component.form.contains('email')).toBeTrue();
      expect(component.form.contains('acceptPrivacy')).toBeTrue();
      expect(component.form.contains('interests')).toBeTrue();
    });

    it('interests.collection defaults to true', () => {
      expect(component.form.get('interests.collection')?.value).toBeTrue();
    });
  });

  describe('validation', () => {
    it('email is required', () => {
      component.field('email').setValue('');
      expect(component.field('email').hasError('required')).toBeTrue();
    });

    it('email must be a valid address', () => {
      component.field('email').setValue('not-an-email');
      expect(component.field('email').hasError('email')).toBeTrue();
    });

    it('acceptPrivacy must be true', () => {
      component.field('acceptPrivacy').setValue(false);
      expect(component.field('acceptPrivacy').invalid).toBeTrue();
    });
  });

  describe('isInvalid()', () => {
    it('returns false for a pristine field', () => {
      expect(component.isInvalid('email')).toBeFalse();
    });

    it('returns true for an invalid field after it is touched', () => {
      component.field('email').markAsTouched();
      expect(component.isInvalid('email')).toBeTrue();
    });

    it('returns true for an invalid field after it is dirtied', () => {
      component.field('email').setValue('bad');
      component.field('email').markAsDirty();
      expect(component.isInvalid('email')).toBeTrue();
    });
  });

  describe('onSubmit()', () => {
    it('marks all fields as touched and does not succeed when form is invalid', () => {
      component.onSubmit();

      expect(component.form.touched).toBeTrue();
      expect(component.state().success).toBeFalse();
    });

    it('sets loading true immediately when the form is valid', fakeAsync(() => {
      component.field('email').setValue('test@example.com');
      component.field('acceptPrivacy').setValue(true);

      component.onSubmit();

      expect(component.state().loading).toBeTrue();
      tick(1200);
    }));

    it('transitions to success and resets the form after 1200 ms', fakeAsync(() => {
      component.field('email').setValue('test@example.com');
      component.field('acceptPrivacy').setValue(true);

      component.onSubmit();
      tick(1200);

      expect(component.state().loading).toBeFalse();
      expect(component.state().success).toBeTrue();
      expect(component.field('email').value).toBeNull();
    }));

    it('preserves interests.collection as true after reset', fakeAsync(() => {
      component.field('email').setValue('test@example.com');
      component.field('acceptPrivacy').setValue(true);

      component.onSubmit();
      tick(1200);

      expect(component.form.get('interests.collection')?.value).toBeTrue();
    }));
  });

  describe('reset()', () => {
    it('clears the success state and resets the form', fakeAsync(() => {
      component.field('email').setValue('test@example.com');
      component.field('acceptPrivacy').setValue(true);
      component.onSubmit();
      tick(1200);

      component.reset();

      expect(component.state().success).toBeFalse();
      expect(component.field('email').value).toBeNull();
      expect(component.form.get('interests.collection')?.value).toBeTrue();
    }));
  });
});
