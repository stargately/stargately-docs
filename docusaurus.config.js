module.exports = {
  title: "Stargately | Enterprise AI & Blockchain Solutions",
  tagline: "The Innovation Ecosystem for AI Solutions",
  url: "https://stargately.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  favicon: "img/favicon.svg",
  organizationName: "puncsky", // Usually your GitHub org/user name.
  projectName: "stargately-docs", // Usually your repo name.
  stylesheets: ["https://fonts.googleapis.com/css?family=Zen+Kaku+Gothic+New"],
  themeConfig: {
    navbar: {
      hideOnScroll: true,
      title: "Stargately",
      logo: {
        alt: "Stargately - Enterprise AI & Blockchain Solutions",
        src: "img/logo.svg",
      },
      items: [
        { to: "about-us", label: "About Us", position: "right" },
        {
          href: "mailto:dev@stargately.com",
          label: "Contact",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      copyright: `Copyright © ${new Date().getFullYear()} Stargately.com | Enterprise AI & Blockchain Solutions`,
    },
    // Improved site performance
    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    // SEO optimization
    metadata: [
      {
        name: "description",
        content:
          "Stargately develops enterprise-grade AI and blockchain solutions including Cuckoo.Network, BlockEden.xyz, and Beancount.io to empower organizations with technological excellence.",
      },
      {
        name: "keywords",
        content:
          "artificial intelligence, blockchain, enterprise solutions, AI platform, decentralized finance, Web3, cloud infrastructure, fintech",
      },
      { name: "robots", content: "index, follow" },
      { name: "author", content: "Stargately" },
    ],
  },
  // Add custom head tags through the presets configuration
  customFields: {
    description:
      "Enterprise-grade AI and blockchain solutions for organizations seeking technological excellence",
    ogImage: "https://stargately.com/img/social-card.png",
    orgName: "Stargately",
    orgUrl: "https://stargately.com/",
    orgLogo: "https://stargately.com/img/logo.svg",
    githubUrl: "https://github.com/stargately",
  },
  presets: [
    [
      "classic",
      {
        docs: {
          sidebarCollapsible: false,
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/stargately/stargately-docs/edit/master/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: "https://github.com/stargately/stargately-docs/edit/master/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "G-RP4FY9MQKR",
          anonymizeIP: false,
        },
      },
    ],
  ],
  // Custom scripts to add to the end of <head>
  scripts: [
    {
      src: "/js/schema.js",
      async: true,
    },
  ],
};
