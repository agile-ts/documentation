---
id: properties
title: Properties
sidebar_label: Properties
slug: /core/agile-instance/properties
---

:::info

Here are valuable properties of the `Agile Class` listed.

:::

## `logger`

The `logger` is a static property of the `Agile Class`.
It is used internally to log warnings, errors, debug messages, .. to the console.
```ts
Agile.logger.warn("This is a Warning");
Agile.logger.log("This is a normal Log");
Agile.logger.if.tag(["render"]).warn("Logs this Warning if the Logger has the Tag 'rerender' active");
```
![Log Custom Styles Example](../../../../../static/img/docs/logger_example.png)
It can be configured during the creation of an Agile Instance.
```ts
const App = new Agile({
    logConfig: {
        level: Logger.level.WARN,
        active: true,
        timestamp: true
    }
})
```

### 📄 Return

```ts
Logger
```