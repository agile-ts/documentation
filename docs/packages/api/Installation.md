---
id: installation
title: Installation
sidebar_label: Installation
slug: /api/installation
---

The `api` package can be installed over [npm](https://www.npmjs.com/).

:::warning

Be aware that this is no standalone package!

:::

```bash npm2yarn
npm install @agile-ts/api 
```

The `api` package is an extension of AgileTs and doesn't work without the [`core`](../core/Introduction.md) package,
which functions as the brain of AgileTs and is indispensable.
Unfortunately, we can't combine each `core` with `api` version.
Therefore, we have created a table which shows which versions fit together without restrictions.

| @agile-ts/api         | @agile-ts/core          | NPM Version              |
| ----------------------| ----------------------- | ------------------------ |
| v0.0.7+               | v0.0.7+                 | v6+                      |
| v0.0.6                | v0.0.3 - v0.0.6         | v6+                      |
_Other Versions aren't supported anymore_
