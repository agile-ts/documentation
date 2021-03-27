---
id: interfaces
title: Interfaces
sidebar_label: Interfaces
slug: /interfaces
---

:::info

Without any context this section might be useless to you. As the name suggests, it's all about typescript interfaces of
AgileTs, which are outsourced for a better overview. You might get redirected to parts of the Interface Section from
other docs. Often to learn some more about specific properties of an interface.

:::

## `CreateLoggerConfig`

The `CreateLoggerConfigInterface` is used in the creation and configuration of the Agile `Logger Class`.
Here is a Typescript Interface for quick reference, 
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

The prefix which is added before each log message.
```ts {2}
const logger = new Logger({
    prefix: "MyLog"
});

logger.debug("Jeff"); // Logs 'MyLog Debug: Jeff'
```
Each log message of AgileTs has the prefix "Agile",
which was configured with this property's help

| Type               | Default   | Required |
|--------------------|-----------|----------|
| `string`           | "Agile"   | No       |

<br/>

#### `level`

The `log level` determines which kind of log messages will be logged by the `Logger Class`.
Therefore, it is used to filter the logs, so that we only see the logs which are relevant for us.
For example, you won't often set the `log level` to `debug`,
since debug messages get annoying if we aren't analysing anything specific in AgileTs.
```ts {2}
const logger = new Logger({
    level: Logger.level.WARN
});

logger.debug("Jeff"); // Doesn't get logged
logger.warn("A important Warning"); // Gets logged
```
The `Logger Class` supports some hard coded log levels, which can be set dynamically.
```ts
{
    TRACE: 1,
    DEBUG: 2,
    LOG: 5,
    TABLE: 5,
    INFO: 10,
    SUCCESS: 15,
    WARN: 20,
    ERROR: 50,
}

Logger.level.LOG; // 5
```
For example, if the set logger level is `INFO`, 
each log with a higher or same level will be printed into the console.
In case of `INFO` that would be `SUCCESS`, `WARN`, `ERROR` and of course `INFO`.

| Type               | Default   | Required |
|--------------------|-----------|----------|
| `number`           | 20        | No       |

<br/>

#### `active`

If the logger is active and is allowed to print anything into the console.
```ts {2}
const logger = new Logger({
    active: false
});

logger.log("Jeff"); // Doesn't get logged
logger.isActive = true;
logger.log("Jeff"); // Gets logged
```

| Type               | Default   | Required |
|--------------------|-----------|----------|
| `boolean`          | true      | No       |

<br/>

#### `timestamp`

By setting the timestamp property to `true`,
each log will have a timestamp representing the time it was logged.
```ts {2}
const logger = new Logger({
    timestamp: true
});

logger.debug("Jeff"); // Logs '[1613108673781] Debug: Jeff'
```

| Type               | Default   | Required |
|--------------------|-----------|----------|
| `boolean`          | false     | No       |

<br/>

#### `allowedTags`

Sometimes logging can be very confusing, 
and overwhelming if the console gets spammed with logs that doesn't matter right now.
Therefore, tags got created, which filter logs specifically by tags.
```ts {2}
const logger = new Logger({
    allowedTags: ["jeff"]
});

logger.debug("Jeff"); // Gets logged
logger.if.tag(["jeff"]); // Gets logged
logger.if.tag(["hans", "jeff"]); // Doesn't get logged
logger.if.tag(["hans"]); // Doesn't get logged
```
Each log with specific tags will only be logged if all tags are active in the `Logger Class`.
Logs that have no condition are always logged.

| Type               | Default                                                   | Required |
|--------------------|-----------------------------------------------------------|----------|
| `string[]`         | ['runtime', 'storage', 'subscription', 'multieditor']     | No       |

<br/>

#### `canUseCustomStyles`

Determines if logs can have custom css styles.

![Log Custom Styles Example](../static/img/docs/logger_example.png)

For example Agile Logs are by default purple.

| Type               | Default   | Required |
|--------------------|-----------|----------|
| `boolean`          | true      | No       |



<br/>

---

<br/>



## `StorageMethods`

