import type { Look } from '../app/core/models/look.model';

/** Minimal Look fixture matching the first entry of LOOKS_DATA (Pedrolino). */
export const MOCK_LOOK: Look = {
  id: 'look-01-pedrolino',
  number: 1,
  roman: 'I',
  name: 'Pedrolino',
  archetype: 'The Outsider',
  slug: 'pedrolino',
  shortDescription: "The one who doesn't fit.",
  editorialDescription:
    'El eterno outsider. Vestido de blanco, expresivo, perpetuamente incomprendido.',
  conceptNote: 'Test concept note.',
  materials: [{ name: 'Lino deadstock', type: 'deadstock' }],
  techniques: [{ name: 'Patronaje avanzado', category: 'Construcción' }],
  images: [{ src: '/assets/looks/pedrolino-01.jpg', alt: 'Pedrolino look', type: 'editorial' }],
  accentColor: '#27ae60',
  bgColor: '#e8e3da',
  season: 'SS25',
  referenceCode: 'MR-SS25-01',
  status: 'on-request',
  ctaLabel: 'Consultar disponibilidad',
};

/** Look fixture for the last entry of LOOKS_DATA (Lelio), used to test boundary conditions. */
export const MOCK_LOOK_LAST: Look = {
  id: 'look-06-lelio',
  number: 6,
  roman: 'VI',
  name: 'Lelio',
  archetype: 'Lost in Their Own World',
  slug: 'lelio',
  shortDescription: 'Lost in their own world.',
  editorialDescription: 'El amante absorto en su propia ficción. Ajeno, sincero, a la deriva.',
  conceptNote: 'Test concept note.',
  materials: [{ name: 'Algodón reciclado', type: 'recycled' }],
  techniques: [{ name: 'Sastrería deconstruida', category: 'Construcción' }],
  images: [{ src: '/assets/looks/lelio-01.jpg', alt: 'Lelio look', type: 'editorial' }],
  accentColor: '#2980b9',
  bgColor: '#e4e8ea',
  season: 'SS25',
  referenceCode: 'MR-SS25-06',
  status: 'on-request',
  ctaLabel: 'Consultar disponibilidad',
};
