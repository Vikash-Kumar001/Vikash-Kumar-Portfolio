import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEOHead = () => {
  const location = useLocation();

  const seoData = {
    '/': {
      title: 'Vikash Kumar | Full Stack Web Developer',
      description: 'Full Stack Web Developer skilled in React.js, Node.js, and modern web frameworks. Building secure APIs and scalable web applications.',
      keywords: 'full stack developer, react developer, node.js, web developer, portfolio, vikash kumar',
    },
    '/about': {
      title: 'About | Vikash Kumar',
      description: 'Learn more about Vikash Kumar, a Full Stack Web Developer with experience in React.js, Node.js, and modern web technologies',
      keywords: 'about, full stack developer, react, node.js, skills, experience',
    },
    '/projects': {
      title: 'Projects | Vikash Kumar',
      description: 'Explore my latest projects including StareX chat application and College Complaint Management System',
      keywords: 'projects, react projects, node.js projects, web development, portfolio',
    },
    '/contact': {
      title: 'Contact | Vikash Kumar',
      description: 'Get in touch with Vikash Kumar to discuss your next project or collaboration opportunity',
      keywords: 'contact, hire, collaboration, full stack developer',
    },
  };

  const currentSEO = seoData[location.pathname] || seoData['/'];

  useEffect(() => {
    document.title = currentSEO.title;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', currentSEO.description);

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', currentSEO.keywords);

    // Update Open Graph
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', currentSEO.title);

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute('content', currentSEO.description);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', window.location.href);

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.href);
  }, [location, currentSEO]);

  // Generate JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Vikash Kumar',
    jobTitle: 'Full Stack Web Developer',
    email: 'vikashkumarsudhi8527@gmail.com',
    telephone: '+91-8595654823',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Gurugram',
      addressRegion: 'Haryana',
      addressCountry: 'IN',
    },
    url: window.location.origin,
    sameAs: [
      'https://github.com/Vikash-Kumar001',
      'https://www.linkedin.com/in/vikash-kumar-2068b9219/',
    ],
  };

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </>
  );
};

export default SEOHead;