The `StorageMethodsInterface` is used in the creation of a [Storage](./packages/core/features/storage/Introduction.md).
Here is a Typescript Interface for quick reference, 
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

Method to get a specific value at `primaryKey` from the external Storage.
```ts
myStorage.get("item1"); // Calls the here defined get method
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `(key:  string) => any`  | undefined | Yes      |

<br/>

#### `set`

Method to set a specific value at `primaryKey` into the external Storage.
```ts
myStorage.set("item1", {my: "value"}); // Calls the here defined set method
```

| Type                                  | Default   | Required |
|---------------------------------------|-----------|----------|
| `(key:  string, value: any) => void`  | undefined | Yes      |

<br/>

#### `remove`

Method to remove a specific value at `primaryKey` from the external Storage.
```ts
myStorage.remove("item1"); // Calls the here defined remove method
```

| Type                       | Default   | Required |
|----------------------------|-----------|----------|
| `(key:  string) => void`   | undefined | Yes      |



<br/>

---

<br/>



## `StateIngestConfig`

The `StateIngestConfigInterface` is used as configuration object in functions like `set()`, `undo()`, ..
Here is a Typescript Interface for quick reference, 
however each property will be explained in more detail below.
```ts
export interface StateIngestConfigInterface
        extends StateRuntimeJobConfigInterface,
                IngestConfigInterface {
   key?: RuntimeJobKey;
}
```
The `StateIngestConfigInterface` extends some other Interfaces:
- [StateRuntimeJobConfigInterface](#stateruntimejobconfiginterface)
- [IngestConfigInterface](#ingestconfiginterface)

<br/>

#### `key`

The `key/name` of the Job which will be created and ingested into the `runtime`.
Might get pretty useful during debug sessions
to see when which change has been passed through the `runtime`. 

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `string \| number`       | undefined | No       |



<br/>

---

<br/>



## `StateRuntimeJobConfigInterface`

The `StateRuntimeJobConfigInterface` is used as configuration object in functions like `replace()`, `select()`, ..
Here is a Typescript Interface for quick reference, 
however each property will be explained in more detail below.
```ts
export interface StateRuntimeJobConfigInterface
  extends RuntimeJobConfigInterface {
  overwrite?: boolean;
  storage?: boolean;
}
```
The `StateRuntimeJobConfigInterface` extends some other Interfaces:
- [RuntimeJobConfigInterface](#runtimejobconfiginterface)

<br/>

#### `overwrite` 

If the whole State will be overwritten with the newly assigned `value`.
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

Whether to apply the State value change to the external Storage/s.
:::info

The State value change is applied only if the State has been [persisted](./packages/core/features/state/Introduction.md).

:::

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | true      | No       |



<br/>

---

<br/>



## `RuntimeJobConfigInterface`

The `RuntimeJobConfigInterface` is used as configuration object of the `Runtime Job`.
Here is a Typescript Interface for quick reference, 
however each property will be explained in more detail below.
```ts
export interface RuntimeJobConfigInterface {
  background?: boolean;
  sideEffects?: SideEffectConfigInterface;
  force?: boolean;
}
```

<br/>

#### `background` 

If the Job should be run in `background`,
so that no Component rerender which has bound the Agile Sub Instance (the Job represents) to itself.
```ts {5}
  // Causes rerender on Components
  MY_STATE.set("myNewValue2");
  
  // Doesn't cause rerender on Comonents
  MY_STATE.set("myNewValue3", {background: true});
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |

<br/>

#### `sideEffects`

If the side effects of the Job get executed.
A side effect is for example the _rebuild of the Group output_, 
or the _persisting of the State value_.

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | true      | No       |

<br/>

#### `force`

