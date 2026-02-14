import type { EducationItem } from '../../../types';
import SectionWrapper from './SectionWrapper';

interface EducationSectionProps {
  title: string;
  content: { items: EducationItem[] };
}

function EducationSection({ title, content }: EducationSectionProps) {
  return (
    <SectionWrapper id="education" title={title}>
      <div className="space-y-6 text-left">
        {content.items.map((edu, i) => (
          <div key={i}>
            <h3 className="font-bold text-xl">{edu.institution}</h3>
            <p className="text-md italic text-gray-700">{edu.degree}</p>
            <ul className="list-disc list-inside ml-4 text-gray-600">
              {edu.details.map((detail, j) => (
                <li key={j}>{detail}</li>
              ))}
              {edu.url && (
                <li>
                  <a
                    href={edu.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:underline"
                  >
                    View Thesis
                  </a>
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

export default EducationSection;
