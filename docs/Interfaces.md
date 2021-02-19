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

This is the `CreateLoggerConfig` Interface, and it is used in the creation and configuration of the Agile Logger.
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

Prefix which is added before each log message.
In case of AgileTs it is of course "Agile".

```ts {2}
const logger = new Logger({
    prefix: "MyLog"
});

logger.debug("Jeff"); // Logs 'MyLog Debug: Jeff'
```

| Type               | Default   | Required |
|--------------------|-----------|----------|
| `string`           | "Agile"   | No       |

<br/>

#### `level`

At which level the logger should log. 
Levels are used to filter the logs, because often you don't need debug logs for example.
```ts {2}
const logger = new Logger({
    level: Logger.level.WARN
});

logger.log("Jeff"); // Doesn't get logged
logger.warn("A important Warning"); // Gets logged
```
Here are all Logger level. 
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
If for instance level `INFO` is active, each log with a higher or same level will be logged,
in this case `SUCCESS`, `WARN`, `ERROR` and of course `INFO`.

| Type               | Default   | Required |
|--------------------|-----------|----------|
| `number`           | 20        | No       |

<br/>

#### `active`

Whether the logger is active and logs stuff in the console.
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

If a timestamp is set before each log.
Is sometimes useful to trace, when something was logged.

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

Sometimes logging can be very confusing, so there are tags which filter logs specifically.
Every log that has the active tags will be logged. Logs that have no condition are always logged.
```ts {2}
const logger = new Logger({
    allowedTags: ["jeff"]
});

logger.debug("Jeff"); // Gets logged
logger.if.tag(["jeff"]); // Gets logged
logger.if.tag(["hans", "jeff"]); // Doesn't get logged
logger.if.tag(["hans"]); // Doesn't get logged
```

| Type               | Default                                                   | Required |
|--------------------|-----------------------------------------------------------|----------|
| `string[]`         | ['runtime', 'storage', 'subscription', 'multieditor']     | No       |

<br/>

#### `canUseCustomStyles`

If the Logger is allowed to apply css styles to the Logs. 
For instance Agile Logs are by default purple.

![Log Custom Styles Example](../static/img/docs/logger_example.png)

| Type               | Default   | Required |
|--------------------|-----------|----------|
| `boolean`          | true      | No       |



<br/>

---

<br/>



## `StorageMethods`

This is the `StorageMethods` Interface, and it is used in the creation of a [Storage](./packages/core/features/storage/Introduction.md).
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

The get method of the storage. That means it gets items from the external storage.
```ts
myStorage.get("item1"); // Calls the here defined get method
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `(key:  string) => any`  | undefined | Yes      |

<br/>

#### `set`

The set method of the storage. This means that it writes items into the external storage.
```ts
myStorage.set("item1", {my: "value"}); // Calls the here defined set method
```

| Type                                  | Default   | Required |
|---------------------------------------|-----------|----------|
| `(key:  string, value: any) => void`  | undefined | Yes      |

<br/>

#### `remove`

The remove method from the storage. This means that it removes items from the external storage.
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

This is the `StateIngestConfig` Interface, and it is used as config object in function like `set`, `undo`, .. of a State.
Here is a Typescript Interface of the Object for quick reference, 
however each property will be explained in more detail below.
```ts
export interface StateIngestConfigInterface
        extends StateRuntimeJobConfigInterface,
                IngestConfigInterface {
   key?: RuntimeJobKey;
}
```
However, I guess that doesn't help us much, so here is an 'extended' version.
```ts
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

Defines key/name of Job that gets created and ingested into the runtime.
Might be useful to define, if we want to debug something in the runtime,
but I guess for the most of us this property isn't important.

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `string \| number`       | undefined | No       |

<br/>

#### `force`

If our job with the new value gets forced trough the `runtime`,
not matter what happens. We have to set this property for instance
if we try to apply the same value to the state again, but still want
to rerender components which has bound the State to itself
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

#### `background` 

Sometimes we want to apply new values to our State in background,
so that no component rerender that has bound the State to itself.
Then this property might get handy.
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

#### `overwrite` 

With `overwrite` we define, if we want to overwrite our whole State 
with the newly assigned value.
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

If State changes get applied to an external Storage.
Of course only if the State got with help of the `persist` function persisted.

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

If the newly created job will be performed immediately.
Otherwise, it will be added to a que and performed whenever it is his turn.

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | true      | No       |



<br/>

---

<br/>



## `PatchConfig`

This is the `PatchConfig` Interface, and it is used as config object in the `patch` function of a State.
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

If new properties that hasn't exist before, get added to the State Value.
```ts {3,5}
const MY_STATE = App.createState({id: 1, name: "frank"});

MY_STATE.patch({location: "Germany"}, {addNewProperties: false}); 
MY_STATE.value; // Returns {id: 1, name: "frank"}
MY_STATE.patch({location: "Germany"}, {addNewProperties: true});
MY_STATE.value; // Returns {id: 1, name: "frank"m location: "Germany"}
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | true      | No       |



<br/>

---

<br/>



## `StatePersistentConfig`

This is the `StatePersistentConfig` Interface, and it is used as config object in the `persist` function of a State.
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

This is the `GroupConfig` Interface, and it is used as config object in the creation of Groups.
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

This is the `SelectorConfig` Interface, and it is used as config object in the creation of Selectors.
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

This is the `CollectConfig` Interface, and it is used as config object in the `collect` method.
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

If foreach collected Data a [Selector](./packages/core/features/collection/selector/Introduction.md) gets created, 
which is a separate State that represents the Data Value.
```ts {5}
MY_COLLECTION.collect({id: 1, name: "jeff"}, {select: true});
MY_COLLECTION.getSelector(1); // Returns Selector that got just created
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |