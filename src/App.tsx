import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import BlogIndex from './pages/BlogIndex';
import BlogArticleFAQ from './pages/BlogArticleFAQ';
import BlogArticleHistory from './pages/BlogArticleHistory';
import BlogArticleRatings from './pages/BlogArticleRatings';
import BlogArticleChoosing from './pages/BlogArticleChoosing';
import BlogArticleLabel from './pages/BlogArticleLabel';
import BlogArticleCost from './pages/BlogArticleCost';
import BlogArticleMinisplit from './pages/BlogArticleMinisplit';
import BlogArticleTaxCredits from './pages/BlogArticleTaxCredits';
import BlogArticleLifespan from './pages/BlogArticleLifespan';
import BlogArticleReplacement from './pages/BlogArticleReplacement';
import BlogArticleBrands from './pages/BlogArticleBrands';
import BlogArticleRepairCost from './pages/BlogArticleRepairCost';
import BlogArticleACRepairCost from './pages/BlogArticleACRepairCost';
import BlogArticleWhatIsSEER from './pages/BlogArticleWhatIsSEER';
import BlogArticleSmartThermostat from './pages/BlogArticleSmartThermostat';
import BlogArticleFreeStrategy from './pages/BlogArticleFreeStrategy';
import BlogArticleAirFilter from './pages/BlogArticleAirFilter';

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return null;
}

function AppContent() {
  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/hvac-tax-credits-rebates-2026" element={<BlogArticleTaxCredits />} />
          <Route path="/blog/ac-unit-cost-2026" element={<BlogArticleCost />} />
          <Route path="/blog/mini-split-cost-2026" element={<BlogArticleMinisplit />} />
          <Route path="/blog/how-long-do-air-conditioners-last" element={<BlogArticleLifespan />} />
          <Route path="/blog/when-to-replace-air-conditioner" element={<BlogArticleReplacement />} />
          <Route path="/blog/best-air-conditioner-brands-2026" element={<BlogArticleBrands />} />
          <Route path="/blog/ac-repair-cost-vs-replacement" element={<BlogArticleRepairCost />} />
          <Route path="/blog/ac-repair-cost-2026" element={<BlogArticleACRepairCost />} />
          <Route path="/blog/hvac-seer-calculator-faq" element={<BlogArticleFAQ />} />
          <Route path="/blog/history-of-seer-ratings" element={<BlogArticleHistory />} />
          <Route path="/blog/seer-eer-hspf-explained" element={<BlogArticleRatings />} />
          <Route path="/blog/choosing-the-right-seer-rating" element={<BlogArticleChoosing />} />
          <Route path="/blog/how-to-read-hvac-label" element={<BlogArticleLabel />} />
          <Route path="/blog/what-is-seer-rating" element={<BlogArticleWhatIsSEER />} />
          <Route path="/blog/smart-thermostat-vs-programmable" element={<BlogArticleSmartThermostat />} />
          <Route path="/blog/thermostat-setback-strategy" element={<BlogArticleFreeStrategy />} />
          <Route path="/blog/air-filter-electricity-bill" element={<BlogArticleAirFilter />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
