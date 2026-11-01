import type { Look } from '../core/models/look.model';

export const LOOKS_DATA: Look[] = [
  {
    id: 'look-01-colombina',
    number: 1,
    roman: 'I',
    name: 'Colombina',
    archetype: 'Picardía',
    archetypeEn: 'Mischief',
    slug: 'colombina',
    shortDescription: 'Picardía.',
    shortDescriptionEn: 'Mischief.',
    editorialDescription:
      'Siempre observa. Siempre actúa. La más inteligente de la sala fingiendo no serlo.',
    editorialDescriptionEn:
      'Always watching. Always performing. The sharpest person in the room pretending not to be.',
    conceptNote:
      'Colombina es la única que ve todo y finge no ver nada. Su silueta juega con la exposición y la ocultación simultáneas: el corte láser crea transparencias calculadas, el plissé construye tensión vertical. Peligrosa no por lo que muestra — sino por lo que sabe.',
    conceptNoteEn:
      'Colombina is the only one who sees everything while pretending to see nothing. Her silhouette plays with exposure and concealment at once: laser cutting creates calculated transparency while pleating builds vertical tension. Dangerous not for what she reveals, but for what she knows.',
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
        src: 'assets/looks/colombina-01.jpg',
        alt: 'Colombina — Look 01, corte láser en tul sobre satén',
        type: 'editorial',
      },
    ],
    accentColor: '#c0392b',
    bgColor: '#f0e8e8',
    season: 'SS25',
    referenceCode: 'MR-SS25-01',
    status: 'on-request',
    ctaLabel: 'Consultar disponibilidad',
    ctaLabelEn: 'Enquire availability',
  },
  {
    id: 'look-02-pantalone',
    number: 2,
    roman: 'II',
    name: 'Pantalone',
    archetype: 'Vanidad',
    archetypeEn: 'Vanity',
    slug: 'pantalone',
    shortDescription: 'Vanidad.',
    shortDescriptionEn: 'Vanity.',
    editorialDescription: 'La acumulación de objetos de estatus que no significan nada.',
    editorialDescriptionEn: 'An accumulation of status objects that ultimately mean nothing.',
    conceptNote:
      'Pantalone lleva todo lo que tiene encima porque tiene miedo de que no se vea. El volumen no busca la belleza — busca el peso. La sensación física de tener demasiado. Cada capa es una excusa. Juntas, son vacío.',
    conceptNoteEn:
      'Pantalone wears everything he owns for fear that it may go unseen. Volume does not seek beauty — it seeks weight, the physical sensation of having too much. Every layer is an excuse. Together they become emptiness.',
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
        src: 'assets/looks/pantalone-01.jpg',
        alt: 'Pantalone — Look 02, volumen estructurado en capas de lana',
        type: 'editorial',
      },
    ],
    accentColor: '#8e44ad',
    bgColor: '#e5dfd4',
    season: 'SS25',
    referenceCode: 'MR-SS25-02',
    status: 'on-request',
    ctaLabel: 'Consultar disponibilidad',
    ctaLabelEn: 'Enquire availability',
  },
  {
    id: 'look-03-arlequin',
    number: 3,
    roman: 'III',
    name: 'Arlequín',
    archetype: 'Irreverencia',
    archetypeEn: 'Irreverence',
    slug: 'arlequin',
    shortDescription: 'Irreverencia.',
    shortDescriptionEn: 'Irreverence.',
    editorialDescription:
      'Identidad fragmentada como armadura. Cada panel una respuesta diferente.',
    editorialDescriptionEn:
      'A fragmented identity worn as armour. Each panel offers a different answer.',
    conceptNote:
      'Arlequín no huye del caos — lo construye. El patchwork no es de telas sino de actitudes: cada panel es una versión de sí mismo que usa para no ser ninguna. Los accesorios de impresión 3D unen lo textil y lo estructural, lo artesanal y lo digital.',
    conceptNoteEn:
      'Arlequín does not escape chaos — he constructs it. The patchwork is made from attitudes rather than fabrics: each panel is a version of himself used to avoid becoming any one of them. 3D-printed accessories join textile and structure, handcraft and digital process.',
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
        src: 'assets/looks/arlequin-01.jpg',
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
    ctaLabelEn: 'Enquire availability',
  },
  {
    id: 'look-04-pierrot',
    number: 4,
    roman: 'IV',
    name: 'Pierrot',
    archetype: 'Romanticismo',
    archetypeEn: 'Romanticism',
    slug: 'pierrot',
    shortDescription: 'Romanticismo.',
    shortDescriptionEn: "Romanticism.",
    editorialDescription:
      'El eterno outsider. Vestido de blanco, expresivo, perpetuamente incomprendido.',
    editorialDescriptionEn:
      'The eternal outsider. Dressed in white, expressive and perpetually misunderstood.',
    conceptNote:
      'Pierrot porta el volumen como confesión. Las mangas exageradas son un grito contenido — demasiado para el mundo, demasiado poco para la escena. Su construcción referencia la lógica del clown de la Commedia reinterpretada en patronaje contemporáneo: volumen que incomoda, silueta que no encaja.',
    conceptNoteEn:
      'Pierrot wears volume as confession. The exaggerated sleeves are a restrained cry — too much for the world, too little for the stage. Its construction references the logic of the Commedia clown through contemporary pattern-making: unsettling volume and a silhouette that refuses to fit.',
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
        src: 'assets/looks/pierrot-01.jpg',
        alt: 'Pierrot — Look 04, vista frontal, manga voluminosa en lino blanco',
        type: 'editorial',
      },
    ],
    accentColor: '#27ae60',
    bgColor: '#e8e3da',
    season: 'SS25',
    referenceCode: 'MR-SS25-04',
    status: 'on-request',
    ctaLabel: 'Consultar disponibilidad',
    ctaLabelEn: 'Enquire availability',
  },
];
