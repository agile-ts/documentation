module.exports = {
    docs: [
        {
            type: 'category',
            label: "AgileTs",
            collapsed: false,
            items: ["main/introduction", "main/installation", "main/style-guide", "main/contributing"]
        },
        {
            type: 'category',
            label: 'Quick Start',
            collapsed: false,
            items: ["quick_start/react"],
        },
        {
            type: 'category',
            label: "Packages",
            items: [
                {
                    type: 'category',
                    label: 'core',
                    items: ["packages/core/introduction", "packages/core/installation"]
                },
                {
                    type: 'category',
                    label: 'api',
                    items: ["packages/api/introduction", "packages/api/installation"]
                },
                {
                    type: 'category',
                    label: 'multieditor',
                    items: ["packages/multieditor/introduction", "packages/multieditor/installation"]
                },
                {
                    type: 'category',
                    label: 'react',
                    items: [
                        "packages/react/introduction",
                        "packages/react/installation",
                        "packages/react/hooks",
                        "packages/react/agileHOC"
                    ]
                }
            ]
        }
    ]
};
