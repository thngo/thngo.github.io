import type { CertificationItem } from '../../../types';
import SectionWrapper from './SectionWrapper';

interface CertificationsSectionProps {
  title: string;
  content: { items: CertificationItem[] };
}

function CertificationsSection({ title, content }: CertificationsSectionProps) {
  return (
    <SectionWrapper id="certifications" title={title}>
      <ul className="space-y-2 text-left text-gray-600">
        {content.items.map((cert, i) => (
          <li key={i} className="flex">
            <span className="font-bold w-16 flex-shrink-0">{cert.year}:</span>
            <span className="flex-1">
              {cert.name}, <em>{cert.institution}</em>
            </span>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
}

export default CertificationsSection;
