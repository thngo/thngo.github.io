import type { PaperItem } from '../../../types';
import SectionWrapper from './SectionWrapper';

interface PapersSectionProps {
  title: string;
  content: { items: PaperItem[] };
}

function PapersSection({ title, content }: PapersSectionProps) {
  return (
    <SectionWrapper id="papers" title={title}>
      <ul className="space-y-4 text-left text-gray-600">
        {content.items.map((paper, i) => (
          <li key={i} className="flex">
            <span className="font-bold w-16 flex-shrink-0">{paper.year}:</span>
            <span className="flex-1">
              {paper.authors}{' '}
              <a href={paper.url} className="text-teal-600 hover:underline italic">
                &ldquo;{paper.title}&rdquo;
              </a>{' '}
              {paper.journal}
            </span>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
}

export default PapersSection;
