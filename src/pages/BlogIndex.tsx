import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Clock, Search } from 'lucide-react';
import { useState } from 'react';

const articles = [
  {
    slug: 'air-filter-electricity-bill',
    title: 'Change Your Air Filter, Change Your Bill: The $10 Fix That Pays for Itself Every Month',
    description: "A clogged air filter reduces AC efficiency by 5–15%, costing $90–$308/year in wasted electricity. Learn how often to change yours, which MERV rating to use, and what else to maintain.",
    date: '2026-02-05',
    readTime: '6 min read',
    category: 'HVAC Guides'
  },
  {
    slug: 'what-is-seer-rating',
    title: 'What Is a SEER Rating — and Why Your Wallet Cares',
    description: 'Air conditioning is nearly one-fifth of your electric bill. Learn how the SEER rating determines what you pay — with real cost tables from the U.S. average to Hawaii\'s 39.8¢/kWh.',
    date: '2026-04-16',
    readTime: '6 min read',
    category: 'HVAC Guides'
  },
  {
    slug: 'thermostat-setback-strategy',
    title: 'The $0 Thermostat Strategy: How to Cut Your Cooling Bill Without Buying Anything',
    description: "The DOE says adjusting your thermostat 7–10°F for 8 hours a day saves 10% on cooling. Here's the exact setback schedule, the ceiling fan trick, and the myths that are costing you money — all free.",
    date: '2026-01-29',
    readTime: '6 min read',
    category: 'HVAC Guides'
  },
  {
    slug: 'smart-thermostat-vs-programmable',
    title: 'Smart Thermostat vs. Programmable Thermostat: Which One Actually Saves You More?',
    description: 'Smart thermostats cost $200+ but can save $180–$500/year on cooling bills. Learn whether upgrading from a programmable thermostat is worth it, especially in high-rate areas.',
    date: '2026-01-22',
    readTime: '6 min read',
    category: 'HVAC Guides'
  },
  {
    slug: 'hvac-seer-calculator-faq',
    title: 'HVAC SEER Calculator FAQ: Your Questions Answered',
    description: 'Everything you need to know about SEER ratings, energy savings, and choosing the right HVAC system',
    date: '2025-11-09',
    readTime: '12 min read',
    category: 'FAQ'
  },
  {
    slug: 'choosing-the-right-seer-rating',
    title: 'How to Choose the Right SEER Rating for Your Home',
    description: 'SEER 14, 16, 18, or 20+? This complete guide helps you choose the perfect SEER rating based on your climate, budget, and how long you\'ll stay in your home',
    date: '2025-11-09',
    readTime: '12 min read',
    category: 'Buying Guide'
  },
  {
    slug: 'how-to-read-hvac-label',
    title: 'How to Read Your HVAC System\'s Label and Find Your SEER Rating',
    description: 'Step-by-step guide to finding and understanding your AC unit\'s nameplate. Learn how to decode model numbers, find SEER ratings, and identify key specifications',
    date: '2025-11-09',
    readTime: '11 min read',
    category: 'HVAC Guides'
  },
  {
    slug: 'ac-repair-cost-2026',
    title: 'How Much Does AC Repair Cost? Complete 2026 Price Guide by Problem',
    description: 'AC repair costs $150-$2,500 depending on the problem. Complete breakdown: no cooling ($200-$2,500), won\'t turn on ($150-$800), making noise ($150-$1,200), and 15+ common issues',
    date: '2026-01-04',
    readTime: '13 min read',
    category: 'Maintenance'
  },
  {
    slug: 'hvac-tax-credits-rebates-2026',
    title: '2026 HVAC Tax Credits & Rebates: Complete Guide (United States)',
    description: 'Save $500-$3,600+ on HVAC upgrades in 2026. Complete guide to federal tax credits (30%, max $2,000), state rebates, utility incentives, and how to stack them',
    date: '2026-01-02',
    readTime: '13 min read',
    category: 'Buying Guide'
  },
  {
    slug: 'ac-unit-cost-2026',
    title: 'How Much Does a New AC Unit Cost in 2026? (Complete Price Guide)',
    description: 'New AC costs $3,500-$12,000+ installed in 2026. Get accurate pricing by size, SEER rating, brand, and region. Plus hidden costs, financing options, and ROI calculator',
    date: '2026-01-02',
    readTime: '14 min read',
    category: 'Buying Guide'
  },
  {
    slug: 'mini-split-cost-2026',
    title: 'Mini-Split AC Cost 2026: Complete Ductless System Pricing Guide',
    description: 'Mini-split costs $1,500-$4,000 for single zone, $3,500-$10,000 for multi-zone. Detailed pricing by zones, brands, installation, and efficiency ratings',
    date: '2026-01-02',
    readTime: '15 min read',
    category: 'Buying Guide'
  },
  {
    slug: 'how-long-do-air-conditioners-last',
    title: 'How Long Does an Air Conditioner Last? (By Brand, Type, and Climate)',
    description: 'Air conditioners last 15-20 years on average. Learn AC lifespan by brand (Carrier, Trane, Goodman), type (central, mini-split), climate, and how to maximize longevity',
    date: '2026-01-03',
    readTime: '11 min read',
    category: 'HVAC Guides'
  },
  {
    slug: 'when-to-replace-air-conditioner',
    title: 'When to Replace Your Air Conditioner: 11 Warning Signs It\'s Time',
    description: 'Is your AC dying? Learn the 11 warning signs it\'s time to replace your air conditioner, repair vs replace decision guide, and how to avoid costly emergency replacement',
    date: '2026-01-03',
    readTime: '12 min read',
    category: 'HVAC Guides'
  },
  {
    slug: 'best-air-conditioner-brands-2026',
    title: 'Best Air Conditioner Brands 2026: Reliability Rankings, Pricing & Expert Reviews',
    description: 'Trane, Carrier, Lennox, or Goodman? Compare 15+ air conditioner brands by reliability, SEER2 efficiency, warranty, price, and customer satisfaction. Updated for 2026 with real pricing data',
    date: '2026-01-04',
    readTime: '18 min read',
    category: 'Buying Guide'
  },
  {
    slug: 'ac-repair-cost-vs-replacement',
    title: 'AC Repair Cost vs Replacement: The $5,000 Rule Explained (2026 Guide)',
    description: 'AC repair costs $150-$2,500. Learn when to repair vs replace using the $5,000 rule, complete repair cost breakdown, and ROI calculations for replacement',
    date: '2026-01-03',
    readTime: '14 min read',
    category: 'Maintenance'
  },
  {
    slug: 'seer-eer-hspf-explained',
    title: 'SEER vs EER vs HSPF: HVAC Efficiency Ratings Explained',
    description: 'Confused by SEER, EER, HSPF, and other HVAC acronyms? This complete guide explains what each rating means, how they differ, and which matters most',
    date: '2025-11-09',
    readTime: '10 min read',
    category: 'HVAC Education'
  },
  {
    slug: 'history-of-seer-ratings',
    title: 'The History of SEER Ratings: How AC Efficiency Standards Evolved',
    description: 'From the 1970s energy crisis to today\'s ultra-efficient systems, discover how SEER ratings transformed air conditioning and saved billions in energy costs',
    date: '2025-11-09',
    readTime: '8 min read',
    category: 'HVAC History'
  }
];

