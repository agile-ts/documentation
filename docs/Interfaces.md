---
id: interfaces
title: Interfaces
sidebar_label: Interfaces
slug: /interfaces
---

:::info

**This Section might be useless to you without any context.**
As the name suggests, it's all about typescript interfaces of AgileTs.
These interfaces are outsourced for a better overview, maintainability and reusability.
You might get redirected to parts of the Interface Section from other Documentation Sections,
to learn some more about specific properties of an interface.

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

Prefix which is added before each log message.
```ts {2}
const logger = new Logger({
    prefix: "MyLog"
});

logger.debug("Jeff"); // Logs 'MyLog Debug: Jeff'
```
The log messages of AgileTs have the prefix "Agile" by default.

| Type               | Default   | Required |
|--------------------|-----------|----------|
| `string`           | "Agile"   | No       |

<br/>

#### `level`

The `log level` controls which kind of log messages are allowed to be logged by the `Logger Class`.
Therefore, it is used to filter log messages, so that we only see the logs which are relevant for us.
For example, you won't often set the `log level` to `debug`,
since debug messages get annoying if we aren't analysing anything specific in AgileTs core.
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
For example, if we set the logger level to `INFO`, 
each log category with a higher or same level will be printed to the console.
In case of `INFO` that would be `SUCCESS`, `WARN`, `ERROR` and of course `INFO`.

| Type               | Default   | Required |
|--------------------|-----------|----------|
| `number`           | 20        | No       |

<br/>

#### `active`

Determines whether the logger is allowed to print something to the console.
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
and overwhelming if the console is flooded with logs that doesn't matter at the time.
Therefore, tags are created that filter logs specifically by tags.
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
Any log message with specific tags will only be logged if all its tags are active in the `Logger Class`.
Logs that have no condition/tag are always logged.

| Type               | Default                                                   | Required |
|--------------------|-----------------------------------------------------------|----------|
| `string[]`         | ['runtime', 'storage', 'subscription', 'multieditor']     | No       |

<br/>

#### `canUseCustomStyles`

If we can apply custom `css` styles to the log messages.

![Log Custom Styles Example](../static/img/docs/logger_example.png)

For example AgileTs Logs are by default purple.

