---
id: methods
title: Methods
sidebar_label: Methods
slug: /core/agile-instance/methods
---

## `createStorage`

With `createStorage` we create a new Storage.
To register your newly created Storage to the Agile Instance use the [register](#integrate) function.
```ts
const Storage = App.createStorage({
    key: 'dummyStorage',
    methods: {
        get: (key: string) => {},
        set: (key: string, value: any) => {},
        remove: (key: string) => {}
    }
})
```
It takes an Object where we define the `get`, `set`, `remove` methods, 
with which our Storage gets mutated. In addition, we need a unique `key` to
identify the Storage later.

### 📭 Props
| Prop      | Type                    | Default   | Description                                       | Required |
|-----------|-------------------------|-----------|---------------------------------------------------|----------|
| key       | string                  | undefined | Key of the Description                            | Yes      |
| methods   | StorageMethodsInterface | {}        | Methods with which the Storage get mutated        | Yes      |

#### StorageMethodsInterface
| Prop   | Type                                   | Default   | Description                                            | Required |
|--------|----------------------------------------|-----------|--------------------------------------------------------|----------|
| get    | (key:  string) => any                  | undefined | Get Method of Storage (gets Items from Storage)        | Yes      |
| set    | (key:  string, value: any) => void     | undefined | Set Method of Storage (saves/updates Items in Storage) | Yes      |
| remove | (key:  string) => void                 | undefined | Remove Method of Storage (removes Items from Storage)  | Yes      |
```ts
export interface StorageMethodsInterface {
  get: (key: string) => any;
  set: (key: string, value: any) => void;
  remove: (key: string) => void;
}
```

### 📄 Return
Returns a fresh [Storage](../storage/Introduction.md).

<br />

---

<br />

## `createState`

With `createState` we create a new [State](../state/Introduction.md),
which is automatically bound to the [Agile Instance](../agile-instance/Introduction.md) it was created from.
```ts
const State = App.createState('jeff', {
    key: 'dummyState',
})
```
It takes the `initialValue` and an Object to configure the State to our needs.
For instance defining a Key, for better debugging or persisting.

### 📭 Props
| Prop         | Type                     | Default   | Description                                           | Required |
|--------------|--------------------------|-----------|-------------------------------------------------------|----------|
| initialValue | ValueType = any          | undefined | Initial Value of State                                | Yes      |
| config       | StateConfigInterface     | {}        | Configuration                                         | No       |

#### StateConfigInterface
```ts
export interface StateConfigInterface {
    key?: StateKey;
    deps?: Array<Observer>;
    isPlaceholder?: boolean;
}
```
// TODO

### 📄 Return
Returns a fresh [State](../state/Introduction.md).

<br />

---

<br />

## `createCollection`

With `createCollection` we create a new [Collection](../collection/Introduction.md),
which is automatically bound to the [Agile Instance](../agile-instance/Introduction.md) it was created from.
```ts
const Collection = App.createCollection({
    key: 'dummyCollection',
})
```
It takes an Object to configure the Collection to our needs.
For instance adding Groups to order the Collection Items, Selectors to select one specific Item 
or defining a Key for better debugging and persisting.

### 📭 Props

### 📄 Return
Returns a fresh [Collection](../collection/Introduction.md).

<br />

---

<br />

## `createComputed`

With `createComputed` we create a new [Computed](../computed/Introduction.md),
which is automatically bound to the [Agile Instance](../agile-instance/Introduction.md) it was created from.
```ts
const Computed = App.createComputed(() => {/* Computed Method */}, {
    key: 'dummyComputed',
})
```
It takes a `computed Method`, which gets used to compute the Value of the Computed, 
and an Object to configure the Computed to our needs. For instance defining a Key
for better debugging and persisting.

### 📭 Props

### 📄 Return
Returns a fresh [Computed](../computed/Introduction.md).

<br />

---

<br />

## `createEvent`

With `createEvent` we create a new [Event](../event/Introduction.md),
which is automatically bound to the [Agile Instance](../agile-instance/Introduction.md) it was created from.
```ts
const Event = App.createEvent({
    key: 'dummyEvent',
})
```

### 📭 Props

### 📄 Return
Returns a fresh [Event](../event/Introduction.md).

<br />

---

<br />

## `integrate`

## `registerStorage`

## `hasIntegration`

## `hasStorage`