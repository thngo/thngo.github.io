import type { TimelineItem } from '../../../types';
import Timeline from '../../Timeline';
import SectionWrapper from './SectionWrapper';

interface TimelineSectionProps {
  title: string;
  content: { items: TimelineItem[] };
}

function TimelineSection({ title, content }: TimelineSectionProps) {
  return (
    <SectionWrapper id="timeline" title={title}>
      <Timeline items={content.items} />
    </SectionWrapper>
  );
}

export default TimelineSection;
