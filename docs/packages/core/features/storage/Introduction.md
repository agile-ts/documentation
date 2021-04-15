---
id: introduction
title: Storage
sidebar_label: Introduction
slug: /core/storage
---

The `Storage Class` serves as an interface to external Storages, like the
[Async Storage](https://github.com/react-native-async-storage/async-storage) or 
[Local Storage](https://www.w3schools.com/html/html5_webstorage.asp).
We instantiate a Storage Interface with help of an instantiated [Agile Instance](../agile-instance/Introduction.md) often called `App`.
```ts
const myStorage = App.createStorage(/* storage config */);
```
After a successful creation of such Storage Interface, we register it at Agile with help of the `registerStorage()` method.
```ts
App.createStorage(myStorage, {default: true});
```
The `default` flag means, that it will be used as default Storage.
So each State we persist will be stored in `myStorage` without further configuration.
```ts
MY_STATE.persist(); // Gets stored in 'myStorage' by default
MY_STATE.persist({storageKeys: ['myStorage2']}); // Gets stored in 'myStorage2'
```
By default, the [Local Storage](https://www.w3schools.com/html/html5_webstorage.asp) is the default Storage,
which is registered out of the box. If you want to use the `Local Storage`, you don't have to configure anything.


## 💾 Example

### [`Async Storage`](https://github.com/react-native-async-storage/async-storage)
In a `react native` environment we properly want to use the `Async Storage`.
Here is how it gets registered at AgileTs.
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

A `Storage` takes a required configuration object as its only parameter.
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
App.createStorage({
    key: "myStorage"
    // ..
});
```
This is especially important if we have several Storages in action 
and want to decide which value is stored in which storage.
```ts
MY_STATE.persist({storageKeys: ['myStorage']});
```

| Type               | Default     | Required |
|--------------------|-------------|----------|
| `string \| number` | undefined   | Yes      |

<br/>

#### `async`

Defines whether the Storage Interface has to deal with an async storage 
and should handle it accordingly.
```ts
App.createStorage({
    key: "asyncStorage",
    async: true
});
```
If we register an async Storage Interface and don't set the async flag,
it doesn't automatically resolve the value and simply returns the promise of the storage.

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `(key: string) => any`   | undefined | Yes      |

<br/>

#### `prefix`

The prefix will be added before each `Storage Key`.
```ts
MY_STATE.persist('myState');
// Storage Key: '_prefix_myState'
MY_COLLECTION.persist('myCollection');
// Storage Keys: 
// Default Group: '_prefix__myCollection_group_default'
// Item with id '1': '_prefix__myCollection_item_1'
// Item with id '2': '_prefix__myCollection_item_2'
```
A `Storage Key` identifies the stored value in the storage.

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `string`                 | 'agile'   | No       |

<br/>

#### `get`

Method to get a specific value at `primaryKey` from the external Storage.
```ts
myStorage.get("item1"); // Calls the here defined get method
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `(key: string) => any`   | undefined | Yes      |

<br/>

#### `set`

Method to set a specific value at `primaryKey` into the external Storage.
```ts
myStorage.set("item1", {my: "value"}); // Calls the here defined set method
```

| Type                                  | Default   | Required |
|---------------------------------------|-----------|----------|
| `(key: string, value: any) => void`   | undefined | Yes      |

<br/>

#### `remove`

Method to remove a specific value at `primaryKey` from the external Storage.
```ts
myStorage.remove("item1"); // Calls the here defined remove method
```

| Type                       | Default   | Required |
|----------------------------|-----------|----------|
| `(key: string) => void`    | undefined | Yes      |

