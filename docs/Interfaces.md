---
id: interfaces
title: Interfaces
sidebar_label: Interfaces
slug: /interfaces
---

:::info

Here all Interfaces required for working with AgileTs are listed!

:::


## `CreateLoggerConfig` 

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


<br/>

---

<br/>


## `StorageMethods`

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


## `StateConfig`

```ts
export interface StateConfigInterface {
    key?: StateKey;
    dependents?: Array<Observer>;
    isPlaceholder?: boolean;
}
```

| Prop            | Type               | Default   | Description                                                                                               | Required |
|-----------------|--------------------|-----------|-----------------------------------------------------------------------------------------------------------|----------|
| `key`           | `string \| number` | undefined | Key/Name of State                                                                                         | No       |
| `dependents`    | Observer[]         | []        | Initial dependents of the State -> if State mutates, the dependents will be ingested into the Runtime too | No       |
| `isPlaceholder` | boolean            | false     | If State is a placeholder, to hold a reference (used internal)                                            | No       |


<br/>

---

<br/>


## `CollectionConfig`

```ts
export type CollectionConfig<DataType = DefaultItem> =
| CreateCollectionConfigInterface<DataType>
| ((
collection: Collection<DataType>
) => CreateCollectionConfigInterface<DataType>);
```
* [CreateCollectionConfigInterface](#createcollectionconfig)

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


## `CreateCollectionConfig`

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


<br/>

---

<br/>


## `CreateEventConfig`

```ts
export interface CreateEventConfigInterface {
  key?: EventKey;
  enabled?: boolean;
  maxUses?: number;
  delay?: number;
  overlap?: boolean;
  rerender?: boolean;
  dependents?: Array<Observer>;
}
```

| Prop         | Type             | Default   | Description                                                                                               | Required |
|--------------|------------------|-----------|-----------------------------------------------------------------------------------------------------------|----------|
| `key`        | string \| number | undefined | Key/Name of Event                                                                                         | No       |
| `enabled`    | boolean          | true      | If Event is enabled and can be triggered                                                                  | No       |
| `maxUses`    | number           | undefined | How often the Event can be triggered, by default infinite                                                 | No       |
| `delay`      | number (in ms)   | undefined | If the Event should have an trigger delay                                                                 | No       |
| `overlap`    | boolean          | false     | If a triggered Event can overlap another triggered Event from same Event Class                            | No       |
| `rerender`   | boolean          | false     | If a Event trigger can rerender a Component (useEvent)                                                    | No       |
| `dependents` | Observer[]       | []        | Initial dependents of the State -> if State mutates, the dependents will be ingested into the Runtime too | No       |


<br/>

---

<br/>


## `StateIngestConfig`

```ts
export interface StateIngestConfigInterface
        extends StateRuntimeJobConfigInterface,
                IngestConfigInterface {
   key?: RuntimeJobKey;
}
```
* [RuntimeJobConfigInterface](#stateruntimejobconfig) <br/>
* [IngestConfigInterface](#ingestconfig)

| Prop | Type             | Default     | Description                                                                                    | Required |
|------|------------------|-------------|------------------------------------------------------------------------------------------------|----------|
| key  | string \| number | undefined   | Key/Name of Job that gets created                                                              | No       |


<br/>

---

<br/>


## `StateRuntimeJobConfig`

```ts
export interface StateRuntimeJobConfigInterface
  extends RuntimeJobConfigInterface {
  overwrite?: boolean;
  storage?: boolean;
}
```
* [RuntimeJobConfigInterface](#runtimejobconfig)

| Prop      | Type    | Default | Description                                                                                    | Required |
|-----------|---------|---------|------------------------------------------------------------------------------------------------|----------|
| overwrite | boolean | false   | If whole State gets overwritten with the new Value (initialStateValue, previousStateValue, ..) | No       |
| storage   | boolean | true    | If State changes get applied to the Storage (only if State got persisted (`persist`))          | No       |


<br/>

---

<br/>


## `RuntimeJobConfig`

```ts
export interface RuntimeJobConfigInterface {
  background?: boolean;
  sideEffects?: boolean;
  force?: boolean;
}
```

| Prop        | Type    | Default | Description                                                                          | Required |
|-------------|---------|---------|--------------------------------------------------------------------------------------|----------|
| background  | boolean | false   | If the Job runs through the Runtime in the background -> does not trigger a rerender | No       |
| sideEffects | boolean | true    | If sideEffects of the Job get executed                                               | No       |
| force       | boolean | false   | If the Job gets chased through the Runtime, no matter what happens                   | No       |


<br/>

---

<br/>


## `IngestConfig`

```ts
export interface IngestConfigInterface {
   perform?: boolean;
}
```

| Prop     | Type             | Default     | Description                                                                                    | Required |
|----------|------------------|-------------|------------------------------------------------------------------------------------------------|----------|
| perform  | boolean          | true        | If Job gets performed immediately                                                              | No       |


<br/>

---

<br/>


## `PatchConfig`

```ts
export interface PatchConfigInterface extends StateIngestConfigInterface {
  addNewProperties?: boolean;
}
```
* [StateIngestConfigInterface](#stateingestconfig)

| Prop              | Type             | Default     | Description                                                                                    | Required |
|-------------------|------------------|-------------|------------------------------------------------------------------------------------------------|----------|
| addNewProperties  | boolean          | true        | If new properties get added to the State Value                                                 | No       |


<br/>

---

<br/>


## `StatePersistentConfig`

```ts
export interface StatePersistentConfigInterface {
   instantiate?: boolean;
   storageKeys?: StorageKey[];
}
```

| Prop              | Type                     | Default     | Description                                                                                                             | Required |
|-------------------|--------------------------|-------------|-------------------------------------------------------------------------------------------------------------------------|----------|
| instantiate       | boolean                  | true        | If Persistent gets instantiated                                                                                         | No       |
| storageKeys       | Array<string \| number>  | true        | Key/Name of Storages which gets used to persist the State Value (NOTE: If not passed the default Storage will be used)  | No       |
