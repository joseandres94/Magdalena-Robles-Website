import type { BrandInfo, ProcessStep } from '../core/models/brand.model';

export const BRAND_INFO: BrandInfo = {
  name: 'Magdalena Robles',
  fullName: 'Magdalena Robles',
  tagline: 'Designer & Pattern Maker',
  location: 'Almería, España',
  positioning: 'Contemporary / Premium',
  email: 'hola@magdalenarobles.com',
  socials: [
    { platform: 'instagram', url: 'https://instagram.com/magdalenarobles', label: 'Instagram' },
  ],
  currentCollection: 'Lobotomy Chic',
  currentSeason: 'SS25',
  skills: [
    'Patronaje Avanzado',
    'Impresión 3D',
    'Corte Láser',
    'Materiales Circulares',
    'Construcción Couture',
    'Storytelling de Colección',
    'Tela Deadstock',
    'Plisados',
    'Serigrafía',
    'Tejidos Biodegradables',
  ],
  manifesto: [
    {
      quote:
        'La máscara, llevada tanto tiempo que hemos dejado de preguntarnos qué cubría — o por qué.',
      lang: 'es',
      attribution: 'Lobotomy Chic — Brief creativo, 2025',
    },
    {
      quote: "The mask, worn so long we've stopped asking what it covered — or why.",
      lang: 'en',
      attribution: 'Lobotomy Chic — Collection Brief, 2025',
    },
    {
      quote: 'Craft as conceptual tool.',
      lang: 'en',
    },
    {
      quote: 'Historical silhouettes, contemporary distortion.',
      lang: 'en',
    },
  ],
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    order: 1,
    label: 'Concepto',
    labelEn: 'Concept',
    description:
      'Cada colección nace de un universo conceptual concreto — un personaje, un estado emocional, una referencia histórica.',
    descriptionEn:
      'Each collection begins with a precise conceptual universe — a character, an emotional state, a historical reference.',
    technique: 'Investigación y narrativa',
    techniqueEn: 'Research & narrative',
  },
  {
    order: 2,
    label: 'Construcción',
    labelEn: 'Construction',
    description:
      'El patronaje no es técnica, es lenguaje. Cada pieza se construye desde la lógica interna de la silueta.',
    descriptionEn:
      'Pattern-making is not merely technique; it is language. Every piece is built from the internal logic of its silhouette.',
    technique: 'Patronaje & drapeado',
    techniqueEn: 'Pattern-making & draping',
  },
  {
    order: 3,
    label: 'Material',
    labelEn: 'Material',
    description:
      'Los materiales forman parte del concepto. Tejidos de segunda vida, bioplásticos, naturales y regenerativos.',
    descriptionEn:
      'Materials are part of the concept: second-life textiles, bioplastics, natural and regenerative fibres.',
    technique: 'Investigación de tejidos',
    techniqueEn: 'Textile research',
  },
  {
    order: 4,
    label: 'Proceso digital',
    labelEn: 'Digital process',
    description:
      'Impresión 3D y corte láser como extensión del oficio artesanal, no como sustitución.',
    descriptionEn:
      '3D printing and laser cutting extend the handmade craft rather than replace it.',
    technique: 'Fabricación digital',
    techniqueEn: 'Digital fabrication',
  },
];
