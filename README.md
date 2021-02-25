# agile-ts.org

[This website](https://agile-ts.org) is built using
[Docusaurus 2](https://v2.docusaurus.io/). Pages & components are written in TypeScript, the styles in vanilla CSS with
variables using
[CSS Modules](https://github.com/css-modules/css-modules).
(We would have preferred using [styled-components](https://styled-components.com/) but docusaurus has no ssr support for
it yet)

<div align="center">
  <a href="http://questdb.io">
    <img src=".github/img/landing.png"/>
  </a>
</div>
<div align="center">
  <a href="https://agile-ts.org" style="color: #1e2136">
    agile-ts.org
  </a>
</div>

## Installation

```console
yarn install
```

## Local Development

```console
yarn start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

## Build

```console
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

```console
GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
