import type { ReactNode } from 'react';

interface SectionWrapperProps {
  id: string;
  title: string;
  children: ReactNode;
}

function SectionWrapper({ id, title, children }: SectionWrapperProps) {
  return (
    <section id={id} className="py-12 md:py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight uppercase text-gray-700">{title}</h2>
        <div className="w-16 h-1 bg-teal-500 mx-auto mt-2"></div>
      </div>
      {children}
    </section>
  );
}

export default SectionWrapper;
