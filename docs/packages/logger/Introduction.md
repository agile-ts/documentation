---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /logger
---

:::warning

WIP Documentation!

:::

> Simple Javascript Logger

 <br />

 <a href="https://github.com/agile-ts/agile">
  <img src="https://img.shields.io/github/license/agile-ts/agile.svg?label=license&style=flat&colorA=293140&colorB=4a4872" alt="GitHub License"/></a>
<a href="https://npm.im/@agile-ts/logger">
  <img src="https://img.shields.io/npm/v/@agile-ts/logger.svg?label=npm&style=flat&colorA=293140&colorB=4a4872" alt="npm version"/></a>
<a href="https://npm.im/@agile-ts/logger">
  <img src="https://img.shields.io/bundlephobia/min/@agile-ts/logger.svg?label=minified%20size&style=flat&colorA=293140&colorB=4a4872" alt="npm minified size"/></a>
<a href="https://npm.im/@agile-ts/logger">
  <img src="https://img.shields.io/npm/dt/@agile-ts/logger.svg?label=downloads&style=flat&colorA=293140&colorB=4a4872" alt="npm total downloads"/></a>

## ❓ `logger`

The `logger` package is a standalone extension for AgileTs that improves the logging experience,
by letting you precisely configure the logging behavior.
Without the `logger` package, AgileTs only logs `warn` and `error` logs.
These logs cannot be customized or turned off.
However, with the `logger` extension installed,
you can completely customize what messages should be logged,
how these messages should look like and much more.
All you need to do to configure the logging behavior of AgileTs,
is to call `assignSharedAgileLoggerConfig()` and specify your customized logger configuration.
```ts
import {assignSharedAgileLoggerConfig, Logger} from '@agile-ts/logger';

assignSharedAgileLoggerConfig({
  active: true,
  level: Logger.level.DEBUG,
  timestamp: true
})
```

## ✍️ Standalone

The AgileTs `Logger Class` can also be used without AgileTs.
```ts
const logger = new Logger();
```
Some of its capabilities are to:

- ### 🎭 categorize log messages
  Log messages in different upper categories
  to be able to roughly classify log messages.
  ```ts
  logger.log("I'm a log message!");
  logger.debug("I'm a debug message!");
  logger.info("I'm a info message!");
  logger.warn("I'm a warn message!");
  logger.error("I'm a error message!");
  logger.success("I'm a success message!");
  logger.trace("I'm a trace message!");
  logger.custom('jeff', "I'm a custom jeff message!");
  ```

- ### 🎲 filter log messages
  Filter log messages by tag or type
  in order to see only logs that matter right now.
  ```ts
  // Filter by 'type'
  logger.setLevel(Logger.level.WARN);
  logger.debug('Boring Debug Message.'); // Doesn't get logged
  logger.warn('Important Warning!'); // Does get log
  
  // Filter by 'tags'
  logger.if.tag(['runtime']).info(`Created Job '${job._key}'`, job);
  ```

- ### 🎨 style log messages `(color, font-weight)`
  Style log messages to make it easier to distinguish between different log types
  and recognise important log messages more quickly.
  ![Log Custom Styles Example](../../../static/img/docs/logger_example.png)

- ### 🔨 customize log messages `(prefix, timestamp)`
  Customize log messages to identify searched logs more swiftly.
  ```ts
  logger.debug('Hello there!'); // Logs: 'Agile: Hello there!'
  ```

- ### 🚫 disable all log messages
  ```ts
  logger.debug('Exciting Debug Message.'); // Logs: 'Boring Debug Message.'
  logger.isActive = false;
  logger.debug('Boring Debug Message.'); // Doesn't get logged
  logger.warn('Important Warning!'); // Doesn't get logged
  ```

## 🚀 Quick Links
- [Installation](./Installation.md)
