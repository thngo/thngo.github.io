import type { TemplateName } from './profile';

export interface SiteProfileEntry {
  slug: string;
  name: string;
  shortTitle: string;
  location: {
    city: string;
    region?: string;
    country: string;
  };
  avatar?: string;
  template: TemplateName;
}

export interface SiteConfig {
  familyName: string;
  tagline?: string;
  profiles: SiteProfileEntry[];
  nav?: {
    showFeed?: boolean;
    showContact?: boolean;
    showAbout?: boolean;
  };
}
