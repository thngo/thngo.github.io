import type { TalkItem } from '../../../types';
import SectionWrapper from './SectionWrapper';

interface TalksSectionProps {
  title: string;
  content: { items: TalkItem[] };
}

function TalksSection({ title, content }: TalksSectionProps) {
  return (
    <SectionWrapper id="talks" title={title}>
      <ul className="space-y-2 text-left text-gray-600">
        {content.items.map((talk, i) => (
          <li key={i} className="flex">
            <span className="font-bold w-16 flex-shrink-0">{talk.year}:</span>
            <span className="flex-1">{talk.description}</span>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
}

export default TalksSection;
