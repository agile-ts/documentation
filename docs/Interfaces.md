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
The log messages of AgileTs has the prefix "Agile" by default.

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
Therefore, tags are created, which filter logs specifically by tags.
```ts {2}
const logger = new Logger({
    allowedTags: ["jeff", "hans"]
});

logger.debug("Jeff"); // Gets logged
logger.if.tag(["jeff"]).debug("Jeff"); // Doesn't get logged
logger.if.tag(["hans", "jeff"]).debug("Jeff");; // Gets get logged
logger.if.tag(["hans"]).debug("Jeff");; // Doesn't get logged
logger.if.tag(["hans", "frank"]).debug("Jeff");; // Doesn't get logged
```
Any log with specific tags will be logged only if all its tags are allowed in the `Logger Class`.
Logs that have no condition/tags at all are always logged.

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

The `StorageMethodsInterface` is used in the creation of a Agile [Storage](./packages/core/features/storage/Introduction.md) Interface.
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

The `StateIngestConfigInterface` is used as configuration object in functions like `set()` or `undo()`.
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
- [StateRuntimeJobConfigInterface](#stateruntimejobconfig)
- [IngestConfigInterface](#ingestconfiginterface)

<br/>

#### `key`

The `key/name` of the Job which will be created and ingested into the `runtime`.
```ts
MY_STATE.set('hello there', {key: 'jeff'});
```
Might get pretty useful during debug sessions
to see when which change has been passed through the `runtime`. 
```ts
// Agile Debug: Created Job 'jeff', Job('jeff')
// Agile Debug: Completed Job 'jeff', Job('jeff')
// Agile Debug: Updated/Rerendered Subscriptions, [SubscriptionContainer, ..]
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `string \| number`       | undefined | No       |



<br/>

---

<br/>



## `StateRuntimeJobConfig`

The `StateRuntimeJobConfigInterface` is used as configuration object in functions like `replace()` or `select()`.
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
By overwriting a State following properties will be overwritten:
- `value`
- `previousStateValue`
- `initalStateValue`
- `isPlaceholder`

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |

<br/>

#### `storage`

Whether to apply the State value change to the external Storage/s.
```ts {1}
const MY_STATE = App.creacteState('jeff').persist('storageKey');
// Storage at 'storageKey': 'jeff'
MY_STATE.set("hans", {storage: true});
// Storage at 'storageKey': 'hans'
MY_STATE.set("dieter", {storage: false});
// Storage at 'storageKey': 'hans'
```
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
  
  // Doesn't cause rerender on Components
  MY_STATE.set("myNewValue3", {background: true});
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |

<br/>

#### `sideEffects`

If the side effects of the Job get executed.
```ts {5}
  // Executes sideEffects
  MY_STATE.set("myNewValue2");
  
  // Doesn't execute sideEffects
  MY_STATE.set("myNewValue3", {sideEffects: false});
```
A side effect is for example the _rebuild of the Group output_, 
or the _persisting of the State value_.

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | true      | No       |

<br/>

#### `force`

If the Job should be forced through the `runtime` no matter what happens.
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

If new properties that don't already exist in the value object should be added to the State value.
```ts {2,4}
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

The `StatePersistentConfigInterface` is used as configuration object in functions like `persist()`.
Here is a Typescript Interface for quick reference, 
however each property will be explained in more detail below.
```ts
export interface StatePersistentConfigInterface {
   instantiate?: boolean;
   storageKeys?: StorageKey[];
}
```

<br/>

#### `instantiate`

If the `Persistent` which gets created should be instantiated immediately.
:::info

Be aware, that if we don't let AgileTs instantiate our `Persistent`, we have to do it on our own.

:::
```ts {2}
myState.persist({
   instantiate: false,
});

if (myState.persistent?.ready) {
   await myState.persistent?.initialLoading();
    myState.isPersisted = true;
}
```
This can become very useful to wait for persisting to an external Storage.
If we want to wait until the persisted value got loaded from the external Storage,
we recommend using the `onLoad()` function.

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | true      | No       |

<br/>

#### `storageKeys`

`key/name` of Storage Interfaces in which the State value will be persisted.
```ts
MY_STATE.persist(); // Stores value in default Storage
MY_STATE.persist({storageKeys: ['myCustomStorrage']}); // Stores value in 'myCustomStorrage'
```
If no specific Storage key got passed, the value will be stored in the default Storage.

| Type                       | Default            | Required |
|----------------------------|--------------------|----------|
| `Array<string \| number>`  | 'defaultStorage'   | No       |



<br/>

---

<br/>



## `GroupConfig`

The `GroupConfigInterface` is used as configuration object in the creation of `Groups`.
Here is a Typescript Interface for quick reference, 
however each property will be explained in more detail below.
```ts
export interface GroupConfigInterface {
  key?: GroupKey;
  isPlaceholder?: boolean;
}
```

<br/>

#### `key`

`key/name` of Group.
```ts {3}
App.createCollection((collection) => ({
  groups: {
    myGroup: collection.Group({key: 'jeff'})
  }
}));
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `string \| name`         | undefined | No       |

<br/>

#### `isPlaceholder`

If Group is initially a Placeholder.  
```ts {3}
App.createCollection((collection) => ({
  groups: {
    myGroup: collection.Group({isPlaceholder: true})
  }
}));
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |



<br/>

---

<br/>



## `SelectorConfig`

The `SelectorConfigInterface` is used as configuration object in the creation of `Selectors`.
Here is a Typescript Interface for quick reference, 
however each property will be explained in more detail below.
```ts
export interface SelectorConfigInterface {
  key?: SelectorKey;
  isPlaceholder?: boolean;
}
```

<br/>

#### `key`

`key/name` of Selector. 
```ts {3}
App.createCollection((collection) => ({
  selectors: {
    mySelector: collection.Group({key: 'jeff'})
  }
}));
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `string \| name`         | undefined | No       |

<br/>

#### `isPlaceholder`

If Selector is initially a Placeholder.
```ts {3}
App.createCollection((collection) => ({
  groups: {
    mySelector: collection.Group({isPlaceholder: true})
  }
}));
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |



<br/>

---

<br/>



## `CollectConfig`

The `CollectConfigInterface` is used as configuration object in functions like `collect()`.
Here is a Typescript Interface for quick reference, 
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

If the passed data object should be merged into the possible existing data object.
Therefore, it calls internally the [`patch()`](./packages/core/features/state/Methods.md#patch) method
instead of the [`set()`](./packages/core/features/state/Methods.md#set) method.
Of course, that is only useful if we collect a data object with an already existing `primaryKey` to update its value.
An alternative method to update an already existing data object is the
[`update()`](./packages/core/features/collection/Methods.md#update) method.

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |

<br/>

#### `method`

Defines in which way the collected data `primaryKey` is added to the Group/s.

##### `push`
By using `push` the `primaryKey` will be added to the end of the Group value array.
```ts {2}
MY_COLLECTION.collect({id: 1, name: "jeff"}, {method: 'push'});
MY_COLLECTION.getGroup(MY_COLLECTION.config.defaultGroupKey).value; // Returns [5, 6, 0, 1]
```

##### `unshift`
By using `unshift` the `primaryKey` will be added to the beginning of the Group value array.
```ts {2}
MY_COLLECTION.collect({id: 8, name: "jeff"}, {method: 'unshift'});
MY_COLLECTION.getGroup(MY_COLLECTION.config.defaultGroupKey).value; // Returns [8, 5, 6, 0, 1]
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `push' \| 'unshift'`     | 'push'    | No       |

<br/>

#### `forEachItem`

A callback function that is called for each collected data object.
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

If the data object/s should be collected in `background`,
so that no Component rerender which has bound the Collection to itself.
```ts {5}
  // Causes rerender on Components
  MY_COLLECTION.collect({id: 1, name: "jeff"});
  
  // Doesn't cause rerender on Components
  MY_COLLECTION.collect({id: 1, name: "jeff"}, {background: true});
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |

<br/>

#### `select`

If for each collected data object a [Selector](./packages/core/features/collection/selector/Introduction.md)
should be created. A Selector is a separate State that represents one specific [Item](./packages/core/features/collection/Introduction.md#-item) from the Collection.
```ts {1}
MY_COLLECTION.collect({id: 1, name: "jeff"}, {select: true});
MY_COLLECTION.getSelector(1); // Returns Selector at '1'
```
The Selector can be identified with the same key as the data object `primaryKey`.

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |



<br/>

---

<br/>



## `UpdateConfig`

The `UpdateConfigInterface` is used as configuration object in functions like `update()`.
Here is a Typescript Interface for quick reference,
however each property will be explained in more detail below.
```ts
export interface UpdateConfigInterface {
    patch?: boolean | { addNewProperties?: boolean };
    background?: boolean;
}
```

<br/>

#### `patch`

If the passed data object should be merged into the existing data object.
Therefore, it calls internally the [`patch()`](./packages/core/features/state/Methods.md#patch) method
instead of the [`set()`](./packages/core/features/state/Methods.md#set) method.
```ts {2}
MY_COLLECTION.collect({id: 1, name: "jeff"});
MY_COLLECTION.update(1, {name: "hans"}, {patch: true}); // Item at '1' has value '{id: 1, name: "hans"}'
MY_COLLECTION.update(1, {name: "frank"}, {patch: false}); // Item at '1' has value '{name: "frank"}'
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | true      | No       |

<br/>

#### `background`

If the data object should be updated in `background`,
so that no Component rerender which has bound the Collection to itself.
```ts {5}
  // Causes rerender on Components
MY_COLLECTION.update(1, {name: "jeff"});

// Doesn't cause rerender on Components
MY_COLLECTION.update(1, {name: "frank"}, {background: true});
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |



<br/>

---

<br/>



## `HasConfig`

The `HasConfigInterface` is used as configuration object in functions like `hasGroup()` or `hasSelector()`.
Here is a Typescript Interface for quick reference,
however each property will be explained in more detail below.
```ts
export interface HasConfigInterface {
  notExisting?: boolean;
}
```

<br/>

#### `notExisting`

If also official not existing Instances can be found, like `placeholder` Instances.
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

The `AddSideEffectConfigInterface` is used as configuration object in functions like `addSideEffect()`.
Here is a Typescript Interface for quick reference,
however each property will be explained in more detail below.
```ts
export interface AddSideEffectConfigInterface {
    weight?: number;
}
```

<br/>

#### `weight`


Determines how important the `sideEffect` is and when it will be executed.
Since some `sideEffects` has to be executed before others.
```ts {3}
MY_STATE.addSideEffect('mySideEffect', (state, config) => {
    // sideEffect callback
}, {weigth: 10});
```
The higher the `weigth` the earlier the `sideEffect` is executed.


| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `number`                 | 10        | No       |



<br/>

---

<br/>



## `GroupAddConfig`

The `GroupAddConfigInterface` is used as configuration object in functions like `put()` or `add()`.
Here is a Typescript Interface for quick reference,
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

Defines in which way the `itemKey` is added to the Group.

##### `push`
By using `push` the `itemKey` will be added to the end of the Group value array.
```ts {2}
const MY_GROUP = MY_COLLECTION.createGroup('group1', [1, 2, 5, 6]);
MY_GROUP.add(3, {method: 'push'}); // Group value is '[1, 2, 5, 6, 3]'
```

##### `unshift`
By using `unshift` the `itemKey` will be added to the beginning of the Group value array.
```ts {2}
const MY_GROUP = MY_COLLECTION.createGroup('group1', [1, 2, 5, 6]);
MY_GROUP.add(3, {method: 'unshift'}); // Group value is '[3, 1, 2, 5, 6]'
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `'unshift' \| 'push'`    | 'push'    | No       |

<br/>

#### `overwrite`

If an already added `itemKey` should be overwritten with the new one.
By overwriting an `itemKey` it simply removes the old `itemKey` and reads it depending on the `method`.
```ts
const MY_GROUP = MY_COLLECTION.createGroup('group1', [1, 2, 5, 6]);
MY_GROUP.add(2, {overwrite: true}); // Group value is '[1, 5, 6, 2]'
MY_GROUP.add(5); // Group value is '[1, 5, 6, 2]'
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |

<br/>

#### `background`

If the `itemKey` should be added in `background`,
so that no Component rerender which has bound the Group to itself.
```ts {5}
// Causes rerender on Components
MY_GROUP.add(1);

// Doesn't cause rerender on Components
MY_GROUP.add(1, {background: true});
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |



<br/>

---

<br/>



## `UpdateItemKeyConfig`

The `UpdateItemKeyConfigInterface` is used as configuration object in functions like `updateItemKey()`.
Here is a Typescript Interface for quick reference,
however each property will be explained in more detail below.
```ts
export interface UpdateItemKeyConfigInterface {
    background?: boolean;
}
```

<br/>

#### `background`

If the `itemKey` should be updated in `background`,
so that no Component rerender which has bound the Collection and the Item to itself.
```ts {5}
// Causes rerender on Components
MY_COLLECTION.updateItemKey([1, 3]);

// Doesn't cause rerender on Components
MY_COLLECTION.updateItemKey([1, 3], {background: true});
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |



<br/>

---

<br/>



## `GroupRemoveConfig`

The `GroupRemoveConfigInterface` is used as configuration object in functions like `remove()`.
Here is a Typescript Interface for quick reference,
however each property will be explained in more detail below.
```ts
export interface GroupRemoveConfigInterface {
    background?: boolean;
}
```

<br/>

#### `background`

If the `itemKey` should be removed in `background`,
so that no Component rerender which has bound the Group to itself.
```ts {5}
// Causes rerender on Components
MY_GROUP.remove(1);

// Doesn't cause rerender on Components
MY_GROUP.remove(1, {background: true});
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |
