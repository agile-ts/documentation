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

<br/>

`StorageMethodsInterface`

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

<br/>

`StateConfigInterface`

| Prop          | Type             | Default   | Description                                                                                               | Required |
|---------------|------------------|-----------|-----------------------------------------------------------------------------------------------------------|----------|
| key           | string \| number | undefined | Key/Name of State                                                                                         | No       |
| dependents    | Observer[]       | []        | Initial dependents of the State -> if State mutates, the dependents will be ingested into the Runtime too | No       |
| isPlaceholder | boolean          | false     | If State is a placeholder, to hold a reference (used internal)                                            | No       |
```ts
export interface StateConfigInterface {
    key?: StateKey;
    dependents?: Array<Observer>;
    isPlaceholder?: boolean;
}
```


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
There are two ways of defining the Config:

1. In the Object way, where we can configure everything, but we are limited in the creation of Groups and Selectors, 
   because here the Collection creates them for us, and for instance we can't pass initial Items to them.
   ```ts
     const Collection = App.createCollection({
     key: 'dummyCollection',
     group: ["dummyGroup"]
     })
   ```

2. In the Function way, where we can configure everything too, but here we are able to create the Groups and Selectors from scratch,
   and have more control over them.
   ```ts
     const Collection = App.createCollection((collection) => ({
     key: 'dummyCollection',
     group: {
        dummyGroup: collection.Group(["item1", "item2"])
      }
     }))
   ```


### 📭 Props

| Prop         | Type                     | Default   | Description                                           | Required |
|--------------|--------------------------|-----------|-------------------------------------------------------|----------|
| config       | CollectionConfig         | {}        | Configuration                                         | No       |

<br/>

`CollectionConfig`

```ts
export type CollectionConfig<DataType = DefaultItem> =
| CreateCollectionConfigInterface<DataType>
| ((
collection: Collection<DataType>
) => CreateCollectionConfigInterface<DataType>);
```

<br/>

`CreateCollectionConfig`

| Prop            | Type                                           | Default   | Description                                                                                            | Required |
|-----------------|------------------------------------------------|-----------|--------------------------------------------------------------------------------------------------------|----------|
| groups          | { [ key : string]: Group<any\> } \| string[]    | []        | Initial Groups of Collection. Groups are used to represent multiple representations of the Collection. | No       |
| selectors       | { [ key : string]: Selector<any\> } \| string[] | []        | Initial Selectors of Collection. Selectors are used to select one specific Item of the Collection.     | No       |
| key             | string \| number                               | undefined | Key/Name of Collection                                                                                 | No       |
| primaryKey      | string                                         | 'id'      | Primary Key property of Item, used to identify Items in Collection.                                    | No       |
| defaultGroupKey | GroupKey                                       | 'default' | How the default Group, which represents the main representation of the Collection, is called.          | No       |
| initialData     | Array< DataType >                              | []        | Initial Data of Collection                                                                             | No       |

```ts
export interface CreateCollectionConfigInterface<DataType = DefaultItem> {
  groups?: { [key: string]: Group<any> } | string[];
  selectors?: { [key: string]: Selector<any> } | string[];
  key?: CollectionKey;
  primaryKey?: string;
  defaultGroupKey?: GroupKey;
  initialData?: Array<DataType>;
}
```


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

#### Header 1

| Prop            | Type                                        | Default   | Description                                        | Required |
|-----------------|---------------------------------------------|-----------|----------------------------------------------------|----------|
| computeFunction | () =>  ComputedValueType                    | undefined | Function that recomputes the value of the Computed | Yes      |
| config          | StateConfigInterface                        | {}        | Config                                             | No       |
| deps            | Array<Observer \| State \| Event \| Group\> | []        | Dependencies of Computed                           | No       |

<br/>

#### Header 2

| Prop            | Type                                       | Default   | Description                                        | Required |
|-----------------|--------------------------------------------|-----------|----------------------------------------------------|----------|
| computeFunction | () =>  ComputedValueType                   | undefined | Function that recomputes the value of the Computed | Yes      |
| deps            | Array<Observer \| State \| Event \| Group\> | []        | Dependencies of Computed                           | No       |

<br/>

`StateConfigInterface`

| Prop          | Type             | Default   | Description                                                                                                     | Required |
|---------------|------------------|-----------|-----------------------------------------------------------------------------------------------------------------|----------|
| key           | string \| number | undefined | Key/Name of Computed                                                                                            | No       |
| dependents    | Array<Observer\> | []        | Initial dependents of the Computed -> if Computed mutates, the dependents will be ingested into the Runtime too | No       |
| isPlaceholder | boolean          | false     | If Computed is a placeholder, to hold a reference (used internal)                                               | No       |

```ts
export interface StateConfigInterface {
  key?: StateKey;
  dependents?: Array<Observer>;
  isPlaceholder?: boolean;
}
```


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