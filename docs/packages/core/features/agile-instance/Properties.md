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

The `logger` is a static property of the `Agile Class`.
It is an Instance of a handy Class that gets used to Log something in the console, like warnings, errors.
Feel free to use the Agile Logger in your Application for logging too,
it is pretty handy.
```ts
Agile.logger.warn("This is a Warning");
Agile.logger.log("This is a normal Log");
Agile.logger.if.tag(["render"]).warn("Logs this Warning if the Logger has the Tag 'rerender' active");
```

