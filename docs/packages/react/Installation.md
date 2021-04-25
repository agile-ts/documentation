---
id: installation
title: Installation
sidebar_label: Installation
slug: /react/installation
---

The `react` package can be installed over [npm](https://www.npmjs.com/).

:::warning

Be aware that this is no standalone package!

:::

```bash npm2yarn
npm install @agile-ts/react 
```

The `react` package is an extension of AgileTs and doesn't work without the [`core`](../core/Introduction.md) package,
which functions as the brain of AgileTs and is indispensable.
Unfortunately, we can't combine each `core` with `react` version.
Therefore, we have created a table that shows which versions fit together without restrictions.

| @agile-ts/react | @agile-ts/core          | NPM Version              | Supported React versions | Supports hook based components    |
| --------------- | ----------------------- | ------------------------ | -------------------------|---------------------------------- |
| v0.0.7+         | v0.0.7+                 | v6+                      | 16.8+                    | Yes                               |
| v0.0.6          | v0.0.3 - v0.0.6         | v6+                      | 16.8+                    | Yes                               | 
_Older Versions aren't supported anymore_