---
id: interfaces
title: Interfaces
sidebar_label: Interfaces
slug: /interfaces
---

:::info

**This Section might be useless to you without any context.**
As the name suggests, it's all about typescript interfaces of AgileTs.
These interfaces are outsourced for a better overview, maintainability, and reusability.
You might get redirected to parts of the Interface Section from other documentation to learn more about specific Interfaces.

:::

## `CreateLoggerConfig`

The `CreateLoggerConfigInterface` is used in the creation and configuration of the [Agile `Logger Class`](./packages/core/features/agile-instance/Properties.md#logger).
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
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
```ts {2}
const logger = new Logger({
    prefix: "MyLog"
});

logger.debug("Jeff"); // Logs 'MyLog Debug: Jeff'
```
The log messages of AgileTs have the default prefix "Agile".

| Type               | Default   | Required |
|--------------------|-----------|----------|
| `string`           | "Agile"   | No       |

<br/>

#### `level`

The `log level` controls which kind of log messages are allowed to be logged.
Therefore, it is used to filter log messages to only see these relevant to us.
For example, we won't often set the `log level` to `debug`
since debug messages flood the console and are, in most cases, not relevant for us.
```ts {2}
const logger = new Logger({
    level: Logger.level.WARN
});

logger.debug("Jeff"); // Doesn't get logged
logger.warn("A important Warning"); // Gets logged
```
The `Logger Class` supports some hard-coded log levels, which can be set dynamically.
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
For example, suppose we set the logger level to `INFO`. In that case,
each log category at a higher or same level is printed to the console.
In the case of `INFO`, that would be `SUCCESS`, `WARN`, `ERROR` and of course `INFO`.

| Type               | Default   | Required |
|--------------------|-----------|----------|
| `number`           | 20        | No       |

<br/>

#### `active`

Determines whether the logger is `active` and is allowed to print messages to the console.
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

If `true`, a timestamp is added before each log message.
This timestamp represents the time the message was logged.
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

Sometimes logging can be very confusing and overwhelming if the console is flooded with logs that don't matter at the time.
Therefore, `tags` got created which filter logs specifically by tags.
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
Any log message with defined tags will only be logged if all its tags are allowed in the `Logger Class`.
Logs that have no condition/tag are always logged.

| Type               | Default                                                   | Required |
|--------------------|-----------------------------------------------------------|----------|
| `string[]`         | ['runtime', 'storage', 'subscription', 'multieditor']     | No       |

<br/>

#### `canUseCustomStyles`

Whether we can apply custom `css` styles to the log messages.

![Log Custom Styles Example](../static/img/docs/logger_example.png)

For example, AgileTs Logs are by default purple.

| Type               | Default   | Required |
|--------------------|-----------|----------|
| `boolean`          | true      | No       |



<br/>

---

<br/>



## `StateIngestConfig`

The `StateIngestConfigInterface` is used as configuration object in functions like [`set()`](./packages/core/features/state/Methods.md#set) or [`undo()`](./packages/core/features/state/Methods.md#undo).
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface StateIngestConfigInterface
        extends StateRuntimeJobConfigInterface,
                IngestConfigInterface {
   key?: RuntimeJobKey;
}
```
**Note:** The `StateIngestConfigInterface` extends some other Interfaces:
- [StateRuntimeJobConfigInterface](#stateruntimejobconfig)
- [IngestConfigInterface](#ingestconfiginterface)

<br/>

#### `key`

The `key/name` of the Job that is created and ingested into the `runtime`.
```ts
MY_STATE.set('hello there', {key: 'jeff'});
```
Such key can be very useful during debug sessions
in order to analyse when which Job ran through the `runtime`.
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

The `StateRuntimeJobConfigInterface` is used as configuration object in functions like [`replace()`](./packages/core/features/collection/group/Methods.md#replace) or [`select()`](./packages/core/features/collection/selector/Methods.md#select).
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface StateRuntimeJobConfigInterface
  extends RuntimeJobConfigInterface {
  overwrite?: boolean;
  storage?: boolean;
}
```
**Note:** The `StateRuntimeJobConfigInterface` extends some other Interfaces:
- [RuntimeJobConfigInterface](#runtimejobconfiginterface)

<br/>

#### `overwrite`

If `true`, the whole State is overwritten with the newly assigned `value`.
```ts {1}
MY_STATE.set("finalValue", {overwrite: true});
MY_STATE.value; // Returns 'finalValue'
MY_STATE.previousStateValue; // Returns 'finalValue'
MY_STATE.initialStateValue; // Returns 'finalValue'
```
During the overwrite process, the following properties are overwritten:
- `value`
- `previousStateValue`
- `initalStateValue`
- `isPlaceholder`

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |

<br/>

#### `storage`

Whether to apply the State value changes to the corresponding external [Storage/s](./packages/core/features/storage/Introduction.md).
```ts {1}
const MY_STATE = App.creacteState('jeff').persist('storageKey');
// Storage at 'storageKey': 'jeff'
MY_STATE.set("hans", {storage: true});
// Storage at 'storageKey': 'hans'
MY_STATE.set("dieter", {storage: false});
// Storage at 'storageKey': 'hans'
```
Be aware that this is only relevant, if the State is [persisted](./packages/core/features/state/Methods.md#persist).
We can use the `isPersisted` property to check whether a state is persisted.
```ts
MY_STATE.isPersisted;
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | true      | No       |



<br/>

---

<br/>



## `RuntimeJobConfigInterface`

The `RuntimeJobConfigInterface` is used in the creation and configuration of a `Runtime Job`.
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface RuntimeJobConfigInterface {
  background?: boolean;
  sideEffects?: SideEffectConfigInterface;
  force?: boolean;
  numberOfTriesToUpdate?: number | null;
}
```

<br/>

#### `background`

When `true`, the Job is executed in the `background`
and won't cause any rerender on Components that have subscribed the [Agile Sub Instance](./main/Introduction.md#agile-sub-instance)
represented by the Job.
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

Specifies whether the side effects of the Job should be executed.
```ts {5}
// Executes sideEffects
MY_STATE.set("myNewValue2");
  
// Doesn't execute sideEffects
MY_STATE.set("myNewValue3", {sideEffects: false});
```
During a side effect, several essential tasks are done.
These include, for example, _rebuilding the Group output_ of a Group
or _updating the persisted State value in the corresponding external Storage_.

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | true      | No       |

<br/>

#### `force`

When set to `true`, the Job is forced through the `runtime` no matter what happens.
```ts {7}
const MY_STATE = App.createState('myValue');

// Won't be executed by the runtime because the State value hasn't changed
MY_STATE.set('myValue');
  
// Will be executed by the runtime, although the State value hasn't changed
MY_STATE.set('myValue', { force: true });
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |

#### `numberOfTriesToUpdate`

How often the runtime should try to update not ready SubscriptionContainers of the Job.
If the update tries count exceeds the `numberOfTriesToUpdate` count,
the Job will be entirely removed from the runtime.
This has the advantage that an overflow of the runtime is avoided.
If `numberOfTriesToUpdate` is `null` the runtime tries to update the not ready Job subscriptionContainers
until they are ready.

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `number \| null`         | 3         | No       |



<br/>

---

<br/>



## `IngestConfigInterface`

The `IngestConfigInterface` is used as a configuration object to configure the ingest process of `Jobs` into the `runtime`.
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface IngestConfigInterface {
  perform?: boolean;
}
```

<br/>

#### `perform`

Whether the ingested Job should be executed immediately by the `runtime`
or should first be inserted into a `queue` and performed when it is its turn.

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | true      | No       |



<br/>

---

<br/>



## `PatchConfig`

The `PatchConfigInterface` is used as configuration object in functions like [`patch()`](./packages/core/features/state/Methods.md#persist).
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface PatchConfigInterface extends StateIngestConfigInterface {
  addNewProperties?: boolean;
}
```
**Note:** The `PatchConfigInterface` extends some other Interfaces:
- [StateIngestConfigInterface](#stateingestconfig)

<br/>

#### `addNewProperties`

If `true`, new properties are added to the State value, although they might not yet be present there.
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

The `StatePersistentConfigInterface` is used as configuration object in functions like [`persist()`](./packages/core/features/state/Methods.md#persist).
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface StatePersistentConfigInterface {
   loadValue?: boolean;
   storageKeys?: StorageKey[];
}
```

<br/>

#### `loadValue`

When `true`, the created `Persistent` automatically loads the value stored in the corresponding external Storage into the State.
Or, if the State isn't persisted yet, it stores the State value in the corresponding external Storage.
Be aware that if we don't allow the `Persistent` to load/store the value, we have to do it ourselves.
```ts {2}
myState.persist({
   instantiate: false,
});

if (myState.persistent?.ready) {
   await myState.persistent?.initialLoading();
    myState.isPersisted = true;
}
```
Loading the value manually has one advantage.
It allows us to await the asynchronous load/store process.
If you only need to await the loading process we recommend using the [`onLoad()`](./packages/core/features/state/Methods.md#onload) method.

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | true      | No       |

<br/>

#### `storageKeys`

Specifies the [Storage/s](./packages/core/features/storage/Introduction.md) the State value should be persisted in.
```ts
MY_STATE.persist(); // Stores value in default Storage
MY_STATE.persist({storageKeys: ['myCustomStorrage']}); // Stores value in 'myCustomStorrage'
```
If no specific Storage defined, the State value will be stored/persisted in the [default Storage](./packages/core/features/storage/PersistingData.md#-default-storage).

| Type                       | Default            | Required |
|----------------------------|--------------------|----------|
| `Array<string \| number>`  | 'defaultStorage'   | No       |



<br/>

---

<br/>



## `GroupConfig`

The `GroupConfigInterface` is used in the creation and configuration of the [`Group Class`](./packages/core/features/collection/group/Introduction.md).
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface GroupConfigInterface {
  key?: GroupKey;
  isPlaceholder?: boolean;
}
```

<br/>

#### `key`

The optional property `key/name` should be a unique `string/number` to identify the Group later.
```ts
MY_COLLECTION.createGroup([1, 2, 3], {
    key: "myKey"
});
```
We recommend giving each Group a unique `key` since it has only advantages:
- helps us during debug sessions
- makes it easier to identify the Group
- no need for separate persist Key

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `string \| name`         | undefined | No       |

<br/>

#### `isPlaceholder`

Defines whether the Group is a `placeholder`.
```ts
const MY_GROUP = App.createGroup([1, 2, 3], {
    isPlaceholder: true
});

MY_GROUP.exists(); // false
```
Groups are `placeholder` when AgileTs needs to hold a reference to them,
even though they aren't instantiated yet.
This can be the case if we use the `getGroupWithReference()` method,
which returns a `placeholder` Group if the Group we are looking for doesn't exist yet.
```ts
const myGroup = useAgile(MY_COLLECTION.getGroupWithReference("group1")); // Causes rerender if Group got created
const myGroup2 = useAgile(MY_COLLECTION.getGroup("group2")); // Doesn't causes rerender if Group got created
```
This reference is essential to rerender the Component,
whenever the Group got instantiated.

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |



<br/>

---

<br/>



## `SelectorConfig`

The `SelectorConfigInterface` is used in the creation and configuration of the [`Selector Class`](./packages/core/features/collection/selector/Introduction.md).
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface SelectorConfigInterface {
  key?: SelectorKey;
  isPlaceholder?: boolean;
}
```

<br/>

#### `key`

The optional property `key/name` should be a unique `string/number` to identify the Selector later.
```ts
MY_COLLECTION.createSelector(1, {
    key: "myKey"
});
```
We recommend giving each Selector a unique `key` since it has only advantages:
- helps us during debug sessions
- makes it easier to identify the Selector
- no need for separate persist Key

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `string \| name`         | undefined | No       |

<br/>

#### `isPlaceholder`

Defines whether the Selector is a `placeholder`.
```ts
const MY_SELECTOR = App.creaateSelector(1, {
    isPlaceholder: true
});

MY_SELECTOR.exists(); // false
```
Selectors are `placeholder` when AgileTs needs to hold a reference to them,
even though they aren't instantiated yet.
This can be the case if we use the `getSelectorWithReference()` method,
which returns a `placeholder` Selector if the Selector we are looking for doesn't exist yet.
```ts
const mySeleector = useAgile(MY_COLLECTION.getSelectorWithReference("selector1")); // Causes rerender if Selector got created
const mySeleector2 = useAgile(MY_COLLECTION.getSelector("selector2")); // Doesn't causes rerender if Selector got created
```
This reference is essential to rerender the Component,
whenever the Selector got instantiated.

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |



<br/>

---

<br/>



## `CollectConfig`

The `CollectConfigInterface` is used as configuration object in functions like [`collect()`](./packages/core/features/collection/Methods.md#collect).
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
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

:::info

The `patch` property is only relevant to us
if we collect a data object with an already existing `primaryKey` in order to update the Item data at that `primaryKey`.

:::

If `true`, the passed data object is merged into the found Item data instead of overwriting it entirely.
```ts {6,9}
const MY_COLLECTION = App.createCollection({
    initialData: [{id: 1, name: 'frank', age: 10}]
});

MY_COLLECTION.collect({id: 1, name: 'hans'}, [], {patch: true});
MY_COLLECTION.getItemValue(1); // Returns '{id: 1, name: 'hans', age: 10}'

MY_COLLECTION.collect({id: 1, name: 'jeff'}, [], {patch: false});
MY_COLLECTION.getItemValue(1); // Returns '{id: 1, name: 'frank'}'
```
An alternative to this way of updating already existing Item data is the [`update()`](./packages/core/features/collection/Methods.md#update) method.

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |

<br/>

#### `method`

Specifies the way of adding the collected data `primaryKey/s` to the defined Group/s.

##### `push`
The `primaryKey` is added to the **end** of the Group value array.
```ts {2}
MY_COLLECTION.collect({id: 1, name: "jeff"}, [], {method: 'push'});
MY_COLLECTION.getGroup(MY_COLLECTION.config.defaultGroupKey).value; // Returns [5, 6, 0, 1]
```

##### `unshift`
The `primaryKey` is added to the **beginning** of the Group value array.
```ts {2}
MY_COLLECTION.collect({id: 8, name: "jeff"}, [], {method: 'unshift'});
MY_COLLECTION.getGroup(MY_COLLECTION.config.defaultGroupKey).value; // Returns [8, 5, 6, 0, 1]
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `push' \| 'unshift'`     | 'push'    | No       |

<br/>

#### `forEachItem`

Callback that is called for each collected data object.
```ts {4-9}
MY_COLLECTION.collect([
    {id: 1, name: "jeff"}, 
    {id: 8, name: "frank"}], 
    [],
    {forEachItem: (data, key, index) => {
         // Is called with 'data: {id: 1, name: "jeff"}, key: 1, index: 0'
         // and   
         // Is called with 'data: {id: 2, name: "frank"}, key: 8, index: 1'
      }
    });
```

| Type                                                        | Default   | Required |
|-------------------------------------------------------------|-----------|----------|
| `(data: DataType, key: ItemKey, index: number) => void`     | undefined | No       |

<br/>

#### `background`

When `true`, the data object/s are collected in `background`
and won't cause any rerender on Components that have subscribed the Collection.
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

If `true`, a [Selector](./packages/core/features/collection/selector/Introduction.md) is created for each collected data object.
```ts {1}
MY_COLLECTION.collect({id: 1, name: "jeff"}, {select: true});
MY_COLLECTION.getSelector(1); // Returns Selector at '1'
```
These created Selectors can be identified with the same key used as `primaryKey` in the collected data object.

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |



<br/>

---

<br/>



## `UpdateConfig`

The `UpdateConfigInterface` is used as configuration object in functions like [`update()`](./packages/core/features/collection/Methods.md#update).
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface UpdateConfigInterface {
    patch?: boolean | { addNewProperties?: boolean };
    background?: boolean;
}
```

<br/>

#### `patch`

If `false`, the passed data object overwrites the entire found Item data instead of merging it into the Item data.
```ts {2, 4}
MY_COLLECTION.collect({id: 1, name: "jeff"});
MY_COLLECTION.update(1, {name: "hans"}, {patch: true}); 
MY_COLLECTION.getItemValue(1); // Returns '{id: 1, name: "hans"}'
MY_COLLECTION.update(1, {name: "frank"}, {patch: false}); 
MY_COLLECTION.getItemValue(1); // Returns '{name: "frank"}'
```
Keep in mind that if we decide to overwrite the entire Item data object,
we have to redefine the `primaryKey` in the given data object.
Otherwise, the `primary Key` gets missing, which can lead to problems.

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | true      | No       |

<br/>

#### `background`

When `true`, the Item data object is updated in `background`
and won't cause any rerender on Components that have subscribed the Item or Collection.
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

The `HasConfigInterface` is used as configuration object in functions like [`hasGroup()`](./packages/core/features/collection/Methods.md#hasgroup) or [`hasSelector()`](./packages/core/features/collection/Methods.md#hasselector).
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface HasConfigInterface {
  notExisting?: boolean;
}
```

<br/>

#### `notExisting`

When `true`, also not officially existing Instances (like `placeholder`) can be found.
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

The `AddSideEffectConfigInterface` is used as configuration object in functions like [`addSideEffect()`](./packages/core/features/state/Methods.md#addsideeffect).
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface AddSideEffectConfigInterface {
    weight?: number;
}
```

<br/>

#### `weight`

Defines the `weight` of the `sideEffect`
and thus when it is executed.
```ts {3}
MY_STATE.addSideEffect('mySideEffect', (state, config) => {
    // sideEffect callback
}, {weigth: 10});
```
The higher the `weight`, the earlier the `sideEffect` is performed.


| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `number`                 | 10        | No       |



<br/>

---

<br/>



## `GroupAddConfig`

The `GroupAddConfigInterface` is used as configuration object in functions like [`put()`](./packages/core/features/collection/Methods.md#put) or [`add()`](./packages/core/features/collection/group/Methods.md#add).
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface GroupAddConfig extends StateIngestConfigInterface {
    method?: 'unshift' | 'push';
    overwrite?: boolean;
}
```
**Note:** The `GroupAddConfig` extends some other Interfaces:
- [StateIngestConfigInterface](#stateingestconfig)


<br/>

#### `method`

Specifies the way of adding the collected data `primaryKey/s` to the defined Group/s.

##### `push`
The `primaryKey` is added to the **end** of the Group value array.
```ts {2}
MY_COLLECTION.collect({id: 1, name: "jeff"}, [], {method: 'push'});
MY_COLLECTION.getGroup(MY_COLLECTION.config.defaultGroupKey).value; // Returns [5, 6, 0, 1]
```

##### `unshift`
The `primaryKey` is added to the **beginning** of the Group value array.
```ts {2}
MY_COLLECTION.collect({id: 8, name: "jeff"}, [], {method: 'unshift'});
MY_COLLECTION.getGroup(MY_COLLECTION.config.defaultGroupKey).value; // Returns [8, 5, 6, 0, 1]
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `push' \| 'unshift'`     | 'push'    | No       |

<br/>

#### `overwrite`

If `true`, the position of the already existing `itemKey`
gets overwritten with the new position of the newly added same `itemKey`.
```ts
const MY_GROUP = MY_COLLECTION.createGroup('group1', [1, 2, 5, 6]);
MY_GROUP.add(2, {overwrite: true}); // Group value is '[1, 5, 6, 2]'
MY_GROUP.add(5); // Group value is '[1, 5, 6, 2]'
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |



<br/>

---

<br/>



## `UpdateItemKeyConfig`

The `UpdateItemKeyConfigInterface` is used as configuration object in functions like [`updateItemKey()`](./packages/core/features/collection/Methods.md#updateitemkey).
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface UpdateItemKeyConfigInterface {
    background?: boolean;
}
```

<br/>

#### `background`

When `true`, the `itemKey` is updated in `background`
and won't cause any rerender on Components that have subscribed the Item or Collection.
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



## `ComputeConfig`

The `ComputeConfigInterface` is used as configuration object in functions like [`compute()`](./packages/core/features/computed/Methods.md#compute).
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface ComputeConfigInterface {
    autodetect?: boolean;
}
```

<br/>

#### `autodetect`

Tells the `Computed Class` to automatically detect the dependencies ([Agile Sub Instances](./main/Introduction.md#agile-sub-instance) used in the `computeFunction()`.
```ts {2,4}
MY_COMPUTED.computeFunction = () => MY_NAME.value + MY_AGE.value;
MY_COMPUTED.recompute({autodetect: false});
MY_COMPUTED.deps; // Returns '[]'
MY_COMPUTED.recompute({autodetect: true});
MY_COMPUTED.deps; // Returns '[Obserrver(MY_NAME), Observer(MY_AGE)]'
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | true      | No       |



<br/>

---

<br/>



## `RecomputeConfig`

The `RecomputeConfigInterface` is used as configuration object in functions like [`recompute()`](./packages/core/features/computed/Methods.md#recompute).
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface RecomputeConfigInterface
    extends StateIngestConfigInterface,
        ComputeConfigInterface {}
```
**Note:** The `RecomputeConfig` extends some other Interfaces:
- [StateIngestConfigInterface](#stateingestconfig)
- [ComputeConfigInterface](#computeconfig)



<br/>

---

<br/>



## `UpdateComputeFunctionConfig`

The `UpdateComputeFunctionConfigInterface` is used as configuration object in functions like [`updateComputeFunction()`](./packages/core/features/computed/Methods.md#updatecomputefunction).
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface UpdateComputeFunctionConfigInterface
    extends RecomputeConfigInterface {
    overwriteDeps?: boolean;
}
```
**Note:** The `RecomputeConfig` extends some other Interfaces:
- [RecomputeConfigInterface](#recomputeconfig)

<br/>

#### `overwriteDeps`

Whether the newly defined hard-coded dependencies are merged into the existing ones or overwrite them entirely.
```ts {2,4}
MY_COMPUTED.deps; // // Returns '[Obserrver(MY_NAME), Observer(MY_AGE)]'
MY_COMPUTED.updateComputeFunction(() => {}, [MY_LOCATION], {overwriteDeps: false});
MY_COMPUTED.deps; // // Returns '[Obserrver(MY_NAME), Observer(MY_AGE), Observer(MY_LOCATION)]'
MY_COMPUTED.updateComputeFunction(() => {}, [MY_LOCATION], {overwriteDeps: true});
MY_COMPUTED.deps; // // Returns '[Observer(MY_LOCATION)]'
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | true      | No       |



<br/>

---

<br/>



## `AgileHookConfigInterface`

The `AgileHookConfigInterface` is used as configuration object in functions like [`useAgile()`](./packages/react/features/Hooks.md#useagile).
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
interface AgileHookConfigInterface {
  key?: SubscriptionContainerKeyType;
  agileInstance?: Agile;
  proxyBased?: boolean;
}
```

<br/>

#### `key`

The `key/name` of the [SubscriptionContainer](./packages/core/features/integration/Introduction.md#-subscriptions) that is created and added to the Observers.
```ts
useAgile(MY_STATE, {key: 'jeff'});
```
Such key can be very useful during debug sessions
in order to analyse when which SubscriptionContainer triggered a rerender on a Component.
```ts
// Agile Debug: Registered Callback/Component based Subscription 'jeff', SubscriptionContainer('jeff')
// Agile Debug: Updated/Rerendered Subscriptions, [SubscriptionContainer('jeff'), ..]
// Agile Debug: Unregistered Callback/Component based Subscription 'jeff', SubscriptionContainer('jeff')
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `string \| number`       | undefined | No       |

<br/>

#### `agileInstance`

The [Agile Instance](./packages/core/features/agile-instance/Introduction.md) to which the created [SubscriptionContainer](./packages/core/features/integration/Introduction.md#-subscriptions) belongs to.
However, since each Observer has an instance to the Agile Instance, `useAgile()` can automatically derive the Agile Instance from that.

| Type                                                                            | Default   | Required |
|---------------------------------------------------------------------------------|-----------|----------|
| [Agile Instance](./packages/core/features/agile-instance/Introduction.md)       | undefined | No       |

<br/>

#### `proxyBased`

If the `useAgile()` hook should wrap a [Proxy()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) around its return value/s.
Through this Proxy, AgileTs is able to track accessed properties of the returned object/s
and can construct a path to these.
The paths allow AgileTs to rerender the Component more efficiently
by only causing a rerender when an actual accessed property value mutates.
Normally, the Component is always rerendered on a State change,
regardless of whether the changed property value is accessed in the Component.
This is totally fine if the value is primitive or the whole object is displayed.
However, as soon as we display only a tiny part of the bound State value object,
the proxy feature can reduce the rerender count.
```ts
const MY_STATE = App.createState({name: 'frank', age: 10})

// -- MyComponent.js ----------------------------------------

// Bind State to 'MyComponent.js'
const myState = useAgile(MY_STATE, {proxyBased: true});

return <p>{myState.name}</p>

// -- core.js  ----------------------------------------------

// Causes rerender on 'MyComponent.js', 
// since the '.name' property got accessed
MY_STATE.patch({name: 'jeff'});

// Doesn't cause rerender on 'MyComponent.js', 
// since the '.age' property didn't got accessed
MY_STATE.patch({age: 20});
```
To avoid having to set the `proxyBased` configuration to `true` every time we use the proxy functionality,
we can use the [`useProxy()`](./packages/react/features/Hooks.md#useproxy) hook which does that part for us.
```ts
useProxy(MY_STATE);
// equal to
useAgile(MY_STATE, {proxyBased: true});
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `string \| number`       | undefined | No       |



<br/>

---

<br/>



## `ProxyHookConfigInterface`

The `ProxyHookConfigInterface` is used as configuration object in functions like [`useProxy()`](./packages/react/features/Hooks.md#useproxy).
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
interface ProxyHookConfigInterface {
    key?: SubscriptionContainerKeyType;
    agileInstance?: Agile;
}
```

<br/>

#### `key`

The `key/name` of the [SubscriptionContainer](./packages/core/features/integration/Introduction.md#-subscriptions) that is created and added to the Observers.
```ts
useProxy(MY_STATE, {key: 'jeff'});
```
Such key can be very useful during debug sessions
in order to analyse when which SubscriptionContainer triggered a rerender on a Component.
```ts
// Agile Debug: Registered Callback/Component based Subscription 'jeff', SubscriptionContainer('jeff')
// Agile Debug: Updated/Rerendered Subscriptions, [SubscriptionContainer('jeff'), ..]
// Agile Debug: Unregistered Callback/Component based Subscription 'jeff', SubscriptionContainer('jeff')
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `string \| number`       | undefined | No       |

<br/>

#### `agileInstance`

The [Agile Instance](./packages/core/features/agile-instance/Introduction.md) to which the created [SubscriptionContainer](./packages/core/features/integration/Introduction.md#-subscriptions) belongs to.
However, since each Observer has an instance to the Agile Instance, `useProxy()` can automatically derive the Agile Instance from that.

| Type                                                                            | Default   | Required |
|---------------------------------------------------------------------------------|-----------|----------|
| [Agile Instance](./packages/core/features/agile-instance/Introduction.md)       | undefined | No       |
