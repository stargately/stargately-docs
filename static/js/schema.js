// Add structured data for better SEO
document.addEventListener("DOMContentLoaded", function () {
  const schemaScript = document.createElement("script");
  schemaScript.type = "application/ld+json";
  schemaScript.innerHTML = JSON.stringify({
    "@context": "https://schema.org/",
    "@type": "Organization",
    name: "Stargately",
    url: "https://stargately.com/",
    logo: "https://stargately.com/img/logo.svg",
    description:
      "Enterprise-grade AI and blockchain solutions for organizations seeking technological excellence",
    sameAs: ["https://github.com/stargately"],
  });
  document.head.appendChild(schemaScript);

  // Add Open Graph image meta tag if not already present
  if (!document.querySelector('meta[property="og:image"]')) {
    const ogImage = document.createElement("meta");
    ogImage.setAttribute("property", "og:image");
    ogImage.setAttribute(
      "content",
      "https://stargately.com/img/social-card.png",
    );
    document.head.appendChild(ogImage);
  }

  // Add Twitter card meta tag if not already present
  if (!document.querySelector('meta[name="twitter:card"]')) {
    const twitterCard = document.createElement("meta");
    twitterCard.setAttribute("name", "twitter:card");
    twitterCard.setAttribute("content", "summary_large_image");
    document.head.appendChild(twitterCard);
  }
});
