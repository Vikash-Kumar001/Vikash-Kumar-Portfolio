/**
 * Generate JSON-LD structured data for a person
 * @param {Object} data - Person data
 * @returns {Object} JSON-LD object
 */
export const generatePersonSchema = (data) => {
  const { name, jobTitle, url, sameAs = [], image } = data;

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    url,
    sameAs,
    ...(image && { image }),
  };
};

/**
 * Generate JSON-LD structured data for a project
 * @param {Object} data - Project data
 * @returns {Object} JSON-LD object
 */
export const generateProjectSchema = (data) => {
  const { name, description, url, image, technologies = [] } = data;

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name,
    description,
    url,
    ...(image && { image }),
    ...(technologies.length > 0 && {
      keywords: technologies.join(', '),
    }),
  };
};

/**
 * Generate meta tags object for a page
 * @param {Object} data - Page metadata
 * @returns {Object} Meta tags object
 */
export const generateMetaTags = (data) => {
  const {
    title,
    description,
    keywords = '',
    image = '',
    url = '',
    type = 'website',
  } = data;

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : '';

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: fullUrl,
      type,
      ...(fullImage && { image: fullImage }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(fullImage && { image: fullImage }),
    },
  };
};

