export interface NavigationItem {
  id: string;
  label: string;
  labelEs: string;
  labelEn: string;
  path: string;
  external?: boolean;
  badge?: string;
}

export type Language = 'es' | 'en';
