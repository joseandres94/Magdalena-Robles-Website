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
      quote: 'La máscara, llevada tanto tiempo que hemos dejado de preguntarnos qué cubría — o por qué.',
      lang: 'es',
      attribution: 'Lobotomy Chic — Brief creativo, 2025',
    },
    {
      quote: 'The mask, worn so long we\'ve stopped asking what it covered — or why.',
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
    description: 'Cada colección nace de un universo conceptual concreto — un personaje, un estado emocional, una referencia histórica.',
    technique: 'Investigación y narrativa',
  },
  {
    order: 2,
    label: 'Construcción',
    description: 'El patronaje no es técnica, es lenguaje. Cada pieza se construye desde la lógica interna de la silueta.',
    technique: 'Patronaje & drapeado',
  },
  {
    order: 3,
    label: 'Material',
    description: 'Los materiales forman parte del concepto. Tejidos de segunda vida, bioplásticos, naturales y regenerativos.',
    technique: 'Investigación de tejidos',
  },
  {
    order: 4,
    label: 'Proceso digital',
    description: 'Impresión 3D y corte láser como extensión del oficio artesanal, no como sustitución.',
    technique: 'Fabricación digital',
  },
];
