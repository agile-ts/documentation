---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /core/agile-instance
---

The Agile Instance is created with `new Agile()`, it should be unique to your application,
because multiple Agile Instances might cause trouble. With it you are able to create
States, Computed, Collections and much more.
```ts
const App = new Agile();
```

## Configuration Options

Of course there are some configuration options, so that the Agile Instance fits your needs.
```ts
const App = new Agile({
    logConfig: { 
        level: Logger.level.DEBUG, 
        active: true,
        timestamp: true,
        allowedTags: ['runtime'],
    },
    localStorage: false, 
    waitForMount: true 
});
```
Functionalities of each property will be described below.

### `logConfig`

Here we can configure the log behavior of AgileTs.
For instance if only warning should get logged, ..
```ts
{ 
   level: Logger.level.DEBUG, 
   active: true, 
   timestamp: true, 
   allowedTags: ['runtime'], 
   canUseCustomStyles: false 
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
So every Agile Sub Instance we persist gets stored in the Local Storage by default.
We properly want to disable the Local Storage in a Mobile environment.
If you want to find out how to add another Storage, like the Async Storage to AgileTs,
checkout the Storage docs.
````ts
localStorage: false // default true
````


### `waitForMount`

This property determines if AgileTs should wait with causing rerender on a Component until it got mounted.
````ts
waitForMount: false // default true
````
