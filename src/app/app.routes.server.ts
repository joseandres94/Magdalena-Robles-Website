import { RenderMode, type ServerRoute } from '@angular/ssr';
import { LOOKS_DATA } from './data/collection.data';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'collection/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: () => Promise.resolve(LOOKS_DATA.map(({ slug }) => ({ slug }))),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
