export interface TalkItem {
  year: number;
  description: string;
}

export interface Paper {
  year: number;
  authors: string;
  title: string;
  journal: string;
  url: string;
}

export interface Award {
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

export interface TraNgoData {
  aboutMe: {
    title: string;
    paragraphs: string[];
    images: string[];
    socials: {
      github: string;
      linkedin: string;
      googleScholar: string;
    };
  };
  papers: Paper[];
  talks: TalkItem[];
  awards: Award[];
  miscellaneous: string[];
  timeline: TimelineItem[];
  education: EducationItem[];
  getInTouch: {
    email: string;
    text: string;
  };
}
