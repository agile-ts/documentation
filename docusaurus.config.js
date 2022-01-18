const {
  Agile,
  generateId,
  createState,
  createCollection,
  createComputed,
} = require('@agile-ts/core');
const {
  AgileHOC,
  useAgile,
  useWatcher,
  useProxy,
  useSelector,
  useValue,
} = require('@agile-ts/react');
const { Event, useEvent } = require('@agile-ts/event');
const { toast } = require('react-toastify');

const githubOrgUrl = 'https://github.com/hpcaitech';
const domain = 'https://colossalai.org';
const npmOrgUrl = 'https://www.npmjs.com/package/@agile-ts';

const customFields = {
  copyright: `Copyright © ${(new Date()).getFullYear()} All Rights Reserved by HPC-AI Technology Inc.`,
  meta: {
    title: 'A Unified Deep Learning System for Large-Scale Parallel Training',
    image: '/img/meta.png',
    description:
      'A unified deep learning system designed to train large-scale models efficiently' +
      'with tensor, model and pipeline parallelism as well as heterogeneous computing' +
      'to speed up the training process of increasingly large models for the machine learning community',
    color: '#6c69a0',
    keywords: [
      'deep learning',
      'machine learning',
      'distributed training',
      'high-performance computing',
      'parallel computing',
      'heterogeneous computing',
      'computer system'
    ],
  },
  domain,
  githubOrgUrl,
  githubUrl: `${githubOrgUrl}/ColossalAI`,
  githubDocsUrl: `${githubOrgUrl}/documentation`,
  npmCoreUrl: `${npmOrgUrl}/core`,
  twitterUrl: 'https://twitter.com/AgileFramework',
  redditUrl: 'https://www.reddit.com/r/AgileTs/',
  version: '0.0.1',
  liveCodeScope: {
    Agile,
    createState,
    createCollection,
    createComputed,
    useAgile,
    useProxy,
    useEvent,
    useWatcher,
    useSelector,
    useValue,
    AgileHOC,
    generateId,
    Event,
    toast,
  },
};

const config = {
  title: 'Colossal-AI',
  tagline: 'An integrated large-scale model training system with efficient parallelization techniques.',
  url: customFields.domain,
  baseUrlIssueBanner: false,
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'HPC-AI Tech',
  projectName: 'https://github.com/hpcaitech/ColossalAI',
  themes: ['@docusaurus/theme-live-codeblock'],
  scripts: [{ src: 'https://snack.expo.io/embed.js', async: true }], // https://github.com/expo/snack/blob/main/docs/embedding-snacks.md
  plugins: [
    'docusaurus-plugin-sass',
    // @docusaurus/plugin-google-analytics (Not necessary because it automatically gets added)
  ],
  customFields: { ...customFields },
  themeConfig: {
    hideableSidebar: false,
    // https://docusaurus.io/docs/search#using-algolia-docsearch
    algolia: {
      appId: '64P3EOD5L9',
      apiKey: '461e97fe74b935316bf63af4a6a93345',
      indexName: 'agile-ts',
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    // image: '/img/meta.png', // Gets used in Head as Meta Image (og:image)
    prism: {
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/dracula'),
    },
    navbar: {
      title: ' ',
      hideOnScroll: true,
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        // left
        // {
        //   label: 'Get Started',
        //   position: 'left',
        //   to: '/tutorials/installation/'
        // },
        {
          label: 'Tutorials',
          position: 'left',
          to: 'tutorials/get_started/installation'
        },
        {
          label: 'Documentation',
          position: 'left',
          to: 'docs/introduction',
        },
      ],
    },
    footer: {
      copyright: customFields.copyright,
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Get Started',
              to: 'tutorials/installation',
            },
            {
              label: 'Examples',
              to: 'docs/examples',
            },
            {
              label: 'React',
              to: 'docs/quick-start/react',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: customFields.githubUrl,
            },
            // {
            //   label: 'Twitter',
            //   href: customFields.twitterUrl,
            // },
          ],
        },
        // {
        //   title: 'More',
        //   items: [
        //     {
        //       label: 'Privacy Policy',
        //       to: '/legal/privacy-notice',
        //     },
        //     {
        //       label: 'Cookie Policy',
        //       to: '/legal/cookie-notice',
        //     },
        //     {
        //       label: 'Blog',
        //       to: '/blog/',
        //     },
        //   ],
        // },
      ],
    },
    googleAnalytics: {
      trackingID: 'UA-189394644-1',
      anonymizeIP: true, // Should IPs be anonymized?
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'tutorials',
          routeBasePath: 'tutorials',
          // routeBasePath: 'tutorials',
          admonitions: {
            icons: 'emoji',
          },
          sidebarPath: require.resolve('./sidebars.js'),
          showLastUpdateAuthor: false,
          showLastUpdateTime: true,
          remarkPlugins: [
            [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
          ],
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: [require.resolve('./src/css/custom.scss')],
        },
      },
    ],
  ],
};

module.exports = { ...config };
