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
import BlogArticleSeerChart from './pages/BlogArticleSeerChart';
import BlogArticleSeerVsSeer2 from './pages/BlogArticleSeerVsSeer2';
import BlogArticle16vs18Seer from './pages/BlogArticle16vs18Seer';
import BlogArticle18vs20Seer from './pages/BlogArticle18vs20Seer';
import BlogArticleSolarMiniSplit from './pages/BlogArticleSolarMiniSplit';
import BlogArticleHeatPumpVsAc from './pages/BlogArticleHeatPumpVsAc';
import BlogArticleHeatPumpCanada from './pages/BlogArticleHeatPumpCanada';
import BlogArticleFanVsAc from './pages/BlogArticleFanVsAc';
import BlogArticleFanCost from './pages/BlogArticleFanCost';
import BlogArticleFanBuyingGuide from './pages/BlogArticleFanBuyingGuide';
import BlogArticleFanDirection from './pages/BlogArticleFanDirection';
import BlogArticleFloatSwitchFlood from './pages/BlogArticleFloatSwitchFlood';
import BlogArticleHomeAirflow from './pages/BlogArticleHomeAirflow';
import BlogArticle14vs16Seer from './pages/BlogArticle14vs16Seer';
import BlogArticlePowerProtection from './pages/BlogArticlePowerProtection';
import BrandTrane from './pages/BrandTrane';
import BrandsIndex from './pages/BrandsIndex';
import BrandCarrier from './pages/BrandCarrier';
import BrandGoodman from './pages/BrandGoodman';
import BrandLennox from './pages/BrandLennox';
import BrandAmericanStandard from './pages/BrandAmericanStandard';
import BrandDaikin from './pages/BrandDaikin';
import BrandRheem from './pages/BrandRheem';
import BrandMitsubishi from './pages/BrandMitsubishi';
import CalculatorsIndex from './pages/CalculatorsIndex';
import CalculatorRepairVsReplace from './pages/CalculatorRepairVsReplace';
import CalculatorSeerToSeer2 from './pages/CalculatorSeerToSeer2';
import CalculatorACSizing from './pages/CalculatorACSizing';
import AboutMarkCurant from './pages/AboutMarkCurant';
import AcCostIndex from './pages/AcCostIndex';
import AcCostState from './pages/AcCostState';
import AcCostCaribbean from './pages/AcCostCaribbean';
import AcCostCanada from './pages/AcCostCanada';
import AcCostEurope from './pages/AcCostEurope';
import AcCostAustralia from './pages/AcCostAustralia';
import AcCostAustraliaState from './pages/AcCostAustraliaState';
import AcCostAsia from './pages/AcCostAsia';
import AcCostWorld from './pages/AcCostWorld';
import AcCostAsiaCountry from './pages/AcCostAsiaCountry';
import TroubleshootingHub from './pages/TroubleshootingHub';
import TroubleshootingSymptom from './pages/TroubleshootingSymptom';
import AcCostProvince from './pages/AcCostProvince';
import BlogArticleRunningCost from './pages/BlogArticleRunningCost';
import NotFound from './pages/NotFound';

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
          <Route path="/blog/seer-rating-chart" element={<BlogArticleSeerChart />} />
          <Route path="/blog/seer-vs-seer2-explained" element={<BlogArticleSeerVsSeer2 />} />
          <Route path="/blog/16-vs-18-seer" element={<BlogArticle16vs18Seer />} />
          <Route path="/blog/18-vs-20-seer" element={<BlogArticle18vs20Seer />} />
          <Route path="/blog/solar-mini-split" element={<BlogArticleSolarMiniSplit />} />
          <Route path="/blog/heat-pump-vs-central-ac" element={<BlogArticleHeatPumpVsAc />} />
          <Route path="/blog/heat-pump-canada" element={<BlogArticleHeatPumpCanada />} />
          <Route path="/blog/ceiling-fan-vs-ac-savings" element={<BlogArticleFanVsAc />} />
          <Route path="/blog/cost-to-run-a-fan" element={<BlogArticleFanCost />} />
          <Route path="/blog/ceiling-fan-buying-guide" element={<BlogArticleFanBuyingGuide />} />
          <Route path="/blog/ceiling-fan-direction" element={<BlogArticleFanDirection />} />
          <Route path="/blog/ac-float-switch-flood" element={<BlogArticleFloatSwitchFlood />} />
          <Route path="/blog/home-airflow-fans" element={<BlogArticleHomeAirflow />} />
          <Route path="/blog/14-vs-16-seer" element={<BlogArticle14vs16Seer />} />
          <Route path="/blog/protect-air-conditioner-power-surges-outages" element={<BlogArticlePowerProtection />} />
          <Route path="/brands/trane" element={<BrandTrane />} />
          <Route path="/brands" element={<BrandsIndex />} />
          <Route path="/brands/carrier" element={<BrandCarrier />} />
          <Route path="/brands/goodman" element={<BrandGoodman />} />
          <Route path="/brands/lennox" element={<BrandLennox />} />
          <Route path="/brands/american-standard" element={<BrandAmericanStandard />} />
          <Route path="/brands/daikin" element={<BrandDaikin />} />
          <Route path="/brands/rheem" element={<BrandRheem />} />
          <Route path="/brands/mitsubishi" element={<BrandMitsubishi />} />
          <Route path="/calculators" element={<CalculatorsIndex />} />
          <Route path="/calculators/repair-vs-replace" element={<CalculatorRepairVsReplace />} />
          <Route path="/calculators/seer-to-seer2" element={<CalculatorSeerToSeer2 />} />
          <Route path="/calculators/ac-sizing" element={<CalculatorACSizing />} />
          <Route path="/about/mark-curant" element={<AboutMarkCurant />} />
          <Route path="/troubleshooting" element={<TroubleshootingHub />} />
          <Route path="/troubleshooting/:symptom" element={<TroubleshootingSymptom />} />
          <Route path="/ac-cost" element={<AcCostIndex />} />
          <Route path="/ac-cost/caribbean" element={<AcCostCaribbean />} />
          <Route path="/ac-cost/canada" element={<AcCostCanada />} />
          <Route path="/ac-cost/europe" element={<AcCostEurope />} />
          <Route path="/ac-cost/australia" element={<AcCostAustralia />} />
          <Route path="/ac-cost/australia/:state" element={<AcCostAustraliaState />} />
          <Route path="/ac-cost/world" element={<AcCostWorld />} />
          <Route path="/ac-cost/asia" element={<AcCostAsia />} />
          <Route path="/ac-cost/asia/:country" element={<AcCostAsiaCountry />} />
          <Route path="/ac-cost/canada/:province" element={<AcCostProvince />} />
          <Route path="/ac-cost/:state" element={<AcCostState />} />
          <Route path="/blog/how-much-does-it-cost-to-run-ac" element={<BlogArticleRunningCost />} />
          <Route path="*" element={<NotFound />} />
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
