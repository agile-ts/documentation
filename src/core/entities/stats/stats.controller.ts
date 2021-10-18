import { createState } from '@agile-ts/core';

export const NPM_DOWNLOADS = createState(0).persist({ key: 'npm-downloads' });
export const GITHUB_STARS = createState(0).persist({ key: 'github-stars' });
export const GITHUB_FORKS = createState(0).persist({ key: 'github-forks' });
