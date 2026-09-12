import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { APP_ENVIRONMENT, type AppEnvironment } from '../app-environment';
import { FormSubmissionService } from './form-submission.service';

describe('FormSubmissionService', () => {
  let service: FormSubmissionService;
  let http: HttpTestingController;

  const environment: AppEnvironment = {
    production: false,
    publicUrl: 'http://localhost:4200',
    contactEndpoint: '/api/contact',
    newsletterEndpoint: '/api/newsletter',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: APP_ENVIRONMENT, useValue: environment },
      ],
    });
    service = TestBed.inject(FormSubmissionService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('posts contact submissions to the configured endpoint', () => {
    const payload = {
      name: 'Ana',
      email: 'ana@example.com',
      reason: 'press',
      message: 'Editorial enquiry',
    };

    service.submitContact(payload).subscribe();

    const request = http.expectOne('/api/contact');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(payload);
    request.flush(null);
  });

  it('posts newsletter subscriptions to the configured endpoint', () => {
    const payload = {
      name: 'Ana',
      email: 'ana@example.com',
      interests: ['collection'],
    };

    service.subscribeToNewsletter(payload).subscribe();

    const request = http.expectOne('/api/newsletter');
    expect(request.request.method).toBe('POST');
    request.flush(null);
  });
});
