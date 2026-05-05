import { type Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Magdalena Robles — Designer & Pattern Maker',
  },
  {
    path: 'collection',
    loadComponent: () => import('./features/collection/collection.component').then(m => m.CollectionComponent),
    title: 'Colección — Magdalena Robles',
  },
  {
    path: 'collection/:slug',
    loadComponent: () => import('./features/look-detail/look-detail.component').then(m => m.LookDetailComponent),
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent),
    title: 'Sobre la diseñadora — Magdalena Robles',
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contacto — Magdalena Robles',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
