export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export interface BrandInfo {
  name: string;
  fullName: string;
  tagline: string;
  location: string;
  positioning: string;
  email: string;
  socials: SocialLink[];
  currentCollection: string;
  currentSeason: string;
  skills: string[];
  manifesto: ManifestoItem[];
}

export interface ManifestoItem {
  quote: string;
  lang: 'es' | 'en';
  attribution?: string;
}

export interface ProcessStep {
  order: number;
  label: string;
  labelEn: string;
  description: string;
  descriptionEn: string;
  technique: string;
  techniqueEn: string;
}