If the Job should be forced through the `runtime` no matter what happens.
```ts {7}
  const MY_STATE = App.createState("myNewValue")

  // Doesn't get ingested into the Runtime, because the State Value hasn't changed
  MY_STATE.set("myNewValue");
  
  // Gets ingested into the Runtime
  MY_STATE.set("myNewValue", { force: true });
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |



<br/>

---

<br/>



## `IngestConfigInterface`

The `IngestConfigInterface` is used as basic configuration object to ingest `Observers` into the `runtime`.
Here is a Typescript Interface for quick reference, 
however each property will be explained in more detail below.
```ts
export interface IngestConfigInterface {
  perform?: boolean;
}
```

<br/>

#### `perform`

If the newly created Job is executed by the `runtime` immediately.
Otherwise, the Job will be added to a queue and executed when it is its turn.

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | true      | No       |



<br/>

---

<br/>



## `PatchConfig`

The `PatchConfigInterface` is used as configuration object in functions like `patch()`.
Here is a Typescript Interface for quick reference, 
however each property will be explained in more detail below.
```ts
export interface PatchConfigInterface extends StateIngestConfigInterface {
  addNewProperties?: boolean;
}
```
The `PatchConfigInterface` extends some other Interfaces:
- [StateIngestConfigInterface](#stateingestconfig)

<br/>

#### `addNewProperties`

If new properties that don't already exist should be added to the State value.
```ts {3,5}
const MY_STATE = App.createState({id: 1, name: "frank"});

MY_STATE.patch({location: "Germany"}, {addNewProperties: false}); 
MY_STATE.value; // Returns {id: 1, name: "frank"}
MY_STATE.patch({location: "Germany"}, {addNewProperties: true});
MY_STATE.value; // Returns {id: 1, name: "frank", location: "Germany"}
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | true      | No       |



<br/>

---

<br/>



## `StatePersistentConfig`

This is the `StatePersistentConfig` Interface, and it is used as configuration object in the `persist()` function of a State.
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

If the persistent gets instantiated immediately.
If we don't let AgileTs instantiate our persistent, we have to do it on our own.
```ts {2}
myState.persist({
   instantiate: false,
});

if (myState.persistent?.ready) {
   await myState.persistent?.initialLoading();
    myState.isPersisted = true;
}
```
This might be only useful if we want to await the persisting into the Storage.
If we just want to await until the persisted value got loaded from the Storage,
we recommend using the `onLoad` function.

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | true      | No       |

<br/>

#### `storageKeys`

Key/Name of external Storages in which the persisted State Value will be stored.
If not passing any specific Storage Key, the default Storage will be used.
```ts
MY_STATE.persist(); // Stores value in default Storage
MY_STATE.persist({storageKeys: ['myCustomStorrage']}); // Stores value in 'myCustomStorrage'
```

| Type                       | Default            | Required |
|----------------------------|--------------------|----------|
| `Array<string \| number>`  | 'defaultStorage'   | No       |



<br/>

---

<br/>



## `GroupConfig`

This is the `GroupConfig` Interface, and it is used as configuration object in the creation of Groups.
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

Key/Name of Group.

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `string \| name`         | undefined | No       |

<br/>

#### `isPlaceholder`

If Group is initially a Placeholder.  

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |



<br/>

---

<br/>



## `SelectorConfig`

This is the `SelectorConfig` Interface, and it is used as configuration object in the creation of Selectors.
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

Key/Name of Selector. 

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `string \| name`         | undefined | No       |

<br/>

#### `isPlaceholder`

If Selector is initially a Placeholder.

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |



<br/>

---

<br/>



## `CollectConfig`

This is the `CollectConfig` Interface, and it is used as configuration object in the `collect()` method of a Collection.
Here is a Typescript Interface of the Object for quick reference,
however each property will be explained in more detail below.
```ts
export interface CollectConfigInterface<DataType = any> {
  patch?: boolean;
  method?: 'push' | 'unshift';
  forEachItem?: (data: DataType, key: ItemKey, index: number) => void;
  background?: boolean;
  select?: boolean;
}
```

<br/>

#### `patch`

