import type { SkillCategory } from '../../../types';
import SectionWrapper from './SectionWrapper';

interface SkillsSectionProps {
  title: string;
  content: { items: SkillCategory[] };
}

function SkillsSection({ title, content }: SkillsSectionProps) {
  return (
    <SectionWrapper id="skills" title={title}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        {content.items.map((category, i) => (
          <div key={i}>
            <h3 className="font-bold text-lg text-gray-800 mb-2">{category.category}</h3>
            <div className="flex flex-wrap gap-2">
              {category.items.map((skill, j) => (
                <span
                  key={j}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

export default SkillsSection;
