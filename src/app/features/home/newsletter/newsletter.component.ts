import {
  Component,
  inject,
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, type AbstractControl } from '@angular/forms';
import { LanguageService } from '../../../core/services/language.service';

interface NewsletterState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

@Component({
  selector: 'mr-newsletter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.scss',
})
export class NewsletterComponent {
  lang = inject(LanguageService);
  private fb = inject(FormBuilder);

  readonly state = signal<NewsletterState>({ loading: false, success: false, error: null });

  readonly form = this.fb.group({
    name: [''],
    email: ['', [Validators.required, Validators.email]],
    interests: this.fb.group({
      collection: [true],
      process:    [false],
      press:      [false],
      events:     [false],
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

    // Simulate async submit — replace with real service call
    setTimeout(() => {
      this.state.set({ loading: false, success: true, error: null });
      this.form.reset({ interests: { collection: true, process: false, press: false, events: false } });
    }, 1200);
  }

  reset(): void {
    this.state.set({ loading: false, success: false, error: null });
    this.form.reset({ interests: { collection: true, process: false, press: false, events: false } });
  }
}
