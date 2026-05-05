import { Component, type OnInit, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, type AbstractControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { SeoService } from '../../core/services/seo.service';
import { BRAND_INFO } from '../../data/brand.data';
import type { ContactFormState } from '../../core/models/contact.model';

@Component({
  selector: 'mr-contact',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  private fb = inject(FormBuilder);
  lang = inject(LanguageService);
  private seo = inject(SeoService);

  brand = BRAND_INFO;

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

    this.formState.set({ loading: true, success: false, error: null });

    // Simulate async send (replace with real service call)
    setTimeout(() => {
      this.formState.set({ loading: false, success: true, error: null });
      this.form.reset();
    }, 1200);
  }
}
