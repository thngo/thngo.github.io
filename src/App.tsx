import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingSkeleton from './components/common/LoadingSkeleton';

const Profile = lazy(() => import('./pages/Profile'));
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));
const SmiFsm = lazy(() => import('./pages/SmiFsm'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow pt-16">
            <Suspense fallback={<LoadingSkeleton />}>
              <Routes>
                <Route path="/" element={<Navigate to="/profiles/tra-ngo" replace />} />
                <Route path="/profiles/:slug" element={<Profile />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/misc/smi-fsm" element={<SmiFsm />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
