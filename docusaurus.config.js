module.exports = {
  title: 'AgileTs',
  tagline: 'Agile is a global state and logic framework for reactive Typescript & Javascript applications. Supporting frameworks like React and React Native.',
  url: 'https://agile-ts.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'agile/agile-ts', // Usually your GitHub org/user name.
  projectName: 'agile', // Usually your repo name.
  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
    },
    navbar: {
      title: 'AgileTs',
      logo: {
        alt: 'My Site Logo',
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
          href: 'https://github.com/agile-ts/agile',
          position: 'right',
          className: 'header-github-link header-icon-link',
          'aria-label': 'GitHub repository',
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
              label: 'Get Started',
              to: 'docs/',
            },
            {
              label: 'Style Guide',
              to: 'docs/doc2/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/agile-ts',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/9Edsb3z',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/DevBenno',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/agile-ts/agile',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} BennoDev`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
