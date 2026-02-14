import { Link } from 'react-router-dom';
import type { ProfileData } from '../../../types';
import LinkedinIcon from '../../icons/LinkedinIcon';
import GithubIcon from '../../icons/GithubIcon';
import GoogleScholarIcon from '../../icons/GoogleScholarIcon';

interface MinimalTemplateProps {
  data: ProfileData;
}

function MinimalTemplate({ data }: MinimalTemplateProps) {
  const { hero, status, getInTouch } = data;
  const aboutSection = data.sections.find((s) => s.type === 'about');
  const paragraphs = aboutSection?.type === 'about' ? aboutSection.content.paragraphs : [];

  return (
    <div className="bg-gray-50 min-h-[60vh]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {hero.avatar && (
            <img
              src={hero.avatar}
              alt={hero.title}
              loading="lazy"
              className="w-28 h-28 rounded-full shadow-lg object-cover mx-auto mb-6"
            />
          )}
          <h1 className="text-4xl font-bold text-gray-900">{hero.title}</h1>
          {hero.subtitle && (
            <p className="text-xl text-gray-500 mt-2">{hero.subtitle}</p>
          )}
          <p className="text-gray-400 text-sm mt-1">
            {status.location.city}, {status.location.country}
          </p>

          <div className="flex gap-4 mt-6 justify-center">
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
        </div>

        {paragraphs.length > 0 && (
          <div className="mt-10 space-y-4 text-gray-600 leading-relaxed text-center">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-gray-600">{getInTouch.text}</p>
          <Link
            to="/contact"
            className="mt-4 inline-block bg-teal-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-teal-600 transition-colors"
          >
            Send a Message
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MinimalTemplate;