const getCategoryColors = (category: string) => {
  const colors = {
    'FAQ': 'bg-[#DBEAFE] text-[#1E40AF]',
    'Buying Guide': 'bg-[#D1FAE5] text-[#065F46]',
    'HVAC Guides': 'bg-[#FEF3C7] text-[#92400E]',
    'Maintenance': 'bg-[#E0E7FF] text-[#3730A3]',
    'HVAC Education': 'bg-[#FCE7F3] text-[#9F1239]',
    'HVAC History': 'bg-[#F3F4F6] text-[#374151]'
  };
  return colors[category as keyof typeof colors] || 'bg-[#DBEAFE] text-teal-600';
};

export default function BlogIndex() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', ...Array.from(new Set(articles.map(a => a.category)))];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCardClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  return (
    <>
      <Helmet>
        <title>Efficiency Hub - HVAC Guides & Articles | seercalc.pro</title>
        <meta name="description" content="Expert guides on HVAC efficiency, SEER ratings, energy savings, and air conditioning systems. Learn how to save money and choose the right AC for your home." />
        <meta name="keywords" content="HVAC blog, SEER rating guide, air conditioner efficiency, AC savings tips, energy efficiency articles" />
        <link rel="canonical" href="https://seercalc.pro/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://seercalc.pro/blog" />
        <meta property="og:title" content="Efficiency Hub - HVAC Guides & Articles" />
        <meta property="og:description" content="Expert guides on HVAC efficiency, SEER ratings, and energy savings." />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Efficiency Hub - HVAC Guides & Articles" />
        <meta name="twitter:description" content="Expert guides on HVAC efficiency, SEER ratings, and energy savings." />
      </Helmet>

      <div className="bg-gradient-to-b from-[#F0F9FF] to-white">
        <main className="max-w-[1100px] mx-auto px-6 py-12 md:py-16">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#111827] mb-4">
              Efficiency Hub
            </h1>
            <p className="text-lg md:text-xl text-[#4B5563] max-w-[700px] mx-auto">
              Expert guides on HVAC efficiency, SEER ratings, and energy savings
            </p>
          </header>

          <div className="max-w-[500px] mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-[#E5E7EB] rounded-full focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-[#111827]"
              />
            </div>
          </div>

          <div className="mb-12 flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold text-[15px] transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-teal-500 text-white shadow-[0_2px_8px_rgba(20,184,166,0.25)] border-2 border-teal-500'
                    : 'bg-white text-[#4B5563] border-2 border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:border-teal-500 hover:text-teal-600 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(20,184,166,0.15)]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="text-center mb-6">
            <p className="text-sm text-[#6B7280]">
              Showing {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
            </p>
          </div>

          <div className="space-y-6">
            {filteredArticles.map((article, index) => (
              <article
                key={article.slug}
                onClick={() => handleCardClick(article.slug)}
                className={`bg-white rounded-2xl border-2 border-[#E5E7EB] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:border-[#0066CC] hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,102,204,0.12)] transition-all duration-300 cursor-pointer ${
                  index === 0 ? 'md:p-8 bg-gradient-to-br from-white to-[#F0F9FF]' : ''
                }`}
              >
                <div className="flex items-center gap-2 text-sm mb-3">
                  {index === 0 && (
                    <span className="bg-gradient-to-r from-[#0066CC] to-[#059669] text-white px-3 py-1 rounded-md font-semibold text-xs uppercase tracking-wide mr-1">
                      Featured
                    </span>
                  )}
                  <span className={`${getCategoryColors(article.category)} px-3 py-1 rounded-md font-semibold text-xs uppercase tracking-wide`}>
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-[#6B7280] ml-2">
                    <Clock className="w-4 h-4" />
                    {article.readTime}
                  </span>
                </div>

                <h2 className={`${index === 0 ? 'text-3xl md:text-4xl' : 'text-2xl'} font-bold text-[#111827] mb-3 leading-tight hover:text-teal-600 transition-colors duration-200`}>
                  {article.title}
                </h2>

                <p className="text-base text-[#4B5563] mb-4 leading-relaxed">
                  {article.description}
                </p>

                <div className="inline-flex items-center gap-2 text-teal-600 font-semibold text-base hover:text-teal-700 transition-colors duration-200">
                  <span>Read Article</span>
                  <span className="text-lg">→</span>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-br from-[#F0F9FF] to-[#F0FDFA] rounded-2xl p-8 md:p-12 text-center border-2 border-teal-500/10 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-3">
              Ready to Calculate Your Savings?
            </h2>
            <p className="text-lg text-[#4B5563] mb-6 max-w-[600px] mx-auto">
              Use our free calculator to see how much you could save with a more efficient HVAC system
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-[#0066CC] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#0052A3] transition-all duration-200 shadow-[0_4px_12px_rgba(0,102,204,0.25)] hover:shadow-[0_6px_16px_rgba(0,102,204,0.35)] hover:-translate-y-0.5"
            >
              <span>Go to Calculator</span>
              <span>→</span>
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
