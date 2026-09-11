import { Component, type OnInit, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, type AbstractControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { SeoService } from '../../core/services/seo.service';
import { FormSubmissionService } from '../../core/services/form-submission.service';
import { BRAND_INFO } from '../../data/brand.data';
import type { ContactFormState } from '../../core/models/contact.model';

@Component({
  selector: 'mr-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  private readonly fb = inject(FormBuilder).nonNullable;
  private readonly submissions = inject(FormSubmissionService);
  readonly lang = inject(LanguageService);
  private readonly seo = inject(SeoService);

  readonly brand = BRAND_INFO;

  readonly formState = signal<ContactFormState>({ loading: false, success: false, error: null });

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    reason: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]],
    acceptPrivacy: [false, Validators.requiredTrue],
  });

  readonly reasons = [
    { value: 'press', label: 'Prensa', labelEn: 'Press' },
    { value: 'styling', label: 'Estilismo', labelEn: 'Styling' },
    { value: 'collaboration', label: 'Colaboración', labelEn: 'Collaboration' },
    { value: 'bespoke', label: 'Pedido a medida', labelEn: 'Bespoke order' },
    { value: 'other', label: 'Otro', labelEn: 'Other' },
  ];

  ngOnInit(): void {
    this.seo.setPage({
      title: this.lang.t('Contacto', 'Contact'),
      description:
        'Contacta con Magdalena Robles para colaboraciones, prensa, estilismo o pedidos a medida.',
    });
  }

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

    const values = this.form.getRawValue();
    const payload = {
      name: values.name,
      email: values.email,
      reason: values.reason,
      message: values.message,
    };
    this.formState.set({ loading: true, success: false, error: null });

    this.submissions.submitContact(payload).subscribe({
      next: () => {
        this.formState.set({ loading: false, success: true, error: null });
        this.form.reset();
      },
      error: () => {
        this.formState.set({
          loading: false,
          success: false,
          error: this.lang.t(
            'No se pudo enviar el mensaje. Escríbenos directamente por email.',
            'The message could not be sent. Please email us directly.',
          ),
        });
      },
    });
  }
}
