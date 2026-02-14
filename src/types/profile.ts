import type { ProfileSection } from './sections';
import type { FeedItem } from './feed';

export type TemplateName = 'academic' | 'business' | 'creative' | 'minimal';

export interface ProfileMeta {
  name: string;
  slug: string;
  template: TemplateName;
  theme?: {
    primary: string;
    accent?: string;
  };
}

export interface ProfileHero {
  title: string;
  subtitle?: string;
  avatar?: string;
  bio: string;
  socials?: {
    github?: string;
    linkedin?: string;
    googleScholar?: string;
    twitter?: string;
    website?: string;
  };
}

export interface ProfileStatus {
  currentRole: string;
  organization: string;
  location: {
    city: string;
    region?: string;
    country: string;
  };
  availableFor?: string[];
  lastUpdated: string;
}

export interface ProfileData {
  meta: ProfileMeta;
  hero: ProfileHero;
  status: ProfileStatus;
  sections: ProfileSection[];
  activityFeed?: FeedItem[];
  getInTouch: {
    text: string;
    showEmail?: boolean;
    email?: string;
  };
}
