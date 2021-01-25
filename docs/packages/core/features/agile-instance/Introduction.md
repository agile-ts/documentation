---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /core/agile-instance
---

The Agile Instance is created with `new Agile()`and should be unique to your application.
Multiple Agile Instances in one Application might cause trouble. 
```ts
const App = new Agile();
```
With an instantiated Agile Instance, we are able to create any Agile Sub Instances like
- [State](../state/Introduction.md)
  ```ts
   const MY_STATE = App.createState("Hello there");
   ```
- [Collection](../collection/Introduction.md)
   ```ts
   const MY_COLLECTION = App.createCollection();
   ```
- [Computed](../computed/Introduction.md)
   ```ts
   const MY_COMPUTED = App.createComputed(() => {});
   ```
- [Event](../event/Introduction.md)
   ```ts
   const MY_EVENT = App.createEvent();
   ```

These Sub Instances we create using the main Instance are automatically added to it.
Trough that the Agile Instance can also be seen as a Store, that offers many
possibilities to mutate the stored Instances.

## Configuration Options

`Agile` takes an optional configuration object as its only parameter.
```ts
const App = new Agile({
    logConfig: { 
        level: Logger.level.DEBUG, 
        active: true,
    },
});
```
Here is a Typescript Interface for quick reference, however 
each property will be explained in more detail below.
```ts
export interface CreateAgileConfigInterface {
  logConfig?: CreateLoggerConfigInterface;
  waitForMount?: boolean;
  localStorage?: boolean;
}
```

### `logConfig`

The logConfig is thought to configure the Logger of AgileTs.
For instance, we can configure if we want to log all messages or 
only warning.
```ts
export interface CreateLoggerConfigInterface {
    prefix?: string;
    allowedTags?: string[];
    canUseCustomStyles?: boolean;
    active?: boolean;
    level?: number;
    timestamp?: boolean;
}
```

| Prop                 | Type     | Default                                                      | Description                                                                                                    | Required |
|----------------------|----------|--------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|----------|
| `level`              | number   | 20 (Logger.level.WARN)                                       | On which 'level' the logger should log. For instance if it only should log Errors.                             | No       |
| `active`             | boolean  | true                                                         | If the Logger is active.                                                                                       | No       |
| `timestamp`          | boolean  | false                                                        | If a Timestamp gets applied for each Log Message.                                                              | No       |
| `allowedTags`        | string[] | ['runtime', 'storage', 'subscription', 'multieditor']        | Sometimes logs are marked with Tags. If this is the case, the log gets only logged if the Tag is included.     | No       |
| `canUseCustomStyles` | boolean  | true                                                         | If the Logger is allowed to apply css styles to the Logs. For instance Agile Logs are by default purple.       | No       |



### `localStorage`

Defines whether we want to use the Local Storage as default Storage or not.
If we use the Local Storage each Agile Sub Instance we persist, gets stored in the Local Storage by default.
We aren't limited to the Local Storage, we can configure our own [Storage](../storage/Introduction.md). 
This is necessary in a Mobile Environment, because there the Local Storage doesn't exist.
With `App.registerStorage` we can register our wished [Storage](../storage/Introduction.md).
````ts
localStorage: false // default true
````

### `waitForMount`

With `waitForMount` we define if AgileTs should wait
with causing rerender on an unmounted Component until it got mounted.
````ts
waitForMount: false // default true
````

## Where to instantiate?

You can instantiate the Agile Instance where ever you want. 
Directly in your Component, in an extra File or on Paper. 
It doesn't matter as long as you can work with it.
There are a few [Style Guides](../../../../main/StyleGuide.md) where you can get some inspiration
how to structure an Application using AgileTs.