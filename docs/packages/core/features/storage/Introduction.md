---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /core/storage
---

The `Storage Class` serves as an interface to an external Storage, like the
[Async Storage](https://github.com/react-native-async-storage/async-storage) or 
the [Local Storage](https://www.w3schools.com/html/html5_webstorage.asp).
We instantiate a Storage Interface with help of an instantiated [Agile Instance](../agile-instance/Introduction.md) often called `App`.
```ts
const myStorage = App.createStorage(/* storage config */);
```
After a successful creation of such Storage Interface, we can add it to Agile with help of the `registerStorage()` method.
```ts
App.createStorage(myStorage, {default: true});
```
The `default` flag means, that it will be used as default Storage.
So each State we persist without further configuration will be stored in `myStorage`.
```ts
MY_STATE.persist(); // Gets stored in 'myStorage' by default
MY_STATE.persist({storageKeys: ['myStorage2']}); // Gets stored in 'myStorage2'
```
By default, the [Local Storage](https://www.w3schools.com/html/html5_webstorage.asp) is the default Storage 
which is registered out of the box. So if you want to use the `Local Storage`, you don't have to do anything.

## 💾 Example

### [`Async Storage`](https://github.com/react-native-async-storage/async-storage)
In a `react native` environment you properly want to use the `Async Storage`.
```ts
App.registerStorage(
  App.createStorage({
    key: "AsyncStorage",
    async: true,
    methods: {
      get: AsyncStorage.getItem,
      set: AsyncStorage.setItem,
      remove: AsyncStorage.removeItem,
    },
  }), {default: true}
);
```

## 📭 Props

```ts
App.createStorage(config);
```

### `config`

A `Storage` takes an optional configuration object as its only parameter.
Here is a Typescript Interface of the configuration object for quick reference,
however each property will be explained in more detail below.
```ts
export interface CreateStorageConfigInterface extends StorageConfigInterface {
    key: string;
    methods: StorageMethodsInterface;
}

// or without extending

export interface CreateStorageConfigInterface {
    key: string;
    async?: boolean;
    prefix?: string;
    methods: {
        get: (key: string) => any;
        set: (key: string, value: any) => void;
        remove: (key: string) => void;
    }
}
```

<br/>

#### `key`
The property `key/name` should be a unique `string/number` to identify the Storage Class later.
```ts
const MY_COMPUTED = App.createStorage(() => {}, {
    key: "myKey"
    // ..
});
```

| Type               | Default     | Required |
|--------------------|-------------|----------|
| `string \| number` | undefined   | Yes      |



<br/>

