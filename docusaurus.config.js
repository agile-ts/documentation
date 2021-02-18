const githubOrgUrl = "https://github.com/agile-ts";
const domain = "https://agile-ts.org";

const customFields = {
  copyright: `Created with 💜 in Germany     |    Copyright © ${new Date().getFullYear()} BennoDev`,
  description: "AgileTs is a spacy, fast, simple State Management Framework",
  domain,
  githubOrgUrl,
  githubUrl: `${githubOrgUrl}/agile`,
  githubDocsUrl: `${githubOrgUrl}/documentation`,
  discordUrl: `https://discord.gg/T9GzreAwPH`,
  stackoverflowUrl: "https://stackoverflow.com/questions/tagged/agile-ts",
  twitterUrl: "https://twitter.com/AgileFramework",
  version: "0.0.1",
  announcementBarContent:
    '⭐️ If you like AgileTs, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/agile-ts/agile">GitHub</a>! ⭐️',
};

const config = {
  title: "AgileTs",
  tagline: "AgileTs is a spacy, fast, simple State-Management Framework",
  url: customFields.domain,
  baseUrlIssueBanner: false,
  baseUrl: "/",
  onBrokenLinks: "throw",
  favicon: "img/favicon.ico",
  organizationName: "AgileTs",
  projectName: "agilets",
  themes: ["@docusaurus/theme-live-codeblock"],
  plugins: [
    "docusaurus-plugin-sass" /* @docusaurus/plugin-google-analytics (Not necessary because it automatically gets added) */,
  ],
  customFields: { ...customFields },
  themeConfig: {
    hideableSidebar: true,
    algolia: {
      apiKey: "6b7b98565bb82e16996fd185f378d618",
      indexName: "agile-ts",
    },
    colorMode: {
      defaultMode: "dark",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    announcementBar: {
      id: "github-star",
      content: customFields.announcementBarContent,
      backgroundColor: "#9c9abf",
    },
    prism: {
      theme: require("prism-react-renderer/themes/github"),
      darkTheme: require("prism-react-renderer/themes/dracula"),
    },
    algolia: {
      apiKey: "6b7b98565bb82e16996fd185f378d618",
      indexName: "agile-ts",
    },
    navbar: {
      title: " ",
      hideOnScroll: true,
      logo: {
        alt: "My Site Logo",
        src: "img/logo.svg",
      },
      items: [
        // left
        {
          label: "Get Started",
          position: "left",
          items: [
            {
              label: "Installation",
              to: "/docs/installation/",
            },
            {
              label: "React",
              to: "/docs/quick-start/react/",
            },
            {
              label: "Style Guide",
              to: "/docs/style-guide/",
            },
          ],
        },
        {
          label: "Community",
          position: "left",
          items: [
            {
              label: "GitHub",
              href: customFields.githubUrl,
            },
            {
              label: "Discord",
              href: customFields.discordUrl,
            },
            {
              label: "Stack Overflow",
              href: customFields.stackoverflowUrl,
            },
            {
              label: "Twitter",
              href: customFields.twitterUrl,
            },
          ],
        },
        {
          label: "Documentation",
          position: "left",
          to: "docs/introduction/",
        },
      ],
    },
    footer: {
      style: "dark",
      copyright: customFields.copyright,
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Get Started",
              to: "docs/introduction",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Stack Overflow",
              href: customFields.stackoverflowUrl,
            },
            {
              label: "Discord",
              href: customFields.discordUrl,
            },
            {
              label: "Twitter",
              href: customFields.twitterUrl,
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "/blog/",
            },
            {
              label: "GitHub",
              href: customFields.githubUrl,
            },
          ],
        },
      ],
    },
    googleAnalytics: {
      trackingID: "UA-189394644-1",
      anonymizeIP: true, // Should IPs be anonymized?
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          path: "docs",
          admonitions: {
            icons: "emoji",
          },
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: `${customFields.githubDocsUrl}/tree/develop`,
          showLastUpdateAuthor: false,
          showLastUpdateTime: true,
          remarkPlugins: [
            [require("@docusaurus/remark-plugin-npm2yarn"), { sync: true }],
          ],
        },
        blog: {
          showReadingTime: true,
          editUrl: `${customFields.githubDocsUrl}/tree/develop`,
        },
        theme: {
          customCss: [require.resolve("./src/css/custom.scss")],
        },
      },
    ],
  ],
};

module.exports = { ...config };
