---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /core/storage
---

:::warning

WIP docs!

:::

The `Storage Class` is a handy interface to an external Storage, like the 
[Async Storage](https://github.com/react-native-async-storage/async-storage) or 
the [Local Storage](https://www.w3schools.com/html/html5_webstorage.asp).
We instantiate a Storage with help of an [Agile Instance](../agile-instance/Introduction.md) here called `App`.
```ts
const myStorage = App.createStorage(/* storage config */);
```
We can also use the plain `Storage Class`.
```ts
const myStorage = new Storage(/* storage config */);
```
Both instantiations lead to the same result.