| Type               | Default   | Required |
|--------------------|-----------|----------|
| `boolean`          | true      | No       |



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
**Note:** The `StateIngestConfigInterface` extends some other Interfaces:
- [StateRuntimeJobConfigInterface](#stateruntimejobconfig)
- [IngestConfigInterface](#ingestconfiginterface)

<br/>

#### `key`

The `key/name` of the Job which will be created and ingested into the `runtime`.
```ts
MY_STATE.set('hello there', {key: 'jeff'});
```
Might be pretty useful during debug sessions
in order to analyse when which change ran through the `runtime`. 
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
Following properties will be overwritten:
- `value`
- `previousStateValue`
- `initalStateValue`
- `isPlaceholder`

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |

<br/>

#### `storage`

Whether to apply the State value change to external Storages.
```ts {1}
const MY_STATE = App.creacteState('jeff').persist('storageKey');
// Storage at 'storageKey': 'jeff'
MY_STATE.set("hans", {storage: true});
// Storage at 'storageKey': 'hans'
MY_STATE.set("dieter", {storage: false});
// Storage at 'storageKey': 'hans'
```
Be aware that this is only relevant, if the State got [persisted](./packages/core/features/state/Introduction.md).

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

If the Job should be executed in `background`.
So that no Component is rerendered that has the [Agile Sub Instance](./main/Introduction.md#agile-sub-instance) represented by the Job bound to itself.
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

Whether the side effects of the Job should be executed.
```ts {5}
// Executes sideEffects
MY_STATE.set("myNewValue2");
  
// Doesn't execute sideEffects
MY_STATE.set("myNewValue3", {sideEffects: false});
```
Several things are done in side effects.
These include for example _rebuilding the Group output_
or _updating the State value the corresponding external Storage_.

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | true      | No       |

<br/>

#### `force`

If the Job should be ingested and forced through the `runtime` no matter what happens.
```ts {7}
const MY_STATE = App.createState('myValue');

// Won't be ingested into the runtime, because the State value hasn't changed
MY_STATE.set('myValue');
  
// Will be ingested into the runtime, although the State value hasn't changed
MY_STATE.set('myValue', { force: true });
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |



<br/>

---

<br/>



## `IngestConfigInterface`

The `IngestConfigInterface` is used as configuration object to ingest `Observers` into the `runtime`.
Here is a Typescript Interface for quick reference, 
however each property will be explained in more detail below.
```ts
export interface IngestConfigInterface {
  perform?: boolean;
}
```

<br/>

#### `perform`

Whether the newly created Job should be executed immediately from the `runtime'.
Otherwise, it will be added to a queue and executed when it is its turn.

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

Determines whether new properties should be added to the new State value that aren't already present in the current value object.
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
   loadValue?: boolean;
   storageKeys?: StorageKey[];
}
```

<br/>

#### `loadValue`

If the created `Persistent` should automatically load the value stored in an external Storage into the State.
Be aware that if we don't allow the `Persistent` to load the value, we have to do it ourselves.
```ts {2}
myState.persist({
   instantiate: false,
});

if (myState.persistent?.ready) {
   await myState.persistent?.initialLoading();
    myState.isPersisted = true;
}
```
However, this procedure has one advantage.
It allows us to await the asynchronous persist process.

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | true      | No       |

<br/>

#### `storageKeys`

`Key/Name` of the [Storage/s](./packages/core/features/storage/Introduction.md) in which the State value should be persisted.
```ts
MY_STATE.persist(); // Stores value in default Storage
MY_STATE.persist({storageKeys: ['myCustomStorrage']}); // Stores value in 'myCustomStorrage'
```
If no specific Storage has been defined, the State value will be persisted into the [default Storage](./packages/core/features/storage/PersistingData.md#-default-storage).

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
Groups are, for example, `placeholder` when AgileTs needs to hold a reference to them,
even though they aren't instantiated yet.
This may be the case if we use the `getGroupWithReference()` method,
which returns a `placeholder` Group, if the Group doesn't exist, to hold a reference.
```ts
const myGroup = useAgile(MY_COLLECTION.getGroupWithReference("group1")); // Causes rerender if Group got created
const myGroup2 = useAgile(MY_COLLECTION.getGroup("group2")); // Doesn't Causes rerender if Group got created
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
Selectors are, for example, `placeholder` when AgileTs needs to hold a reference to them,
even though they aren't instantiated yet.
This may be the case if we use the `getSelectorWithReference()` method,
which returns a `placeholder` Selector, if the Selector doesn't exist, to hold a reference.
```ts
const mySeleector = useAgile(MY_COLLECTION.getSelectorWithReference("selector1")); // Causes rerender if Selector got created
const mySeleector2 = useAgile(MY_COLLECTION.getSelector("selector2")); // Doesn't Causes rerender if Selector got created
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

The `patch` property is only relevant 
if we collect a data object with an already existing `primaryKey` in order to update the old one.
Then the `patch` property has an impact 
and determines if the data object is merged into the existing data object or overwrites it entirely.
An alternative to this way of updating an already existing Item is the [`update()`](./packages/core/features/collection/Methods.md#update) method.

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
export interface GroupAddConfig extends StateIngestConfigInterface {
    method?: 'unshift' | 'push';
    overwrite?: boolean;
}
```
The `GroupAddConfig` extends some other Interfaces:
- [StateIngestConfigInterface](#stateingestconfig)


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



## `ComputeConfig`

The `RecomputeConfigInterface` is used as configuration object in functions like `compute()`.
Here is a Typescript Interface for quick reference,
however each property will be explained in more detail below.
```ts
export interface ComputeConfigInterface {
    autodetect?: boolean;
}
```

<br/>

#### `autodetect`

If the Computed should autodetect dependencies used in the `computeFunction`.
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

The `RecomputeConfigInterface` is used as configuration object in functions like `recompute()`.
Here is a Typescript Interface for quick reference,
however each property will be explained in more detail below.
```ts
export interface RecomputeConfigInterface
    extends StateIngestConfigInterface,
        ComputeConfigInterface {}
```
The `RecomputeConfig` extends some other Interfaces:
- [StateIngestConfigInterface](#stateingestconfig)
- [ComputeConfigInterface](#computeconfig)



<br/>

---

<br/>



## `UpdateComputeFunctionConfig`

The `UpdateComputeFunctionConfigInterface` is used as configuration object in functions like `updateComputeFunction()`.
Here is a Typescript Interface for quick reference,
however each property will be explained in more detail below.
```ts
export interface UpdateComputeFunctionConfigInterface
    extends RecomputeConfigInterface {
    overwriteDeps?: boolean;
}
```
The `RecomputeConfig` extends some other Interfaces:
- [RecomputeConfigInterface](#recomputeconfig)

<br/>

#### `overwriteDeps`

If the new hard coded dependencies should entirely overwrite the old hard coded dependencies or get merged into them.
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

