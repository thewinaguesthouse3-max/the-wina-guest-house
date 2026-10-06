import { Property } from '@/src/data/properties';
import { BlogPost } from '@/src/data/blog';

const DEFAULT_TITLE = 'The Wina Hospitality | Luxury Accommodations in Bali';
const DEFAULT_DESC =
  'Discover your perfect stay in Bali with The Wina Hospitality. Premium guest houses and private villas in Canggu and Echo Beach.';
const PRODUCTION_SITE_URL = 'https://thewina-hospitality.com';
export const SITE_URL = PRODUCTION_SITE_URL;
export const DEFAULT_OG_IMAGE = `${PRODUCTION_SITE_URL}/og-image.jpg`;

export function getSiteBaseUrl(): string {
  if (typeof window !== 'undefined' && window.location.origin && !window.location.origin.includes('localhost')) {
    return window.location.origin;
  }
  return PRODUCTION_SITE_URL;
}

export function updatePageSeo(params: {
  title?: string;
  description?: string;
  canonicalPath?: string;
  schemaJson?: object;
  image?: string;
}) {
  if (typeof document === 'undefined') return;

  const currentBaseUrl = getSiteBaseUrl();
  const title = params.title || DEFAULT_TITLE;
  const description = params.description || DEFAULT_DESC;
  const canonicalUrl = params.canonicalPath
    ? (params.canonicalPath.startsWith('http') ? params.canonicalPath : `${currentBaseUrl}${params.canonicalPath}`)
    : `${currentBaseUrl}/`;

  let rawImage = params.image || '/og-image.jpg';
  let imageUrl = rawImage;
  if (rawImage.startsWith('/')) {
    imageUrl = `${currentBaseUrl}${rawImage}`;
  } else if (!rawImage.startsWith('http')) {
    imageUrl = `${currentBaseUrl}/${rawImage}`;
  }

  // Update Document Title
  document.title = title;

  // Update Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', description);

  // Update OpenGraph Title
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', title);

  // Update OpenGraph Description
  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', description);

  // Update OpenGraph URL
  let ogUrl = document.querySelector('meta[property="og:url"]');
  if (!ogUrl) {
    ogUrl = document.createElement('meta');
    ogUrl.setAttribute('property', 'og:url');
    document.head.appendChild(ogUrl);
  }
  ogUrl.setAttribute('content', canonicalUrl);

  // Update OpenGraph Image
  let ogImage = document.querySelector('meta[property="og:image"]');
  if (!ogImage) {
    ogImage = document.createElement('meta');
    ogImage.setAttribute('property', 'og:image');
    document.head.appendChild(ogImage);
  }
  ogImage.setAttribute('content', imageUrl);

  let ogImageSecure = document.querySelector('meta[property="og:image:secure_url"]');
  if (ogImageSecure) {
    ogImageSecure.setAttribute('content', imageUrl);
  } else {
    ogImageSecure = document.createElement('meta');
    ogImageSecure.setAttribute('property', 'og:image:secure_url');
    ogImageSecure.setAttribute('content', imageUrl);
    document.head.appendChild(ogImageSecure);
  }

  // Update Twitter Title & Description
  let twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) twitterTitle.setAttribute('content', title);
  let twitterDesc = document.querySelector('meta[name="twitter:description"]');
  if (twitterDesc) twitterDesc.setAttribute('content', description);

  // Update Twitter Image
  let twitterImg = document.querySelector('meta[name="twitter:image"]');
  if (!twitterImg) {
    twitterImg = document.createElement('meta');
    twitterImg.setAttribute('name', 'twitter:image');
    document.head.appendChild(twitterImg);
  }
  twitterImg.setAttribute('content', imageUrl);

  // Update Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', canonicalUrl);

  // Update Schema.org JSON-LD
  let schemaScript = document.getElementById('wina-schema-dynamic');
  if (!schemaScript) {
    schemaScript = document.createElement('script');
    schemaScript.id = 'wina-schema-dynamic';
    schemaScript.setAttribute('type', 'application/ld+json');
    document.head.appendChild(schemaScript);
  }

  if (params.schemaJson) {
    schemaScript.textContent = JSON.stringify(params.schemaJson);
  } else {
    // Default Organization & LocalBusiness Schema
    schemaScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${currentBaseUrl}/#organization`,
          name: 'The Wina Hospitality',
          url: `${currentBaseUrl}/`,
          logo: `${currentBaseUrl}/the-wina-logo.svg`,
          image: imageUrl,
          description: 'Hospitality, Guest House, Villa, and Accommodation Management in Canggu, Bali.',
          email: 'thewinaguesthouse3@gmail.com',
          sameAs: ['https://www.instagram.com/the_wina_guesthouse'],
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Canggu',
            addressRegion: 'Bali',
            addressCountry: 'ID',
          },
        },
        {
          '@type': 'LocalBusiness',
          name: 'The Wina Hospitality',
          url: `${SITE_URL}/`,
          image: DEFAULT_OG_IMAGE,
          priceRange: 'Rp250.000 - Rp1.635.000',
          telephone: '+62 823-1779-1322',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Canggu, Kuta Utara, Badung',
            addressLocality: 'Canggu',
            addressRegion: 'Bali',
            postalCode: '80361',
            addressCountry: 'ID',
          },
        },
      ],
    });
  }
}

export function generatePropertySchema(property: Property) {
  const propertyUrl = `${SITE_URL}${property.canonicalUrl}`;

  const schemaGraph: any[] = [
    {
      '@type': property.category === 'villa' ? 'LodgingBusiness' : 'Hotel',
      '@id': propertyUrl,
      name: property.name,
      description: property.seoDescription,
      url: propertyUrl,
      priceRange: `From Rp${property.startingPriceIdr.toLocaleString('id-ID')}/night`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: property.location,
        addressLocality: 'Canggu',
        addressRegion: 'Bali',
        addressCountry: 'ID',
      },
      checkinTime: property.checkIn,
      checkoutTime: property.checkOut,
      keywords: property.targetKeywords.join(', '),
      amenityFeature: property.amenities.map((a) => ({
        '@type': 'LocationFeatureSpecification',
        name: a.nameEn,
        value: true,
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${SITE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Properties',
          item: `${SITE_URL}/#properties`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: property.name,
          item: propertyUrl,
        },
      ],
    },
  ];

  if (property.faqs && property.faqs.length > 0) {
    schemaGraph.push({
      '@type': 'FAQPage',
      mainEntity: property.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.questionEn,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answerEn,
        },
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': schemaGraph,
  };
}

export function generateBlogSchema(post: BlogPost) {
  const postUrl = `${SITE_URL}${post.canonicalUrl}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': postUrl,
        headline: post.titleEn,
        description: post.metaDescEn,
        articleSection: post.categoryEn,
        author: {
          '@type': 'Organization',
          name: 'The Wina Hospitality',
          url: `${SITE_URL}/`,
        },
        publisher: {
          '@type': 'Organization',
          name: 'The Wina Hospitality',
          url: `${SITE_URL}/`,
        },
        datePublished: '2026-10-01',
        dateModified: '2026-10-02',
        mainEntityOfPage: postUrl,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SITE_URL}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Travel Guides',
            item: `${SITE_URL}/#blog`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.titleEn,
            item: postUrl,
          },
        ],
      },
    ],
  };
}
