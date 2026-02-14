import type { AwardItem } from '../../../types';
import SectionWrapper from './SectionWrapper';

interface AwardsSectionProps {
  title: string;
  content: { items: AwardItem[] };
}

function AwardsSection({ title, content }: AwardsSectionProps) {
  return (
    <SectionWrapper id="awards" title={title}>
      <ul className="space-y-2 text-left text-gray-600">
        {content.items.map((award, i) => (
          <li key={i} className="flex">
            <span className="font-bold w-16 flex-shrink-0">{award.year}:</span>
            <span className="flex-1">
              {award.name}, <em>{award.institution}</em>
            </span>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
}

export default AwardsSection;
