import { Link } from 'react-router-dom';
import type { ProfileData } from '../../../types';
import SectionRenderer from '../SectionRenderer';
import GithubIcon from '../../icons/GithubIcon';
import LinkedinIcon from '../../icons/LinkedinIcon';
import GoogleScholarIcon from '../../icons/GoogleScholarIcon';
import SectionWrapper from '../sections/SectionWrapper';

interface AcademicTemplateProps {
  data: ProfileData;
}

function AcademicTemplate({ data }: AcademicTemplateProps) {
  const { hero, sections, getInTouch } = data;
  const sectionTitles = sections.map((s) => s.title.toUpperCase());

  return (
    <div className="bg-gray-50">
      <div className="sticky top-16 bg-white/90 backdrop-blur-sm z-30 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-center space-x-4 md:space-x-8 overflow-x-auto py-3">
            {sectionTitles.map((title) => (
              <a
                key={title}
                href={`#${title.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-xs uppercase font-semibold text-gray-500 hover:text-teal-600 tracking-wider whitespace-nowrap"
              >
                {title}
              </a>
            ))}
            <a
              href="#get-in-touch"
              className="text-xs uppercase font-semibold text-gray-500 hover:text-teal-600 tracking-wider whitespace-nowrap"
            >
              GET IN TOUCH
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end gap-3 pt-8">
          {hero.socials?.github && (
            <a href={hero.socials.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900">
              <GithubIcon />
            </a>
          )}
          {hero.socials?.linkedin && (
            <a href={hero.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900">
              <LinkedinIcon />
            </a>
          )}
          {hero.socials?.googleScholar && (
            <a href={hero.socials.googleScholar} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900">
              <GoogleScholarIcon />
            </a>
          )}
        </div>

        {sections.map((section, i) => (
          <SectionRenderer key={i} section={section} />
        ))}

        <SectionWrapper id="get-in-touch" title="Get In Touch">
          <div className="text-center text-gray-600 max-w-2xl mx-auto">
            <p>{getInTouch.text}</p>
            {getInTouch.showEmail && getInTouch.email && (
              <p className="font-mono my-4 text-teal-700">{getInTouch.email}</p>
            )}
            <Link
              to="/contact"
              className="mt-4 inline-block bg-teal-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-teal-600 transition-colors"
            >
              Send a Message
            </Link>
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
}

export default AcademicTemplate;
