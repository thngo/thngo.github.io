import type { PosterItem } from '../../../types';
import SectionWrapper from './SectionWrapper';

interface PostersSectionProps {
  title: string;
  content: { items: PosterItem[] };
}

function PostersSection({ title, content }: PostersSectionProps) {
  return (
    <SectionWrapper id="posters" title={title}>
      <ul className="space-y-2 text-left text-gray-600">
        {content.items.map((poster, i) => (
          <li key={i} className="flex">
            <span className="font-bold w-16 flex-shrink-0">{poster.year}:</span>
            <span className="flex-1">{poster.description}</span>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
}

export default PostersSection;
