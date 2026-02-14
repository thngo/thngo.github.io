export interface AboutSectionContent {
  paragraphs: string[];
  images?: string[];
}

export interface PaperItem {
  year: number;
  authors: string;
  title: string;
  journal: string;
  url: string;
}

export interface TalkItem {
  year: number;
  description: string;
}

export interface PosterItem {
  year: number;
  description: string;
}

export interface AwardItem {
  year: number;
  name: string;
  institution: string;
}

export interface TimelineItem {
  title: string;
  institution: string;
  date?: string;
  side: 'left' | 'right';
}

export interface EducationItem {
  institution: string;
  degree: string;
  details: string[];
  url?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface CertificationItem {
  year: number;
  name: string;
  institution: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  url?: string;
  image?: string;
  tags?: string[];
}

export type SectionType =
  | 'about'
  | 'papers'
  | 'talks'
  | 'posters'
  | 'awards'
  | 'timeline'
  | 'education'
  | 'skills'
  | 'certifications'
  | 'projects'
  | 'gallery'
  | 'custom';

interface SectionBase {
  title: string;
}

export interface AboutSection extends SectionBase {
  type: 'about';
  content: AboutSectionContent;
}

export interface PapersSection extends SectionBase {
  type: 'papers';
  content: { items: PaperItem[] };
}

export interface TalksSection extends SectionBase {
  type: 'talks';
  content: { items: TalkItem[] };
}

export interface PostersSection extends SectionBase {
  type: 'posters';
  content: { items: PosterItem[] };
}

export interface AwardsSection extends SectionBase {
  type: 'awards';
  content: { items: AwardItem[] };
}

export interface TimelineSection extends SectionBase {
  type: 'timeline';
  content: { items: TimelineItem[] };
}

export interface EducationSection extends SectionBase {
  type: 'education';
  content: { items: EducationItem[] };
}

export interface SkillsSection extends SectionBase {
  type: 'skills';
  content: { items: SkillCategory[] };
}

export interface CertificationsSection extends SectionBase {
  type: 'certifications';
  content: { items: CertificationItem[] };
}

export interface ProjectsSection extends SectionBase {
  type: 'projects';
  content: { items: ProjectItem[] };
}

export interface GallerySection extends SectionBase {
  type: 'gallery';
  content: { items: string[] };
}

export interface CustomSection extends SectionBase {
  type: 'custom';
  content: { items: string[] };
}

export type ProfileSection =
  | AboutSection
  | PapersSection
  | TalksSection
  | PostersSection
  | AwardsSection
  | TimelineSection
  | EducationSection
  | SkillsSection
  | CertificationsSection
  | ProjectsSection
  | GallerySection
  | CustomSection;
