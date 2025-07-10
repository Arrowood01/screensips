import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics, track } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import TipJar from './pages/TipJar';
import DrinkResponsibly from './pages/DrinkResponsibly';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

function App() {
  useEffect(() => {
    // Debug log to confirm analytics is loaded
    console.log('Vercel Analytics initialized');
    
    // Send a test event to verify analytics is working
    track('app_loaded', { timestamp: new Date().toISOString() });
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/tip" element={<TipJar />} />
          <Route path="/drink-responsibly" element={<DrinkResponsibly />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </Layout>
      <Analytics mode="production" debug={true} />
      <SpeedInsights />
    </Router>
  );
}

export default App;