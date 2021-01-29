---
id: interfaces
title: Interfaces
sidebar_label: Interfaces
slug: /interfaces
---

:::info

Here are all documented Interfaces of AgileTs listed!

:::


### `StorageMethods`

```ts
export interface StorageMethodsInterface {
  get: (key: string) => any;
  set: (key: string, value: any) => void;
  remove: (key: string) => void;
}
```

| Prop     | Type                                   | Default   | Description                                            | Required |
|----------|----------------------------------------|-----------|--------------------------------------------------------|----------|
| `get`    | (key:  string) => any                  | undefined | Get Method of Storage (gets Items from Storage)        | Yes      |
| `set`    | (key:  string, value: any) => void     | undefined | Set Method of Storage (saves/updates Items in Storage) | Yes      |
| `remove` | (key:  string) => void                 | undefined | Remove Method of Storage (removes Items from Storage)  | Yes      |


<br/>

---

<br/>


### `StateConfig`

```ts
export interface StateConfigInterface {
    key?: StateKey;
    dependents?: Array<Observer>;
    isPlaceholder?: boolean;
}
```

| Prop            | Type             | Default   | Description                                                                                               | Required |
|-----------------|------------------|-----------|-----------------------------------------------------------------------------------------------------------|----------|
| `key`           | `string \| number` | undefined | Key/Name of State                                                                                         | No       |
| `dependents`    | Observer[]       | []        | Initial dependents of the State -> if State mutates, the dependents will be ingested into the Runtime too | No       |
| `isPlaceholder` | boolean          | false     | If State is a placeholder, to hold a reference (used internal)                                            | No       |


<br/>

---

<br/>


### `CollectionConfig`

```ts
export type CollectionConfig<DataType = DefaultItem> =
| CreateCollectionConfigInterface<DataType>
| ((
collection: Collection<DataType>
) => CreateCollectionConfigInterface<DataType>);
```
*[CreateCollectionConfigInterface](#createcollectionconfig)

**There are two ways configuring the Collection:**

1. The _Object_ way, where we can configure everything, but we are limited in the creation of Groups and Selectors,
   because here the Collection creates them for us, and for instance we can't pass initial Items to them.
   ```ts
     const Collection = App.createCollection({
     key: 'dummyCollection',
     group: ["dummyGroup"]
     })
   ```

2. The _Function_ way, where we can configure everything too, but here we are able to create the Groups and Selectors from scratch,
   and have more control over them.
   ```ts
     const Collection = App.createCollection((collection) => ({
     key: 'dummyCollection',
     group: {
        dummyGroup: collection.Group(["item1", "item2"])
      }
     }))
   ```


<br/>

---

<br/>


### `CreateCollectionConfig`

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
| Prop              | Type                                            | Default   | Description                                                                                            | Required |
|-------------------|-------------------------------------------------|-----------|--------------------------------------------------------------------------------------------------------|----------|
| `groups`          | { [ key : string]: Group<any\> } \| string[]    | []        | Initial Groups of Collection. Groups are used to represent multiple representations of the Collection. | No       |
| `selectors`       | { [ key : string]: Selector<any\> } \| string[] | []        | Initial Selectors of Collection. Selectors are used to select one specific Item of the Collection.     | No       |
| `key`             | string \| number                                | undefined | Key/Name of Collection                                                                                 | No       |
| `primaryKey`      | string                                          | 'id'      | Primary Key property of Item, used to identify Items in Collection.                                    | No       |
| `defaultGroupKey` | GroupKey                                        | 'default' | How the default Group, which represents the main representation of the Collection, is called.          | No       |
| `initialData`     | Array< DataType >                               | []        | Initial Data of Collection                                                                             | No       |

