import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { type Observable, throwError } from 'rxjs';
import { APP_ENVIRONMENT } from '../app-environment';

export interface ContactSubmission {
  name: string;
  email: string;
  reason: string;
  message: string;
}

export interface NewsletterSubmission {
  name: string;
  email: string;
  interests: string[];
}

@Injectable({ providedIn: 'root' })
export class FormSubmissionService {
  private readonly http = inject(HttpClient);
  private readonly environment = inject(APP_ENVIRONMENT);

  submitContact(payload: ContactSubmission): Observable<void> {
    return this.post(this.environment.contactEndpoint, payload);
  }

  subscribeToNewsletter(payload: NewsletterSubmission): Observable<void> {
    return this.post(this.environment.newsletterEndpoint, payload);
  }

  private post(endpoint: string, payload: object): Observable<void> {
    if (!endpoint) {
      return throwError(() => new Error('FORM_ENDPOINT_NOT_CONFIGURED'));
    }

    return this.http.post<void>(endpoint, payload);
  }
}