Under the hood it calls the [`patch`](./packages/core/features/state/Methods.md#patch) method
instead of the [`set`](./packages/core/features/state/Methods.md#set) method.
Of course, it is only useful if we patch something into something existing, 
what shouldn't be the case in the `collect` method.

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |

<br/>

#### `method`

In which way the collected data primary Key gets added to the Groups.
By using `push` it will be added at the end of the primaryKey array
```ts {2}
MY_COLLECTION.collect({id: 1, name: "jeff"}, {method: 'push'});
MY_COLLECTION.getGroup(MY_COLLECTION.config.defaultGroupKey).value; // Returns [5, 6, 0, 1]
```
and by `unshift` it can be found at the beginning of the primaryKey array.
```ts {2}
MY_COLLECTION.collect({id: 8, name: "jeff"}, {method: 'unshift'});
MY_COLLECTION.getGroup(MY_COLLECTION.config.defaultGroupKey).value; // Returns [8, 5, 6, 0, 1]
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `push' \| 'unshift'`     | 'push'    | No       |

<br/>

#### `forEachItem`

Gets called for each collected Data.
```ts {4-9}
MY_COLLECTION.collect([
    {id: 1, name: "jeff"}, 
    {id: 8, name: "frank"}], 
    {forEachItem: (data, key, index) => {
         // Gets Called with data: {id: 1, name: "jeff"}, key: 1, index: 0
         // and   
         // Gets Called with data: {id: 2, name: "frank"}, key: 8, index: 1  
      }
    })
```

| Type                                                        | Default   | Required |
|-------------------------------------------------------------|-----------|----------|
| `(data: DataType, key: ItemKey, index: number) => void`     | undefined | No       |

<br/>

#### `background`

Sometimes we want to add new data to our Collection in background,
so that no component rerender that has bound the Collection to itself.
Then this property might get handy.
```ts {5}
  // Causes rerender on Components
  MY_COLLECTION.collect({id: 1, name: "jeff"});
  
  // Doesn't cause rerender on Comonents
  MY_COLLECTION.collect({id: 1, name: "jeff"}, {background: true});
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |

<br/>

#### `select`

If foreach collected Data a [Selector](./packages/core/features/collection/selector/Introduction.md) gets created, which
is a separate State that represents the Data Value.

```ts {5}
MY_COLLECTION.collect({id: 1, name: "jeff"}, {select: true});
MY_COLLECTION.getSelector(1); // Returns Selector that got just created
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |



<br/>

---

<br/>



## `UpdateConfig`

This is the `UpdateConfig` Interface, and it is used as configuration object in the `update()` method. 
Here is a Typescript Interface of the Object for quick reference, 
however each property will be explained in more detail below.
```ts
export interface UpdateConfigInterface {
    patch?: boolean | { addNewProperties?: boolean };
    background?: boolean;
}
```

<br/>

#### `patch`

If the update data object should be merged into the existing data or overwrite it completely.
In case we want to merge the data into the existing data, 
we can decide whether new properties are added to the data object or not.
```ts {2}
MY_COLLECTION.collect({id: 1, name: "jeff"});
MY_COLLECTION.update(1, {name: "hans", age: 12}, {patch: {addNewProperties: false}}); // Item at '1' has value '{name: "hans"}'
MY_COLLECTION.update(1, {name: "frank", age: 10}); // Item at '1' has value '{name: "frank", age: 10}'
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | true      | No       |

<br/>

#### `background`

Sometimes we want to update an Item in our Collection in background, so that no component rerender that has bound the
Collection to itself. Then this property might get handy.

```ts {5}
  // Causes rerender on Components
MY_COLLECTION.update(1, {name: "jeff"});

// Doesn't cause rerender on Comonents
MY_COLLECTION.update(1, {name: "frank"}, {background: true});
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |



<br/>

---

<br/>



## `HasConfig`

This is the `HasConfig` Interface, and it is used as configuration object in methods like `hasGroup()`, `hasSelector()`, .. 
Here is a Typescript Interface of the Object for quick reference, 
however each property will be explained in more detail below.
```ts
export interface HasConfigInterface {
    notExisting?: boolean;
}
```

<br/>

#### `notExisting`

Should be set to `true`, if also not existing Instances should be returned, like `placeholder` Instances.

```ts {2,5}
// Returns placeholder Group
MY_COLLECTION.hasGroup('myPlaceholderGroup', {notExisting: true});

// Returns undefined
MY_COLLECTION.hasGroup('myPlaceholderGroup');
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |



<br/>

---

<br/>



## `AddSideEffectConfig`

This is the `AddSideEffectConfig` Interface, and it is used as configuration object in the `addSideEffect()` method. 
Here is a Typescript Interface of the Object for quick reference, 
however each property will be explained in more detail below.
```ts
export interface AddSideEffectConfigInterface {
    weight?: number;
}
```

<br/>

#### `weight`

Determines when the `sideEffect` callback should be executed,
since some `sideEffects` has to be executed before others.
The higher the `weigth` the earlier the `sideEffect` is executed.

```ts {3}
MY_STATE.addSideEffect('mySideEffect', (state, config) => {
    // sideEffect callback
}, {weigth: 10});
```


| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `number`                 | 10        | No       |



<br/>

---

<br/>



## `GroupAddConfig`

This is the `GroupAddConfig` Interface, and it is used as configuration object in functions like `put()` or `add()`. 
Here is a Typescript Interface of the Object for quick reference,
however each property will be explained in more detail below.
```ts
export interface GroupAddConfig {
    method?: 'unshift' | 'push';
    overwrite?: boolean;
    background?: boolean;
}
```

<br/>

#### `method`

Defines which way the `itemKey` is added to the Group.
- `unshift` adds the `itemKey` at the beginning of the array
- `push` adds the `itemKey` at the end of the array

```ts
const MY_GROUP = MY_COLLECTION.createGroup('group1', [1, 2, 5, 6]);
MY_GROUP.add(3, {method: 'push'}); // Group value is '[1, 2, 5, 6, 3]'
MY_GROUP.add(9, {method: 'unshift'}); // Group value is '[9, 1, 2, 5, 6, 3]'
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `'unshift' \| 'push'`    | 'push'    | No       |

<br/>

#### `overwrite`

If we add an `itemKey` twice to the Group,
it normally doesn't do anything, since the `itemKey` already exists.
```ts
const MY_GROUP = MY_COLLECTION.createGroup('group1', [1, 2, 5, 6]);
MY_GROUP.add(2); // Group value is '[1, 2, 5, 6]'
```
By overwriting the `itemKey` it simply removes the old `itemKey` and adds it again.
```ts
const MY_GROUP = MY_COLLECTION.createGroup('group1', [1, 2, 5, 6]);
MY_GROUP.add(2, {overwrite: true}); // Group value is '[1, 5, 6, 2]'
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false    | No       |

<br/>

#### `background`

Sometimes we want to add `itemKes` to our Group in background, so that no component rerender that has bound the
Group to itself. Then this property might get handy.

```ts {5}
// Causes rerender on Components
MY_GROUP.add(1);

// Doesn't cause rerender on Comonents
MY_GROUP.add(1, {background: true});
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |



<br/>

---

<br/>



## `UpdateItemKeyConfig`

This is the `UpdateItemKeyConfig` Interface, and it is used as configuration object the `updateItemKey` function.
Here is a Typescript Interface of the Object for quick reference,
however each property will be explained in more detail below.
```ts
export interface UpdateItemKeyConfigInterface {
    background?: boolean;
}
```

<br/>

#### `background`

Sometimes we want to update a `itemKey` in background, so that no component rerender that has bound the
Collection to itself. Then this property might get handy.

```ts {5}
// Causes rerender on Components
MY_COLLECTION.updateItemKey([1, 3]);

// Doesn't cause rerender on Comonents
MY_COLLECTION.updateItemKey([1, 3], {background: true});
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |



<br/>

---

<br/>



## `GroupRemoveConfig`

This is the `GroupRemoveConfig` Interface, and it is used as configuration object the `remove` function.
Here is a Typescript Interface of the Object for quick reference,
however each property will be explained in more detail below.
```ts
export interface GroupRemoveConfigInterface {
    background?: boolean;
}
```

<br/>

#### `background`

Sometimes we want to remove a `itemKey` in background, so that no component rerender that has bound the
Collection to itself. Then this property might get handy.

```ts {5}
// Causes rerender on Components
MY_GROUP.remove(1);

// Doesn't cause rerender on Comonents
MY_GROUP.remove(1, {background: true});
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |
