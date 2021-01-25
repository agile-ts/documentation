---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /core/agile-instance
---

The Agile Instance is created with `new Agile()`, it should be unique to your application,
because multiple Agile Instances might cause trouble. 
```ts
const App = new Agile();
```
With it, you are able to create Agile Sub Instances like
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
  
It manages and stores such Sub Instances.

## Configuration Options

`Agile` takes an optional configuration object as its only parameter,
so that we are able to configure it to our needs.
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
| `level`              | number   | Logger.level.WARN                                            | On which 'level' the logger should log. For instance if it only should log Errors.                             | No       |
| `active`             | boolean  | true                                                         | If the Logger is active.                                                                                       | No       |
| `timestamp`          | boolean  | false                                                        | If a Timestamp gets applied for each Log Message.                                                              | No       |
| `allowedTags`        | string[] | ['runtime', 'storage', 'subscription', 'multieditor']        | Sometimes logs are marked with Tags. If this is the case this messages get only logged if the Tag is included. | No       |
| `canUseCustomStyles` | boolean  | true                                                         | If the Logger is allowed to apply css styles to the Logs. For instance Agile Logs are by default purple.       | No       |



### `localStorage`

If we want to use the Local Storage as default Storage.
Each Agile Sub Instance we persist gets then stored in the Local Storage by default.
We properly want to disable the Local Storage in a Mobile environment, because
there the Local Storage doesn't exist. But you can add another [Storage](../storage/Introduction.md) like the Async Storage
to AgileTs.
````ts
localStorage: false // default true
````

### `waitForMount`

This property determines if AgileTs should wait with causing rerender on a Component until the Component got mounted.
````ts
waitForMount: false // default true
````

## Where to instantiate?

You can instantiate the Agile Instance where ever you want. 
Directly in your Component, in an extra File or on Paper. 
It doesn't matter as long you can work with it.
There a some [style guides](../../../../main/StyleGuide.md), where you can get some inspiration
how to struct an Application using AgileTs.
