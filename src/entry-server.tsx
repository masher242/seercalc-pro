import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider, HelmetServerState } from 'react-helmet-async';
import { StrictMode } from 'react';
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
import { Routes, Route } from 'react-router-dom';

function AppContent() {
  return (
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
  );
}

export function render(url: string) {
  const helmetContext: { helmet?: HelmetServerState } = {};

  const html = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <AppContent />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>
  );

  const { helmet } = helmetContext;

  return { html, helmet };
}

export const routes = [
  '/',
  '/blog',
  '/blog/hvac-tax-credits-rebates-2026',
  '/blog/ac-unit-cost-2026',
  '/blog/mini-split-cost-2026',
  '/blog/how-long-do-air-conditioners-last',
  '/blog/when-to-replace-air-conditioner',
  '/blog/best-air-conditioner-brands-2026',
  '/blog/ac-repair-cost-vs-replacement',
  '/blog/ac-repair-cost-2026',
  '/blog/hvac-seer-calculator-faq',
  '/blog/history-of-seer-ratings',
  '/blog/seer-eer-hspf-explained',
  '/blog/choosing-the-right-seer-rating',
  '/blog/how-to-read-hvac-label',
  '/blog/what-is-seer-rating',
  '/blog/smart-thermostat-vs-programmable',
  '/blog/thermostat-setback-strategy',
  '/blog/air-filter-electricity-bill',
];
