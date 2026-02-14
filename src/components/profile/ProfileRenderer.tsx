import type { ProfileData } from '../../types';
import AcademicTemplate from './templates/AcademicTemplate';
import BusinessTemplate from './templates/BusinessTemplate';
import MinimalTemplate from './templates/MinimalTemplate';

interface ProfileRendererProps {
  data: ProfileData;
}

function ProfileRenderer({ data }: ProfileRendererProps) {
  switch (data.meta.template) {
    case 'academic':
      return <AcademicTemplate data={data} />;
    case 'business':
      return <BusinessTemplate data={data} />;
    case 'creative':
      // Falls through to minimal until creative template is built
      return <MinimalTemplate data={data} />;
    case 'minimal':
      return <MinimalTemplate data={data} />;
    default:
      return <AcademicTemplate data={data} />;
  }
}

export default ProfileRenderer;
