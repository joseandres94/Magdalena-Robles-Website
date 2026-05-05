export type ContactReason =
  | 'press'
  | 'styling'
  | 'collaboration'
  | 'bespoke'
  | 'other';

export interface ContactForm {
  name: string;
  email: string;
  reason: ContactReason | '';
  subject?: string;
  message: string;
  acceptPrivacy: boolean;
}

export interface ContactFormState {
  loading: boolean;
  success: boolean;
  error: string | null;
}
