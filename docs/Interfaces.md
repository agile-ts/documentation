---
id: interfaces
title: Interfaces
sidebar_label: Interfaces
slug: /interfaces
---

:::info

Here are all possible interfaces are listed, which were mentioned in the documentation.

:::


## `CreateLoggerConfig`

Here is a Typescript Interface of the Object for quick reference, 
however each property will be explained in more detail below.
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

<br/>

#### `prefix`

Prefix that gets added before each Log Message.
In case of AgileTs it is of course "Agile".

| Type               | Default   | Required |
|--------------------|-----------|----------|
| `string`           | "Agile" | No       |

<br/>

#### `level`

At what 'level' the logger should log. 
For instance if it only should log Errors.

| Type               | Default   | Required |
|--------------------|-----------|----------|
| `number`           | 20        | No       |

<br/>

#### `active`

If the Logger is active and logs stuff in the console.

| Type               | Default   | Required |
|--------------------|-----------|----------|
| `boolean`          | true      | No       |

<br/>

#### `timestamp`

If a Timestamp gets applied for each Log Message.

| Type               | Default   | Required |
|--------------------|-----------|----------|
| `boolean`          | false     | No       |

<br/>

#### `allowedTags`

Sometimes logs are marked with Tags. If this is the case, the log gets only logged if the Tag is included.

| Type               | Default                                                   | Required |
|--------------------|-----------------------------------------------------------|----------|
| `string[]`         | ['runtime', 'storage', 'subscription', 'multieditor']     | No       |

<br/>

#### `canUseCustomStyles`

If the Logger is allowed to apply css styles to the Logs. For instance Agile Logs are by default purple.

| Type               | Default   | Required |
|--------------------|-----------|----------|
| `boolean`          | true      | No       |



<br/>

---

<br/>



## `StorageMethods`

Here is a Typescript Interface of the Object for quick reference, 
however each property will be explained in more detail below.
```ts
export interface StorageMethodsInterface {
  get: (key: string) => any;
  set: (key: string, value: any) => void;
  remove: (key: string) => void;
}
```

<br/>

#### `get`

Get Method of Storage (gets Items from Storage)

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `(key:  string) => any`  | undefined | Yes      |

<br/>

#### `set`

Set Method of Storage (saves/updates Items in Storage)

| Type                                  | Default   | Required |
|---------------------------------------|-----------|----------|
| `(key:  string, value: any) => void`  | undefined | Yes      |

<br/>

#### `remove`

Remove Method of Storage (removes Items from Storage)

| Type                       | Default   | Required |
|----------------------------|-----------|----------|
| `(key:  string) => void`   | undefined | Yes      |



<br/>

---

<br/>



## `StateIngestConfig`

Here is a Typescript Interface of the Object for quick reference, 
however each property will be explained in more detail below.
```ts
export interface StateIngestConfigInterface
        extends StateRuntimeJobConfigInterface,
                IngestConfigInterface {
   key?: RuntimeJobKey;
}

// With all properties (might be more useful)
export interface StateIngestConfigInterface {
   key?: RuntimeJobKey;
   force?: boolean;
   background?: boolean;
   overwrite?: boolean;
   storage?: boolean;
   sideEffects?: boolean;
   perform?: boolean;
}
```

<br/>

#### `key`

Key/Name of Job that gets created .

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `string \| number`       | undefined | No       |

<br/>

#### `force`

Defines if our new value gets forces trough the `runtime` 
and applied to our State no matter what happens. By default, this property is set to `false`.
```ts {5}
  // Doesn't get ingested into the Runtime, because the State Value hasn't changed
  MY_STATE.set("myNewValue");
  
  // Gets ingested into the Runtime
  MY_STATE.set("myNewValue", { force: true });
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |

<br/>

#### `background` 

If the new value gets applied to our State in background.
That means, that the State change doesn't cause any rerender on any Component,
that has the State bound to itself. By default, this property is set to `false`.
```ts {5}
  // Causes rerender on Components
  MY_STATE.set("myNewValue2");
  
  // Doesn't cause rerender on Comonents
  MY_STATE.set("myNewValue3", {background: true}); // ◀️
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |

