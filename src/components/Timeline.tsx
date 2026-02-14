import type { TimelineItem } from '../types';

interface TimelineProps {
  items: TimelineItem[];
}

function Timeline({ items }: TimelineProps) {
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
}

export default Timeline;
