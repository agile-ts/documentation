---
id: installation
title: Installation
sidebar_label: Installation
slug: /event/installation
---

The `event` package can be installed over [npm](https://www.npmjs.com/).

:::warning

Be aware that this is no standalone package!

:::

```bash npm2yarn
npm install @agile-ts/event 
```

The `event` package is an extension of AgileTs for React, which doesn't work without the [`core`](../core/Introduction.md)
and [`react`](../react/Introduction.md) package.
Unfortunately, we can't combine each `core`, `react` with `event` version.
Therefore, we have created a table which shows which versions fit together without restrictions.

| @agile-ts/event       | @agile-ts/core          | @agile-ts/event          | NPM Version              | Supported React versions |
| ----------------------| ----------------------- | ------------------------ | ------------------------ | -------------------------|
| v0.0.1+               | v0.0.10+                | v0.0.10+                 | v6+                      | 16.8+                    |
_Other Versions aren't supported anymore_
