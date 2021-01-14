---
id: installation
title: Installation
sidebar_label: Installation
slug: /react/installation
---

The `react` Package can be installed over [npm](https://www.npmjs.com/).

```bash npm2yarn
npm install @agile-ts/react 
```

:::warning

Be aware that this is no standalone package!

:::

The React Integration is only an Extension of AgileTs and doesn't work without the [Core Package](../core/Introduction.md),
which functions as the brain of AgileTs and is indispensable.
Unfortunately we can't combine every `core` version with `react` version.
Therefore, you can find a table that shows which versions fit together below.

| @agile-ts/react | @agile-ts/core          | NPM Version              | Supported React versions | Supports hook based components    |
| --------------- | ----------------------- | ------------------------ | -------------------------|---------------------------------- |
| v0.0.7+         | v0.0.7+                 | v6+                      | 16.8+                    | Yes                               |
| v0.0.6          | v0.0.3 - v0.0.6         | v6+                      | 16.8+                    | Yes                               | 
_Other Versions aren't supported anymore_
