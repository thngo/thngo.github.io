import { Link } from 'react-router-dom';
import type { ProfileData } from '../../../types';
import SectionRenderer from '../SectionRenderer';
import LinkedinIcon from '../../icons/LinkedinIcon';
import GithubIcon from '../../icons/GithubIcon';
import SectionWrapper from '../sections/SectionWrapper';

interface BusinessTemplateProps {
  data: ProfileData;
}

function BusinessTemplate({ data }: BusinessTemplateProps) {
  const { hero, status, sections, getInTouch } = data;

  return (
    <div className="bg-gray-50">
      {/* Hero banner */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {hero.avatar && (
              <img
                src={hero.avatar}
                alt={hero.title}
                loading="lazy"
                className="w-32 h-32 rounded-full shadow-lg object-cover"
              />
            )}
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-gray-900">{hero.title}</h1>
              {hero.subtitle && (
                <p className="text-xl text-gray-600 mt-1">{hero.subtitle}</p>
              )}
              <p className="text-gray-500 mt-2">
                {status.currentRole} at {status.organization}
              </p>
              <p className="text-gray-400 text-sm">
                {status.location.city}, {status.location.country}
              </p>
              <div className="flex gap-3 mt-4 justify-center md:justify-start">
                {hero.socials?.linkedin && (
                  <a href={hero.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900">
                    <LinkedinIcon />
                  </a>
                )}
                {hero.socials?.github && (
                  <a href={hero.socials.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900">
                    <GithubIcon />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {sections.map((section, i) => (
          <SectionRenderer key={i} section={section} />
        ))}

        <SectionWrapper id="get-in-touch" title="Get In Touch">
          <div className="text-center text-gray-600 max-w-2xl mx-auto">
            <p>{getInTouch.text}</p>
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

export default BusinessTemplate;
