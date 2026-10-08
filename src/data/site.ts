// Single source of truth for site identity, authorship and the structured-data
// references every page points at. Change a detail here and it updates sitewide.

export const SITE_URL = 'https://airconditionanswers.com';
export const SITE_NAME = 'AirConditionAnswers';
export const SITE_EMAIL = 'hello@airconditionanswers.com';
export const LOGO_URL = `${SITE_URL}/logo_final_transparent.png`;

export const AUTHOR = {
  name: 'Mark Curant',
  path: '/about/mark-curant',
  url: `${SITE_URL}/about/mark-curant`,
  id: `${SITE_URL}/about/mark-curant#person`,
  shortBio:
    'Mark Curant is the founder of AirConditionAnswers.com. He runs several retail stores in the Caribbean, where electricity costs over 30¢/kWh, power isn\'t always reliable, and air conditioning runs year-round. He taught himself the technical side so he could spot an inflated quote, handle routine maintenance himself, and avoid repairs he doesn\'t need, and built the site\'s calculators to make his own cooling decisions.',
};

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

/** Reference used as `author` in Article / Review structured data. */
export const AUTHOR_REF = {
  '@type': 'Person',
  '@id': AUTHOR.id,
  name: AUTHOR.name,
  url: AUTHOR.url,
};

/** Reference used as `publisher` in Article / Review structured data. */
export const PUBLISHER_REF = {
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: LOGO_URL,
  },
};

/** Builds Article structured data for pages that don't define their own. */
export function articleJsonLd(opts: {
  path: string;
  headline: string;
  description: string;
  dateModified: string;
  datePublished?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    mainEntityOfPage: `${SITE_URL}${opts.path}`,
    author: AUTHOR_REF,
    publisher: PUBLISHER_REF,
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    dateModified: opts.dateModified,
  };
}
