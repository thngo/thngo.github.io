import { useParams } from 'react-router-dom';
import { useProfileData } from '../hooks/useProfileData';
import ProfileRenderer from '../components/profile/ProfileRenderer';
import LoadingSkeleton from '../components/common/LoadingSkeleton';

function Profile() {
  const { slug } = useParams<{ slug: string }>();
  const { data, loading, error } = useProfileData(slug);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error || !data) {
    return <div className="text-center p-10 text-red-500">{error || 'Profile not found.'}</div>;
  }

  return <ProfileRenderer data={data} />;
}

export default Profile;
