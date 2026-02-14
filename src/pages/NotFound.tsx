import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="container mx-auto p-8 text-center min-h-[60vh] flex flex-col items-center justify-center">
      <h1 className="text-8xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
      <p className="text-xl text-gray-600 mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-teal-500 text-white px-8 py-3 rounded-lg hover:bg-teal-600 transition-colors font-semibold"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
