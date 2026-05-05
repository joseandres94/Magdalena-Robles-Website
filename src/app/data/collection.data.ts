import type { Look } from '../core/models/look.model';

export const LOOKS_DATA: Look[] = [
  {
    id: 'look-01-pedrolino',
    number: 1,
    roman: 'I',
    name: 'Pedrolino',
    archetype: 'The Outsider',
    slug: 'pedrolino',
    shortDescription: "The one who doesn't fit.",
    editorialDescription:
      'El eterno outsider. Vestido de blanco, expresivo, perpetuamente incomprendido.',
    conceptNote:
      'Pedrolino porta el volumen como confesión. Las mangas exageradas son un grito contenido — demasiado para el mundo, demasiado poco para la escena. Su construcción referencia la lógica del clown de la Commedia reinterpretada en patronaje contemporáneo: volumen que incomoda, silueta que no encaja.',
    materials: [
      {
        name: 'Lino deadstock',
        type: 'deadstock',
        description: 'Lino de partidas antiguas de stock',
      },
      {
        name: 'Organza biodegradable',
        type: 'biodegradable',
        description: 'Organza de base vegetal',
      },
    ],
    techniques: [
      { name: 'Patronaje avanzado', category: 'Construcción' },
      { name: 'Volumen exagerado en manga', category: 'Silueta' },
      { name: 'Drapeado a mano', category: 'Acabado' },
    ],
    images: [
      {
        src: '/assets/looks/pedrolino-01.jpg',
        alt: 'Pedrolino — Look 01, vista frontal, manga voluminosa en lino blanco',
        type: 'editorial',
      },
    ],
    accentColor: '#27ae60',
    bgColor: '#e8e3da',
    season: 'SS25',
    referenceCode: 'MR-SS25-01',
    status: 'on-request',
    ctaLabel: 'Consultar disponibilidad',
  },
  {
    id: 'look-02-colombina',
    number: 2,
    roman: 'II',
    name: 'Colombina',
    archetype: 'The Dangerous Mask',
    slug: 'colombina',
    shortDescription: 'The most dangerous mask.',
    editorialDescription:
      'Siempre observa. Siempre actúa. La más inteligente de la sala fingiendo no serlo.',
    conceptNote:
      'Colombina es la única que ve todo y finge no ver nada. Su silueta juega con la exposición y la ocultación simultáneas: el corte láser crea transparencias calculadas, el plissé construye tensión vertical. Peligrosa no por lo que muestra — sino por lo que sabe.',
    materials: [
      { name: 'Tul reciclado', type: 'recycled', description: 'Tul de fibras recuperadas' },
      {
        name: 'Satén deadstock',
        type: 'deadstock',
        description: 'Satén de archivo, sin producción nueva',
      },
    ],
    techniques: [
      { name: 'Corte láser', category: 'Tecnología' },
      { name: 'Construcción couture', category: 'Construcción' },
      { name: 'Plissé', category: 'Acabado' },
    ],
    images: [
      {
        src: '/assets/looks/colombina-01.jpg',
        alt: 'Colombina — Look 02, corte láser en tul sobre satén',
        type: 'editorial',
      },
    ],
    accentColor: '#c0392b',
    bgColor: '#f0e8e8',
    season: 'SS25',
    referenceCode: 'MR-SS25-02',
    status: 'on-request',
    ctaLabel: 'Consultar disponibilidad',
  },
  {
    id: 'look-03-arlequin',
    number: 3,
    roman: 'III',
    name: 'Arlequín',
    archetype: 'Chaos as Deflection',
    slug: 'arlequin',
    shortDescription: 'Chaos as deflection.',
    editorialDescription:
      'Identidad fragmentada como armadura. Cada panel una respuesta diferente.',
    conceptNote:
      'Arlequín no huye del caos — lo construye. El patchwork no es de telas sino de actitudes: cada panel es una versión de sí mismo que usa para no ser ninguna. Los accesorios de impresión 3D unen lo textil y lo estructural, lo artesanal y lo digital.',
    materials: [
      {
        name: 'Retales denim deadstock',
        type: 'deadstock',
        description: 'Retales de denim de talleres',
      },
      {
        name: 'Bioplástico PLA',
        type: 'technical',
        description: 'PLA de base vegetal, impresión 3D',
      },
    ],
    techniques: [
      { name: 'Impresión 3D', category: 'Tecnología' },
      { name: 'Construcción patchwork', category: 'Construcción' },
      { name: 'Serigrafía', category: 'Estampación' },
    ],
    images: [
      {
        src: '/assets/looks/arlequin-01.jpg',
        alt: 'Arlequín — Look 03, patchwork con accesorios de impresión 3D',
        type: 'editorial',
      },
    ],
    accentColor: '#e67e22',
    bgColor: '#e8e5d4',
    season: 'SS25',
    referenceCode: 'MR-SS25-03',
    status: 'on-request',
    ctaLabel: 'Consultar disponibilidad',
  },
  {
    id: 'look-04-pantalone',
    number: 4,
    roman: 'IV',
    name: 'Pantalone',
    archetype: 'Excess as Emptiness',
    slug: 'pantalone',
    shortDescription: 'Excess as emptiness.',
    editorialDescription: 'La acumulación de objetos de estatus que no significan nada.',
    conceptNote:
      'Pantalone lleva todo lo que tiene encima porque tiene miedo de que no se vea. El volumen no busca la belleza — busca el peso. La sensación física de tener demasiado. Cada capa es una excusa. Juntas, son vacío.',
    materials: [
      { name: 'Lana deadstock', type: 'deadstock', description: 'Lana de stock sin uso previo' },
      { name: 'Forro circular', type: 'recycled', description: 'Forro de fibras recicladas' },
    ],
    techniques: [
      { name: 'Construcción de volumen', category: 'Construcción' },
      { name: 'Ballenas estructurales', category: 'Estructura' },
      { name: 'Acabados couture', category: 'Acabado' },
    ],
    images: [
      {
        src: '/assets/looks/pantalone-01.jpg',
        alt: 'Pantalone — Look 04, volumen estructurado en capas de lana',
        type: 'editorial',
      },
    ],
    accentColor: '#8e44ad',
    bgColor: '#e5dfd4',
    season: 'SS25',
    referenceCode: 'MR-SS25-04',
    status: 'on-request',
    ctaLabel: 'Consultar disponibilidad',
  },
  {
    id: 'look-05-isabella',
    number: 5,
    roman: 'V',
    name: 'Isabella',
    archetype: 'Blind Happiness',
    slug: 'isabella',
    shortDescription: 'Blind happiness.',
    editorialDescription: 'La protagonista romántica que no ve lo que sucede a su alrededor.',
    conceptNote:
      'Isabella es la más bella de la escena. También la más ciega. La feminidad idealizada como mecanismo de supervivencia: smocking a mano que convierte el tejido en arquitectura, broderie que añade tiempo a cada puntada. La silueta más construida es también la más frágil.',
    materials: [
      {
        name: 'Seda biodegradable',
        type: 'biodegradable',
        description: 'Seda de base natural certificada',
      },
      { name: 'Tintes naturales', type: 'natural', description: 'Pigmentos vegetales y minerales' },
    ],
    techniques: [
      { name: 'Referencia de patronaje histórico', category: 'Silueta' },
      { name: 'Smocking a mano', category: 'Acabado' },
      { name: 'Broderie', category: 'Bordado' },
    ],
    images: [
      {
        src: '/assets/looks/isabella-01.jpg',
        alt: 'Isabella — Look 05, smocking a mano en seda biodegradable',
        type: 'editorial',
      },
    ],
    accentColor: '#c0392b',
    bgColor: '#ede8e8',
    season: 'SS25',
    referenceCode: 'MR-SS25-05',
    status: 'on-request',
    ctaLabel: 'Consultar disponibilidad',
  },
  {
    id: 'look-06-lelio',
    number: 6,
    roman: 'VI',
    name: 'Lelio',
    archetype: 'Lost in Their Own World',
    slug: 'lelio',
    shortDescription: 'Lost in their own world.',
    editorialDescription: 'El amante absorto en su propia ficción. Ajeno, sincero, a la deriva.',
    conceptNote:
      'Lelio no sabe que está perdido. Eso es lo más triste y lo más honesto de él. Su construcción referencia la prenda inacabada como lenguaje: huecos deliberados, bajo en crudo, costuras expuestas. La imperfección no es error — es el único lenguaje que conoce.',
    materials: [
      { name: 'Algodón reciclado', type: 'recycled', description: 'Algodón de circuito cerrado' },
      {
        name: 'Lana regenerativa',
        type: 'natural',
        description: 'Lana de ganadería regenerativa certificada',
      },
    ],
    techniques: [
      { name: 'Sastrería deconstruida', category: 'Construcción' },
      { name: 'Bajo en crudo', category: 'Acabado' },
      { name: 'Corte láser', category: 'Tecnología' },
    ],
    images: [
      {
        src: '/assets/looks/lelio-01.jpg',
        alt: 'Lelio — Look 06, sastrería deconstruida en algodón y lana',
        type: 'editorial',
      },
    ],
    accentColor: '#2980b9',
    bgColor: '#e4e8ea',
    season: 'SS25',
    referenceCode: 'MR-SS25-06',
    status: 'on-request',
    ctaLabel: 'Consultar disponibilidad',
  },
];
