import type { Look } from '../app/core/models/look.model';

/** Minimal Look fixture matching the first entry of LOOKS_DATA (Colombina). */
export const MOCK_LOOK: Look = {
  id: 'look-01-colombina',
  number: 1,
  roman: 'I',
  name: 'Colombina',
  archetype: 'Picardía',
  archetypeEn: 'Mischief',
  slug: 'colombina',
  shortDescription: 'Picardía.',
  shortDescriptionEn: 'Mischief.',
  editorialDescription: 'Siempre observa. Siempre actúa.',
  editorialDescriptionEn: 'Always watching. Always performing.',
  conceptNote: 'Test concept note.',
  conceptNoteEn: 'Test concept note.',
  materials: [{ name: 'Tul reciclado', type: 'recycled' }],
  techniques: [{ name: 'Corte láser', category: 'Tecnología' }],
  images: [{ src: 'assets/looks/colombina-01.jpg', alt: 'Colombina look', type: 'editorial' }],
  accentColor: '#c0392b',
  bgColor: '#f0e8e8',
  season: 'SS25',
  referenceCode: 'MR-SS25-01',
  status: 'on-request',
  ctaLabel: 'Consultar disponibilidad',
  ctaLabelEn: 'Enquire availability',
};
