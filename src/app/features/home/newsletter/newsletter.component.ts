import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, type AbstractControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../../core/services/language.service';
import { FormSubmissionService } from '../../../core/services/form-submission.service';

interface NewsletterState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

@Component({
  selector: 'mr-newsletter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.scss',
})
export class NewsletterComponent {
  readonly lang = inject(LanguageService);
  private readonly fb = inject(FormBuilder).nonNullable;
  private readonly submissions = inject(FormSubmissionService);

  readonly state = signal<NewsletterState>({ loading: false, success: false, error: null });

  readonly form = this.fb.group({
    name: [''],
    email: ['', [Validators.required, Validators.email]],
    interests: this.fb.group({
      collection: [true],
      process: [false],
      press: [false],
      events: [false],
    }),
    acceptPrivacy: [false, Validators.requiredTrue],
  });

  field(name: string): AbstractControl {
    return this.form.get(name)!;
  }

  isInvalid(name: string): boolean {
    const c = this.field(name);
    return c.invalid && (c.dirty || c.touched);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.state.set({ loading: true, success: false, error: null });
    const { name, email, interests } = this.form.getRawValue();
    const selectedInterests = Object.entries(interests)
      .filter(([, selected]) => selected)
      .map(([interest]) => interest);

    this.submissions
      .subscribeToNewsletter({ name, email, interests: selectedInterests })
      .subscribe({
        next: () => {
          this.state.set({ loading: false, success: true, error: null });
          this.resetForm();
        },
        error: () => {
          this.state.set({
            loading: false,
            success: false,
            error: this.lang.t(
              'No se pudo completar la suscripción. Inténtalo de nuevo más tarde.',
              'The subscription could not be completed. Please try again later.',
            ),
          });
        },
      });
  }

  reset(): void {
    this.state.set({ loading: false, success: false, error: null });
    this.resetForm();
  }

  private resetForm(): void {
    this.form.reset({
      interests: { collection: true, process: false, press: false, events: false },
    });
  }
}
