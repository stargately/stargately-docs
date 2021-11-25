module.exports = {
  title: 'Warping startup to the destination galaxy',
  tagline: 'with speed and quality',
  url: 'https://stargately.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'puncsky', // Usually your GitHub org/user name.
  projectName: 'stargately-docs', // Usually your repo name.
  stylesheets: [
    'https://fonts.googleapis.com/css?family=Zen+Kaku+Gothic+New',
  ],
  themeConfig: {
    navbar: {
      title: 'Stargately',
      logo: {
        alt: 'Stargately',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/puncsky/stargately-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'OneFx.JS Fullstack Framework',
              to: 'docs/',
            },
            {
              label: 'Pylon Stripe Subscription Manager',
              to: 'docs/onefx-mobile/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Telegram',
              href: 'https://t.me/system_design_and_architecture',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/puncsky',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'About Us',
              to: '/about-us',
            },
            {
              label: 'Blog',
              href: 'https://tianpan.co/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/puncsky',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Stargately.com`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarCollapsible: false,
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/puncsky/stargately-docs/edit/master/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/puncsky/stargately-docs/edit/master/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
