import React from "react";
import { Helmet } from "react-helmet-async";

const SEOHead = ({
  title = "TicketBari - Your Ultimate Travel Companion",
  description = "Book bus, train, launch, and flight tickets seamlessly across Bangladesh. Best prices, instant confirmation, and 24/7 support. Your next adventure starts here.",
  keywords = "ticket booking, bus tickets, train tickets, flight tickets, launch tickets, Bangladesh travel, online booking, travel booking",
  image = "/og-image.jpg",
  url = "https://ticketbari.com",
  type = "website",
  author = "TicketBari Team",
}) => {
  const fullTitle = title.includes("TicketBari")
    ? title
    : `${title} | TicketBari`;
  const fullUrl = url.startsWith("http") ? url : `https://ticketbari.com${url}`;
  const fullImage = image.startsWith("http")
    ? image
    : `https://ticketbari.com${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="TicketBari" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@ticketbari" />
      <meta name="twitter:creator" content="@ticketbari" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#10B981" />
      <meta name="msapplication-TileColor" content="#10B981" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="TicketBari" />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "TicketBari",
          description: description,
          url: "https://ticketbari.com",
          logo: "https://ticketbari.com/logo.png",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+880-123-456-7890",
            contactType: "customer service",
            availableLanguage: ["English", "Bengali"],
          },
          sameAs: [
            "https://facebook.com/ticketbari",
            "https://twitter.com/ticketbari",
            "https://instagram.com/ticketbari",
            "https://linkedin.com/company/ticketbari",
          ],
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;
