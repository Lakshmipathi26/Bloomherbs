import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url }) => {
  const siteTitle = 'BloomHerbs';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || 'Shop premium natural & organic products at BloomHerbs.'} />
      <meta name="keywords" content={keywords || 'organic, herbal, tea, coffee, spices, honey'} />
      <link rel="canonical" href={url || window.location.origin} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || 'Shop premium natural & organic products at BloomHerbs.'} />
      <meta property="og:image" content={image || '/og-image.png'} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || 'Shop premium natural & organic products at BloomHerbs.'} />
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'BloomHerbs',
          url: window.location.origin,
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
