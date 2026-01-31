import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TraNgoData } from '../types';
import Timeline from '../components/Timeline';
import GithubIcon from '../components/icons/GithubIcon';
import LinkedinIcon from '../components/icons/LinkedinIcon';
import GoogleScholarIcon from '../components/icons/GoogleScholarIcon';

const Section: React.FC<{ id: string; title: string; children: React.ReactNode }> = ({
  id,
  title,
  children,
}) => (
  <section id={id} className="py-12 md:py-16">
    <div className="text-center mb-10">
      <h2 className="text-3xl font-bold tracking-tight uppercase text-gray-700">{title}</h2>
      <div className="w-16 h-1 bg-teal-500 mx-auto mt-2"></div>
    </div>
    {children}
  </section>
);

const TraNgo: React.FC = () => {
  const [pageData, setPageData] = useState<TraNgoData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/traNgoData.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data: TraNgoData) => {
        setPageData(data);
      })
      .catch((err) => {
        console.error('Failed to load page data:', err);
        setError('Failed to load page data. Please try refreshing the page.');
      });
  }, []);

  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  if (!pageData) {
    return <div className="text-center p-10">Loading...</div>;
  }

  const { aboutMe, papers, talks, awards, miscellaneous, timeline, education, getInTouch } =
    pageData;
  const sections = [
    'ABOUT',
    'PAPERS',
    'TALKS',
    'AWARDS',
    'MISCELLANEOUS',
    'TIMELINE',
    'EDUCATION',
    'GET IN TOUCH',
  ];

  return (
    <div className="bg-gray-50">
      <div className="sticky top-16 bg-white/90 backdrop-blur-sm z-30 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-center space-x-4 md:space-x-8 overflow-x-auto py-3">
            {sections.map((section) => (
              <a
                key={section}
                href={`#${section.toLowerCase().replace(/\s/g, '-')}`}
                className="text-xs uppercase font-semibold text-gray-500 hover:text-teal-600 tracking-wider whitespace-nowrap"
              >
                {section}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end gap-3 pt-8">
          <a
            href={aboutMe.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-900"
          >
            <GithubIcon />
          </a>
          <a
            href={aboutMe.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-900"
          >
            <LinkedinIcon />
          </a>
          <a
            href={aboutMe.socials.googleScholar}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-900"
          >
            <GoogleScholarIcon />
          </a>
        </div>

        <section id="about" className="pt-4 pb-12 md:pb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight uppercase text-gray-700">
              {aboutMe.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start text-left">
            <div className="md:col-span-2 space-y-4 text-gray-600 leading-relaxed">
              {aboutMe.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="space-y-4">
              {aboutMe.images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`profile ${i + 1}`}
                  className="rounded-lg shadow-lg w-full"
                />
              ))}
            </div>
          </div>
        </section>

        <Section id="papers" title="Papers">
          <ul className="space-y-4 text-left text-gray-600">
            {papers.map((paper, i) => (
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
        </Section>

        <Section id="talks" title="Talks">
          <ul className="space-y-2 text-left text-gray-600">
            {talks.map((talk, i) => (
              <li key={i} className="flex">
                <span className="font-bold w-16 flex-shrink-0">{talk.year}:</span>
                <span className="flex-1">{talk.description}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="awards" title="Awards">
          <ul className="space-y-2 text-left text-gray-600">
            {awards.map((award, i) => (
              <li key={i} className="flex">
                <span className="font-bold w-16 flex-shrink-0">{award.year}:</span>
                <span className="flex-1">
                  {award.name}, <em>{award.institution}</em>
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="miscellaneous" title="Miscellaneous">
          <ul className="list-disc list-inside space-y-2 text-left text-gray-600">
            {miscellaneous.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section id="timeline" title="Timeline">
          <Timeline items={timeline} />
        </Section>

        <Section id="education" title="Education">
          <div className="space-y-6 text-left">
            {education.map((edu, i) => (
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
        </Section>

        <Section id="get-in-touch" title="Get In Touch">
          <div className="text-center text-gray-600 max-w-2xl mx-auto">
            <p>{getInTouch.text}</p>
            <p className="font-mono my-4 text-teal-700">{getInTouch.email}</p>
            <Link
              to="/contact"
              className="mt-2 inline-block bg-teal-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-teal-600 transition-colors"
            >
              Send a Message
            </Link>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default TraNgo;
