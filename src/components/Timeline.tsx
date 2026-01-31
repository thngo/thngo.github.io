import React from 'react';
import { TimelineItem } from '../types';

/**
 * Props for the Timeline component
 */
interface TimelineProps {
  /** Array of timeline items to display */
  items: TimelineItem[];
}

/**
 * Vertical timeline visualization component
 *
 * Displays chronological events (education, career milestones, achievements)
 * in a visually appealing vertical timeline with a central axis.
 *
 * Features:
 * - Alternating left/right layout for items
 * - Central vertical line connecting all items
 * - Circular markers on the timeline
 * - Hover effects with glassmorphism
 * - Responsive design
 *
 * Each timeline item shows:
 * - Title (e.g., degree name, position)
 * - Institution (e.g., university, company)
 * - Date (optional)
 *
 * @param props - Component props
 * @param props.items - Array of timeline items with title, institution, date, and side
 *
 * @example
 * ```tsx
 * <Timeline
 *   items={[
 *     {
 *       title: 'Ph.D. in Biophysics',
 *       institution: 'University of Example',
 *       date: '2018-2023',
 *       side: 'left'
 *     },
 *     {
 *       title: 'B.S. in Biology',
 *       institution: 'College of Example',
 *       date: '2014-2018',
 *       side: 'right'
 *     }
 *   ]}
 * />
 * ```
 */
const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="relative container mx-auto px-6 flex flex-col space-y-8">
      <div className="absolute z-0 w-2 h-full bg-gray-300 shadow-md inset-0 top-0 left-1/2 -ml-1"></div>
      {items.map((item, index) => (
        <div key={index} className="relative z-10 group">
          <div
            className={`flex items-center ${item.side === 'left' ? 'flex-row-reverse' : ''} w-full`}
          >
            <div className="w-1/2">
              <div
                className={`p-4 rounded-lg group-hover:bg-white/80 group-hover:shadow-lg group-hover:backdrop-blur-sm transition-all duration-300 ${
                  item.side === 'left' ? 'mr-10 text-left' : 'ml-10 text-right'
                }`}
              >
                <h4 className="font-bold text-lg text-gray-800">{item.title}</h4>
                <p className="text-gray-600">{item.institution}</p>
                {item.date && <p className="text-sm text-gray-500 mt-1">{item.date}</p>}
              </div>
            </div>
            <div className="absolute left-1/2 -ml-4 w-8 h-8 rounded-full bg-teal-500 border-4 border-white shadow-md"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
