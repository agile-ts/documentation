---
id: properties
title: Properties
sidebar_label: Properties
slug: /core/agile-instance/properties
---

:::info

Here are valuable properties of the `Agile Instance` listed.

:::

## `logger`

The `logger` is a static property of the `Agile Class`, 
which is internally used to Log warnings, errors, messages, .. into the console.
```ts
Agile.logger.warn("This is a Warning");
Agile.logger.log("This is a normal Log");
Agile.logger.if.tag(["render"]).warn("Logs this Warning if the Logger has the Tag 'rerender' active");
```
![Log Custom Styles Example](../../../../../static/img/docs/logger_example.png)
It can be configured during the creation of the `Agile Class`.
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

