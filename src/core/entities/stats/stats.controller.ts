import { App } from '../../app';

export const NPM_DOWNLOADS = App.createState(0).persist('npm-downloads');
export const GITHUB_STARS = App.createState(0).persist('github-stars');
export const GITHUB_FORKS = App.createState(0).persist('github-forks');