<br/>

#### `overwrite` 

With `overwrite` we define, if we want to overwrite our whole State 
with the new value. By default, this config is set to `false`.
```ts {1}
   MY_STATE.set("finalValue", {overwrite: true});
   MY_STATE.value; // Returns 'finalValue'
   MY_STATE.previousStateValue; // Returns 'finalValue'
   MY_STATE.initialStateValue; // Returns 'finalValue'
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |

<br/>

#### `storage`

If State changes get applied to the Storage (only if State got persisted (`persist`))

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | true      | No       |

<br/>

#### `sideEffects`

If sideEffects of the Job get executed

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | true      | No       |

<br/>

#### `perform`

If Job gets performed immediately

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | true      | No       |



<br/>

---

<br/>



## `PatchConfig`

Here is a Typescript Interface of the Object for quick reference, 
however each property will be explained in more detail below.
```ts
export interface PatchConfigInterface extends StateIngestConfigInterface {
  addNewProperties?: boolean;
}
```
* [StateIngestConfigInterface](#stateingestconfig)

<br/>

#### `addNewProperties`

If new properties get added to the State Value

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | true      | No       |



<br/>

---

<br/>



## `StatePersistentConfig`

Here is a Typescript Interface of the Object for quick reference, 
however each property will be explained in more detail below.
```ts
export interface StatePersistentConfigInterface {
   instantiate?: boolean;
   storageKeys?: StorageKey[];
}
```

<br/>

#### `instantiate`

If Persistent gets instantiated

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | true      | No       |

<br/>

#### `storageKeys`

Key/Name of Storages which gets used to persist the State Value (NOTE: If not passed the default Storage will be used)

| Type                       | Default            | Required |
|----------------------------|--------------------|----------|
| `Array<string \| number>`  | 'defaultStorage'   | No       |



<br/>

---

<br/>



## `GroupConfig`

Here is a Typescript Interface of the Object for quick reference, 
however each property will be explained in more detail below.
```ts
export interface GroupConfigInterface {
  key?: GroupKey;
  isPlaceholder?: boolean;
}
```

<br/>

#### `key`

Key/Name of Group 

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `string \| name`         | undefined | No       |

<br/>

#### `isPlaceholder`

If Group is initially a Placeholder  

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |



<br/>

---

<br/>



## `SelectorConfig`

Here is a Typescript Interface of the Object for quick reference, 
however each property will be explained in more detail below.
```ts
export interface SelectorConfigInterface {
  key?: SelectorKey;
  isPlaceholder?: boolean;
}
```

<br/>

#### `key`

Key/Name of Selector 

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `string \| name`         | undefined | No       |

<br/>

#### `isPlaceholder`

If Selector is initially a Placeholder  

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |



<br/>

---

<br/>



## `CollectConfig`

```ts
export interface CollectConfigInterface<DataType = any> {
  patch?: boolean;
  method?: 'push' | 'unshift';
  forEachItem?: (data: DataType, key: ItemKey, index: number) => void;
  background?: boolean;
  select?: boolean;
}
```

| Prop              | Type                     | Default     | Description                                                                                                             | Required |
|-------------------|--------------------------|-------------|-------------------------------------------------------------------------------------------------------------------------|----------|
| patch               | boolean         | false   | Key/Name of Selector                                                                                                    | No       |
| method     | push' \| 'unshift'                  | 'push'       | If Selector is initially a Placeholder                                                                                  | No       |
| forEachItem     | boolean                  | false       | If Selector is initially a Placeholder                                                                                  | No       |
| background     | boolean                  | false       | If Selector is initially a Placeholder                                                                                  | No       |
| select     | boolean                  | false       | If Selector is initially a Placeholder                                                                                  | No       |
