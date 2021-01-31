---
id: properties
title: Properties
sidebar_label: Properties
slug: /core/agile-instance/properties
---

:::info

Here useful properties of the `Agile Instance` are described.

:::

## `logger`

The logger gets used to Log warnings, errors, .. in AgileTs, but of course we can
use it in our Application too.
```ts
Agile.logger.warn("This is a Warning");
Agile.logger.log("This is a normal Log");
Agile.logger.if.tag(["render"]).warn("Logs this Warning if the Logger has the Tag 'rerender' active");
```

