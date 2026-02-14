import type { ProfileSection } from '../../types';
import AboutSection from './sections/AboutSection';
import PapersSection from './sections/PapersSection';
import TalksSection from './sections/TalksSection';
import PostersSection from './sections/PostersSection';
import AwardsSection from './sections/AwardsSection';
import TimelineSection from './sections/TimelineSection';
import EducationSection from './sections/EducationSection';
import SkillsSection from './sections/SkillsSection';
import CertificationsSection from './sections/CertificationsSection';
import CustomSection from './sections/CustomSection';

interface SectionRendererProps {
  section: ProfileSection;
}

function SectionRenderer({ section }: SectionRendererProps) {
  switch (section.type) {
    case 'about':
      return <AboutSection title={section.title} content={section.content} />;
    case 'papers':
      return <PapersSection title={section.title} content={section.content} />;
    case 'talks':
      return <TalksSection title={section.title} content={section.content} />;
    case 'posters':
      return <PostersSection title={section.title} content={section.content} />;
    case 'awards':
      return <AwardsSection title={section.title} content={section.content} />;
    case 'timeline':
      return <TimelineSection title={section.title} content={section.content} />;
    case 'education':
      return <EducationSection title={section.title} content={section.content} />;
    case 'skills':
      return <SkillsSection title={section.title} content={section.content} />;
    case 'certifications':
      return <CertificationsSection title={section.title} content={section.content} />;
    case 'custom':
      return <CustomSection title={section.title} content={section.content} />;
    case 'projects':
    case 'gallery':
      return null; // Future templates
    default:
      return null;
  }
}

export default SectionRenderer;
