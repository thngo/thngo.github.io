import type { AboutSectionContent } from '../../../types';
import SectionWrapper from './SectionWrapper';

interface AboutSectionProps {
  title: string;
  content: AboutSectionContent;
}

function AboutSection({ title, content }: AboutSectionProps) {
  return (
    <SectionWrapper id="about" title={title}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start text-left">
        <div className="md:col-span-2 space-y-4 text-gray-600 leading-relaxed">
          {content.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        {content.images && content.images.length > 0 && (
          <div className="space-y-4">
            {content.images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`profile ${i + 1}`}
                loading="lazy"
                className="rounded-lg shadow-lg w-full"
              />
            ))}
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}

export default AboutSection;
