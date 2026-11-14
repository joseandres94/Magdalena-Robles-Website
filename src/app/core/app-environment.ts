import { InjectionToken } from '@angular/core';

export interface AppEnvironment {
  production: boolean;
  publicUrl: string;
  contactEndpoint: string;
  newsletterEndpoint: string;
}

export const APP_ENVIRONMENT = new InjectionToken<AppEnvironment>('APP_ENVIRONMENT');

/**
 * Configure the public URL and form endpoints before deploying.
 * Empty endpoints fail explicitly instead of reporting a false success.
 */
export const appEnvironment: AppEnvironment = {
  production: true,
  publicUrl: 'https://joseandres94.github.io/Magdalena-Robles-Website/',
  contactEndpoint: '',
  newsletterEndpoint: '',
};
