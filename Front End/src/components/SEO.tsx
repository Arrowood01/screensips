import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEOProps } from '../types';
import { SEO_CONFIG } from '../utils/constants';

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image = SEO_CONFIG.defaultImage,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'Screen Sips',
  section,
  tags = []
}) => {
  const fullUrl = url ? `${SEO_CONFIG.url}${url}` : SEO_CONFIG.url;
  const fullImageUrl = image.startsWith('http') ? image : `${SEO_CONFIG.url}${image}`;
  const fullKeywords = keywords ? `${keywords}, ${SEO_CONFIG.defaultKeywords}` : SEO_CONFIG.defaultKeywords;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={fullKeywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SEO_CONFIG.defaultTitle} />
      <meta property="og:locale" content="en_US" />
      
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {section && <meta property="article:section" content={section} />}
      {tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImageUrl} />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#f97316" />
      <meta name="msapplication-TileColor" content="#f97316" />
    </Helmet>
  );
};

export default SEO; 