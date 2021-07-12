---
id: properties
title: Properties
sidebar_label: Properties
slug: /core/agile-instance/properties
---

:::info

Here are valuable properties of the `Agile Class` listed.

:::

## `key`

The current `key/name` of the Collection,
which is used for a unique identification.
```ts {2}
const App = new Agile({key: 'jeffKey'});
App.key; // Returns 'jeffKey'
```

### 📄 Return

```ts
string | number
```



<br />

---

<br />



## `logger`

:::warning

The `logger` property has been deprecated in the latest version `^0.1.1`
and is no longer available!

Now, `warnings` and `errors` are logged in general.
However, to configure the logging behavior of AgileTs more precisely
an external package [`@agile-ts/logger`](../../../logger/Introduction.md) is required.

```ts
import {Logger, assignSharedAgileLoggerConfig} from '@agile-ts/logger';

assignSharedAgileLoggerConfig({
    logConfig: {
        level: Logger.level.DEBUG,
        active: true,
        timestamp: true
    } 
});
```

:::

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
