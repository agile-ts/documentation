module.exports = {
    docs: [
        "doc1",
        {
            type: 'category',
            label: "AgileTs",
            items: ["main/introduction", "main/style-guide", "main/contributing"]
        },
        {
            type: 'category',
            label: 'Getting Started',
            collapsed: false,
            items: ["doc1"],
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
