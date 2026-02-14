import SectionWrapper from './SectionWrapper';

interface CustomSectionProps {
  title: string;
  content: { items: string[] };
}

function CustomSection({ title, content }: CustomSectionProps) {
  const sectionId = title.toLowerCase().replace(/\s+/g, '-');

  return (
    <SectionWrapper id={sectionId} title={title}>
      <ul className="list-disc list-inside space-y-2 text-left text-gray-600">
        {content.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </SectionWrapper>
  );
}

export default CustomSection;
