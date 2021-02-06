const githubOrgUrl = "https://github.com/agile-ts";
const domain = "https://agile-ts.org"

const customFields = {
    copyright: `Copyright © ${new Date().getFullYear()} BennoDev`,
    description:
        "QuestDB is an open source database designed to make time-series lightning fast and easy. It exposes a high performance REST API and is Postgres compatible.",
    domain,
    githubOrgUrl,
    githubUrl: `${githubOrgUrl}/agile`,
    githubDocsUrl: `${githubOrgUrl}/documentation`,
    discordUrl: `https://discord.gg/9Edsb3z`,
    stackoverflowUrl: "https://stackoverflow.com/questions/tagged/agile-ts",
    twitterUrl: "https://twitter.com/agile-architecure",
    version: "0.0.1",
    announcementBarContent: '⭐️ If you like AgileTs, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/agile-ts/agile">GitHub</a>! ⭐️'
}

const config = {
    title: 'AgileTs',
    tagline: 'Global State and Logic Framework for reactive Applications',
    url: customFields.domain,
    baseUrlIssueBanner: false,
    baseUrl: '/',
    onBrokenLinks: 'throw',
    favicon: 'img/favicon.ico',
    organizationName: 'AgileTs',
    projectName: 'agilets',
    themes: ['@docusaurus/theme-live-codeblock'],
    plugins: ['docusaurus-plugin-sass' /* @docusaurus/plugin-google-analytics (Not necessary because it automatically gets added) */],
    customFields: {...customFields},
    themeConfig: {
        hideableSidebar: true,
        colorMode: {
            defaultMode: 'dark',
            disableSwitch: false,
            respectPrefersColorScheme: true,
        },
        announcementBar: {
            id: 'github-star',
            content: customFields.announcementBarContent,
            backgroundColor: "#9c9abf"
        },
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
                {
                    label: "Get Started",
                    position: "left",
                    items: [
                        {
                            label: "Introduction",
                            to: "/docs/",
                        },
                        {
                            label: "Installation",
                            to: "/docs/installation/",
                        },
                        {
                            label: "React",
                            to: "/docs/quick-start/react/",
                        },
                    ],
                },
                {
                    label: "Community",
                    position: "left",
                    items: [
                        {
                            label: "GitHub",
                            to: customFields.githubUrl,
                        },
                        {
                            label: "Discord",
                            to: customFields.discordUrl,
                        },
                        {
                            label: "Stack Overflow",
                            to: customFields.stackoverflowUrl,
                        },
                        {
                            label: "Twitter",
                            to: customFields.twitterUrl,
                        },
                    ],
                },
                {
                    label: 'Documentation',
                    position: 'left',
                    to: 'docs/',
                },
                // {to: 'blog', label: 'Blog', position: 'left'},
                /*
                // right
                {
                    href: 'https://github.com/agile-ts/agile',
                    position: 'right',
                    className: 'header-github-link header-icon-link',
                    'aria-label': 'GitHub repository',
                },
                {
                    href: 'https://discord.gg/FTqeMNCxw7',
                    position: 'right',
                    className: 'header-discord-link header-icon-link',
                    'aria-label': 'Discord',
                },
                 */
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
                        }
                    ],
                },
                {
                    title: "Community",
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
                            to: customFields.stackoverflowUrl,
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
                            label: "Documentation",
                            to: "/docs/",
                        },
                        {
                            label: "Blog",
                            to: "/blog/",
                        }
                    ],
                },
            ]
        },
        googleAnalytics: {
            trackingID: 'G-QH7WTHYFN9',
            anonymizeIP: true, // Should IPs be anonymized?
        },
    },
    presets: [
        [
            '@docusaurus/preset-classic',
            {
                docs: {
                    path: 'docs',
                    admonitions: {
                        icons: "emoji"
                    },
                    sidebarPath: require.resolve('./sidebars.js'),
                    editUrl: `${customFields.githubDocsUrl}/tree/develop`,
                    showLastUpdateAuthor: false,
                    showLastUpdateTime: true,
                    remarkPlugins: [
                        [require('@docusaurus/remark-plugin-npm2yarn'), {sync: true}],
                    ],
                },
                blog: {
                    showReadingTime: true,
                    editUrl: `${customFields.githubDocsUrl}/tree/develop`,
                },
                theme: {
                    customCss: [require.resolve('./src/css/custom.scss')],
                },
            },
        ],
    ],
};

module.exports = {...config}
