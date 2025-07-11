import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics, track } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import About from './pages/About';
import TipJar from './pages/TipJar';
import DrinkResponsibly from './pages/DrinkResponsibly';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

function App() {
  useEffect(() => {
    // Send analytics event for app initialization
    track('app_loaded', { timestamp: new Date().toISOString() });
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/tip" element={<TipJar />} />
              <Route path="/drink-responsibly" element={<DrinkResponsibly />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
            </Routes>
          </ErrorBoundary>
        </Layout>
        <Analytics mode="production" debug={true} />
        <SpeedInsights />
      </Router>
    </ErrorBoundary>
  );
}

export default App;