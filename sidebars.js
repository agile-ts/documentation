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
                    items: [
                        "packages/core/introduction",
                        "packages/core/installation",
                        {
                            type: 'category',
                            label: 'Features',
                            items: [
                                {
                                    type: 'category',
                                    label: 'AgileInstance',
                                    items: ["packages/core/features/agile-instance/introduction", "packages/core/features/agile-instance/methods"]
                                },
                                {
                                    type: 'category',
                                    label: 'State',
                                    items: ["packages/core/features/state/introduction", "packages/core/features/state/methods"]
                                },
                                {
                                    type: 'category',
                                    label: 'Collection',
                                    items: [
                                        "packages/core/features/collection/introduction",
                                        "packages/core/features/collection/methods",
                                        {
                                            type: 'category',
                                            label: 'Group',
                                            items: ["packages/core/features/collection/group/introduction", "packages/core/features/collection/group/methods"]
                                        },
                                        {
                                            type: 'category',
                                            label: 'Selector',
                                            items: ["packages/core/features/collection/selector/introduction", "packages/core/features/collection/selector/methods"]
                                        },
                                    ]
                                },
                                {
                                    type: 'category',
                                    label: 'Computed',
                                    items: ["packages/core/features/computed/introduction", "packages/core/features/computed/methods"]
                                },
                                {
                                    type: 'category',
                                    label: 'Event',
                                    items: ["packages/core/features/event/introduction", "packages/core/features/event/methods"]
                                },
                                {
                                    type: 'category',
                                    label: 'Storage',
                                    items: ["packages/core/features/storage/introduction", "packages/core/features/storage/methods"]
                                },
                                {
                                    type: 'category',
                                    label: 'Integration',
                                    items: ["packages/core/features/integration/introduction", "packages/core/features/integration/methods"]
                                }
                            ]
                        }
                    ]
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
                        {
                            type: "category",
                            label: "Features",
                            items: ["packages/react/features/hooks",
                                "packages/react/features/agileHOC"]
                        }
                    ]
                }
            ]
        },
        {
            type: 'category',
            label: "Examples",
            items: [
                "examples/introduction",
                {
                    type: 'category',
                    label: 'react',
                    items: ["examples/react/all"]
                },
                {
                    type: 'category',
                    label: 'react-native',
                    items: ["examples/react-native/all"]
                }
            ]
        }
    ]
};
