module.exports = {
    docs: [
        {
            type: 'category',
            label: "AgileTs",
            collapsed: false,
            items: ["main/introduction", "main/style-guide", "main/contributing", "doc1"]
        },
        {
            type: 'category',
            label: 'Getting Started',
            collapsed: false,
            items: ["getting_started/installation"],
        },
        {
            type: 'category',
            label: "Packages",
            items: [
                {
                    type: 'category',
                    label: 'core',
                    items: ["packages/core/introduction"]
                },
                {
                    type: 'category',
                    label: 'api',
                    items: ["packages/api/introduction"]
                },
                {
                    type: 'category',
                    label: 'multieditor',
                    items: ["packages/multieditor/introduction"]
                },
                {
                    type: 'category',
                    label: 'react',
                    items: ["packages/react/introduction"]
                }
            ]
        }
    ]
};
