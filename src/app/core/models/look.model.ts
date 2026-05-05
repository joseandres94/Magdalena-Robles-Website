export type LookStatus = 'available' | 'sold' | 'on-request' | 'archive';
export type Season = 'SS25' | 'AW25' | 'SS26';

export interface Material {
  name: string;
  type: 'deadstock' | 'biodegradable' | 'recycled' | 'natural' | 'technical';
  description?: string;
}

export interface Technique {
  name: string;
  category?: string;
}

export interface LookImage {
  src: string;
  alt: string;
  type: 'editorial' | 'detail' | 'process' | 'sketch';
}

export interface Look {
  id: string;
  number: number;
  roman: string;
  name: string;
  archetype: string;
  slug: string;
  shortDescription: string;
  editorialDescription: string;
  conceptNote: string;
  materials: Material[];
  techniques: Technique[];
  images: LookImage[];
  accentColor: string;
  bgColor: string;
  season: Season;
  referenceCode: string;
  status: LookStatus;
  ctaLabel: string;
}
