---
id: methods
title: Methods
sidebar_label: Methods
slug: /core/state/methods
---

:::info

Here are useful methods of the `State Class` listed.

:::

## `setKey()`

Assigns a new Key/Name to our State.
```ts {1}
MY_STATE.setKey("newKey");
MY_STATE.key; // Returns 'newKey'
```

### ❓ Why a Key
We recommended giving each State an unique Key. 
I promise you, it has only advantages. 
- helps us during debug sessions
- makes it easier to identify a State
- no need for separate persist Key

### 📭 Props

| Prop           | Type                             | Default    | Description                                           | Required |
|----------------|----------------------------------|------------|-------------------------------------------------------|----------|
| `value`        | string \| number \| undefined    | undefined  | New Key/Name of State                                 | Yes      |

### 📄 Return
Returns the [State](./Introduction.md) it was called on.



<br />

---

<br />



## `set()`

Allows us to mutate the current `value` of our State.
```ts {1}
MY_STATE.set("myNewValue");
MY_STATE.value; // Returns 'myNewValue'
```
Under the hood it ingests the State into the `runtime`,
which applies our new defined Value to the State and ensures that each Component 
which has bound the State to itself rerender.

### 📭 Props

| Prop           | Type                                                                                | Default    | Description                                           | Required |
|----------------|-------------------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `value`        | ValueType = any                                                                     | undefined  | New State Value                                       | Yes      |
| `config`       | [StateIngestConfig](../../../../Interfaces.md#stateingestconfig)                    | {}         | Configuration                                         | No       |

### 📄 Return
Returns the [State](./Introduction.md) it was called on.



<br />

---

<br />



## `ingest()`

:::info

This function is manly thought for the internal use.

:::

Ingests our State without any specific value into the `runtime`.
Instead of the passed value, 
the  `nextStateValue` will be used as the new State Value instead.
```ts {2}
MY_STATE.nextStateValue = "frank";
MY_STATE.ingest();
MY_STATE.value; // Returns 'frank'
```
If our State is a specific extension of the State, like the [Computed State](../computed/Introduction.md), the
`recomputed value` will be used as the `nextStateValue` instead.
```ts {5}
let coolValue = "jeff";
const MY_COMPUTED = App.createComputed(() => coolValue); // Computed Value is 'jeff'
coolValue = "frank"; 
MY_COMPUTED.value; // Returns 'jeff'
MY_COMPUTED.ingest();
MY_COMPUTED.value; // Returns 'frank'
```

### 📭 Props

| Prop           | Type                                                                                | Default    | Description                                           | Required |
|----------------|-------------------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `config`       | [StateIngestConfig](../../../../Interfaces.md#stateingestconfig)                    | {}         | Configuration                                         | No       |

### 📄 Return
Returns the [State](./Introduction.md) it was called on.



<br />

---

<br />



## `type()`

:::info

We recommend [Typescript](https://www.typescriptlang.org/) Users to use generic types instead of the `type` function.
```ts
const MY_STATE = createState<string>("hi");
MY_STATE.set(1); // Error in editor
MY_STATE.set("bye"); // Success in editor
```

:::

Forces State to only allow mutations of the provided type. 
This is different from [Typescript](https://www.typescriptlang.org/) as it enforces the type at runtime.
```ts {1}
MY_STATE.type(String);
MY_STATE.set(1); // Error at runtime
MY_STATE.set("hi"); // Success at runtime
```
The type function takes in the JS constructor for that type, possible options are:
```ts
Boolean, String, Object, Array, Number
```

### 📭 Props

| Prop           | Type                         | Default      | Description                                           | Required |
|----------------|------------------------------|--------------|-------------------------------------------------------|----------|
| `type`         | any                          | undefined    | Type that gets applied to the State                   | No       |

### 📄 Return
Returns the [State](./Introduction.md) it was called on.



<br />

---

<br />



## `hasCorrectType()`

:::info

Only useful if we have used the [`type`](#type) function to define the type of our State.

:::

Checks if the given value has the correct type at runtime.
It compares whether the value has the same type as the type, which was previously 
defined with help of the [`type`](#type) function.
```ts {2,3}
MY_STATE.type(String);
MY_STATE.hasCorrectType("hi"); // Returns 'true'
MY_STATE.hasCorrectType(12); // Returns 'false'
```

### 📄 Return
`boolean`



<br />

---

<br />



## `undo()`

Reverses the latest State Value mutation.
Be aware that it can only reverses one State change at once,
that's why we can't do `undo().undo().undo()` to get to the State Value from before 3 State changes.
```ts {3}
MY_STATE.set("hi"); // State Value is 'hi'
MY_STATE.set("bye"); // State Value is 'bye'
MY_STATE.undo(); // State Value is 'hi' 
```

### 📭 Props

| Prop           | Type                                                                                | Default    | Description                                           | Required |
|----------------|-------------------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `config`       | [StateIngestConfig](../../../../Interfaces.md#stateingestconfig)                    | {}         | Configuration                                         | No       |

### 📄 Return
Returns the [State](./Introduction.md) it was called on.



<br />

---

<br />



## `reset()`

Sets the State Value to its initial Value.
```ts {4}
const MY_STATE = App.createState("hi"); // State Value is 'hi'
MY_STATE.set("bye"); // State Value is 'bye'
MY_STATE.set("hello"); // State Value is 'hello'
MY_STATE.reset(); //️ State Value is 'hi' 
```

### 📭 Props

| Prop           | Type                                                                                | Default    | Description                                           | Required |
|----------------|-------------------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `config`       | [StateIngestConfig](../../../../Interfaces.md#stateingestconfig)                    | {}         | Configuration                                         | No       |

### 📄 Return
Returns the [State](./Introduction.md) it was called on.



<br />

---

<br />



## `patch()`

:::info

Only relevant for States which have an `object` as value type.

:::

Merges an object into the current State Value object.
```ts {2,5}
const MY_STATE = App.createState({id: 1, name: "frank"}); // State Value is '{id: 1, name: "frank"}'
MY_STATE.patch({name: "jeff"}); // State Value is '{id: 1, name: "jeff"}'

const MY_STATE_2 = App.createState(1);
MY_STATE.patch({hello: "there"}); // Error
```

### ❓ Deepmerge
Unfortunately the `patch` function doesn't support deep merges yet. 
Currently, the merge only happens at the top-level of our objects.
This means, that it doesn't look for deep changes,
if it cannot find a particular property, it will add it at the top-level of the object.
```ts {2}
const MY_STATE = App.createState({things: { thingOne: true, thingTwo: true }}); // State Value is {things: { thingOne: true, thingTwo: true }}
MY_STATE.patch({ thingOne: false }); // State Value is {things: { thingOne: true, thingTwo: true }, thingOne: false}
```
If we don't want to add not existing properties to the object, we can set `addNewProperties` to _false_.
```ts {2}
const MY_STATE = App.createState({things: { thingOne: true, thingTwo: true }}); // State Value is {things: { thingOne: true, thingTwo: true }}
MY_STATE.patch({ thingOne: true }, {addNewProperties: false}); // State Value is {things: { thingOne: true, thingTwo: true }}
```

### 📭 Props

| Prop                 | Type                                                     | Default    | Description                                           | Required |
|----------------------|----------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `targetWithChanges`  | Object                                                   | undefined  | Object that gets merged into the current State Value  | Yes      |
| `config`             | [PatchConfig](../../../../Interfaces.md#patchconfig)     | {}         | Configuration                                         | No       |

### 📄 Return
Returns the [State](./Introduction.md) it was called on.



<br />

---

<br />



## `watch()`

Observes our State and calls a callback function on each State Value mutation.
```ts {1-4}
const response = MY_STATE.watch((value, key) => {
    console.log(value); // Returns current State Value
    console.log(key); // Key of Watcher ("Aj2pB")
});

console.log(response); // "Aj2pB" Random generated Key to idetify the watcher callback
```
We recommend giving each `watcher` callback a unique key to properly identify it later.
```ts {1-3}
const something = MY_STATE.watch("myKey", (value) => {
  // do something
});

console.log(response); // State Instance it was called on
```
A proper identification is for instance necessary, 
to clean up our watcher callback later.

### ❓ When should I cleanup
If we have to use a watcher in component code, it is important to [clean up](#removewatcher) after using it. 
Because if the component unmounts, and the watcher remains it can cause memory leaks.
```ts
MY_STATE.removeWatcher(cleanupKey);
```

### 🚀 [`useWatcher`](../../../react/features/Hooks.md#usewatcher)
If you use React, like me and don't want to worry about cleaning up the watcher callback,
just use the `useWatcher` Hook, which automatically takes care of it.
```tsx
export const MyComponent = () => {

  useWatcher(MY_STATE, (value) => {
    // do something
  })

  return <div></div>
}
```

### 📭 Props

| Prop                 | Type                                                     | Default    | Description                                                          | Required |
|----------------------|----------------------------------------------------------|------------|----------------------------------------------------------------------|----------|
| `key`                | string \| number                                         | undefined  | Key/Name of Watcher Callback                                         | No       |
| `callback`           | (value: ValueType) => void                               | undefined  | Callback Function that gets called on every State Value change       | Yes      |

### 📄 Return
Returns the [State](./Introduction.md) it was called on, if we pass our own Key.
Otherwise, it generates us a random Key and returns this.



<br />

---

<br />



## `removeWatcher()`

Removes `watcher` callback at specific Key.
Such a cleanup is important, after we have no reason to use the watcher callback anymore. 
For instance after a Component has been unmounted to avoid memory leaks.
```ts
MY_STATE.removeWatcher("myKey");
```

### 📭 Props

| Prop   | Type   | Default    | Description                                           | Required |
|--------|--------|------------|-------------------------------------------------------|----------|
| `key`  | string | undefined  | Key/Name of Watcher Callback that gets removed        | Yes      |

### 📄 Return
Returns the [State](./Introduction.md) it was called on.



<br />

---

<br />



## `hasWatcher()`

Looks if a watcher function exists at a certain key.
```ts {4,5}
MY_STATE.watch("myKey", (value) => {
  // do something
});
MY_STATE.hasWatcher("myKey"); // Returns 'true'
MY_STATE.hasWatcher("unknownKey"); // Returns 'false'
```

### 📭 Props

| Prop   | Type   | Default    | Description                                           | Required |
|--------|--------|------------|-------------------------------------------------------|----------|
| `key`  | string | undefined  | Key/Name of Watcher                                   | Yes      |

### 📄 Return
`boolean`



<br />

---

<br />



## `onInaugurated()`

Is a [watcher function](#watch), which destroys itself after the first call.
```ts
MY_STATE.onInaugurated((value) => {
  // do something
});
```

### 📭 Props

| Prop                 | Type                                                     | Default    | Description                                                                        | Required |
|----------------------|----------------------------------------------------------|------------|------------------------------------------------------------------------------------|----------|
| `callback`           | (value: ValueType) => void                               | undefined  | Callback Function that gets called once when the State Value got instantiated      | Yes      |

### 📄 Return
Returns the [State](./Introduction.md) it was called on.



<br />

---

<br />



## `persist()`

Preserves State Value in the appropriate local storage for the current environment. 
No matter if Mobile or Web environment as long as we have configured our [Storage](../storage/Introduction.md) correctly.
```ts
MY_STATE.perist("myPersistKey");
```

### 💻 Web
I guess the most people persisting something on the web, will use the [Local Storage](https://www.w3schools.com/html/html5_webstorage.asp).
Luckily AgileTs has already set up it by default, as long as you haven't disabled it.
```ts {2}
const App = new Agile({
  localStorage: true
})
```
So there is noting to setup here.

### 📱 Mobile
In the mobile environment the Local Storage unfortunately doesn't exist,
so we might use the [Async Storage](https://reactnative.dev/docs/asyncstorage). 
The Async Storage isn't configured by default, so we have to do it on our own.
```ts {3-9}
App.registerStorage(
  new Storage({
    key: "AsyncStorage",
    async: true,
    methods: {
      get: AsyncStorage.getItem,
      set: AsyncStorage.setItem,
      remove: AsyncStorage.removeItem,
    },
  }), {default: true}
);
```

### 🔑 Local Storage Key
To persist our State, 
we have two options to provide the `persist` function the **required** Storage Key.

- **1.** Assign a unique Key to our State,
  because if no key was given to the `persist` function, 
  it tries to use the State Key as Storage Key.
  ```ts {2}
  MY_STATE.key = "myCoolKey";
  MY_STATE.persist(); // Success
  ```
- **2.** Pass the Storage Key directly into the `persist` function.
  ```ts {1}
  MY_STATE.persist("myCoolKey"); // Success
  ```
  
If AgileTs couldn't find any key, it drops an error and doesn't persist the State Value.
```ts {2}
MY_STATE.key = undefined;
MY_STATE.persist(); // Error
```

### 📝 Multiple Storages
If our Application for whatever reason has more than one registered Storages that get actively used. 
We can define with help of the `storageKeys` in which Storage the `persist` function stores the State Value. 
```ts {2}
MY_STATE.persist({
storageKeys: ["myCustomStorage"]
})
```
By default, it gets stored in the `default` Storage.

### 📭 Props

| Prop                 | Type                                                                       | Default    | Description                                                                     | Required |
|----------------------|----------------------------------------------------------------------------|------------|---------------------------------------------------------------------------------|----------|
| `key`                | string \| number                                                           | undefined  | Key/Name of created Persistent (Note: Key required if State has no set Key!)    | No       |
| `config`             | [StatePersistentConfig](../../../../Interfaces.md#statepersistentconfig)   | {}         | Configuration                                                                   | No       |

### 📄 Return
Returns the [State](./Introduction.md) it was called on.



<br />

---

<br />



## `onLoad()`

Gets called whenever our [persisted](#persist) State Value got loaded into the State.
```ts
MY_STATE.onLoad((success) => {
console.log(`Value '${MY_STATE.value}' got loaded into the State! Success? ${success}`)
});
```
For instance this might be useful, to show a loading indicator until
the persisted Value got loaded.

### 📭 Props

| Prop                 | Type                                                     | Default    | Description                                                                                   | Required |
|----------------------|----------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------|----------|
| `callback`           | (success: boolean) => void                               | undefined  | Callback Function that gets called once, when the Storage Value got loaded into the State     | Yes      |

### 📄 Return
Returns the [State](./Introduction.md) it was called on.



<br />

---

<br />



## `copy()`

Creates a fresh copy of the current State Value, without any reference.
```ts {2}
const MY_STATE = App.createState([1, 2, 3]);
MY_STATE.copy(); // Returns '[1, 2, 3]' without any reference to the orginal Value
```

### 📄 Return
Returns a fresh copy of the current State Value(`ValueType`).



<br />

---

<br />



## `exists()`

Checks if the State exists. 
```ts {2}
const MY_STATE = App.createState("hi");
MY_STATE.exists; // Returns 'true'
```

### 📄 Return
`boolean`



<br />

---

<br />



## `is()`

Checks if the State Value _is equal_ to the provided value.
Equivalent to `===`.
```ts {2,3}
const MY_STATE = App.createState("hi");
MY_STATE.is("bye"); // Returns 'false'
MY_STATE.is("hi"); // Returns 'true'
```

### 📭 Props

| Prop                 | Type                     | Default    | Description                                                  | Required |
|----------------------|--------------------------|------------|--------------------------------------------------------------|----------|
| `value`              | ValueType (any)          | undefined  | Value that gets checked if its equals to the State Value     | Yes      |

### 📄 Return
`boolean`



<br />

---

<br />



## `isNot()`

Checks if the State Value _isn't equal_ to the provided value.
Equivalent to `!==`.
```ts {2,3}
const MY_STATE = App.createState("hi");
MY_STATE.isNot("bye"); // Returns 'true'
MY_STATE.isNot("hi"); // Returns 'false'
```

### 📭 Props

| Prop                 | Type                     | Default    | Description                                                  | Required |
|----------------------|--------------------------|------------|--------------------------------------------------------------|----------|
| `value`              | ValueType (any)          | undefined  | Value that gets checked if its not equals to the State Value | Yes      |

### 📄 Return
`boolean`



<br />

---

<br />



## `invert()`

:::info

Only relevant for States which have an `boolean` as value type.

:::

Inverts current State Value.
```ts {2}
const MY_STATE = App.createState(true);
MY_STATE.invert();
MY_STATE.value; // Returns 'false'
```

### 📄 Return
Returns the [State](../state/Introduction.md) it was called on.



<br />

---

<br />



## `compute()`

Recomputes value on each State change.
```ts {1}
const MY_STATE = App.createState("Jeff").compute((value) => `Hello '${value}'`);
MY_STATE.value; // Returns "Hello 'Jeff'"
MY_STATE.set("Frank");
MY_STATE.value; // Returns "Hello 'Frank'"
```

### 👾 [Computed](../computed/Introduction.md) vs `compute()`

The `compute` method is just a simple method to compute our Value
and isn't as powerful has the [Computed Class](../computed/Introduction.md).
For instance, the `compute` method doesn't recompute if a dependency mutates.

### 📭 Props

| Prop                 | Type                                                     | Default    | Description                                                                                   | Required |
|----------------------|----------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------|----------|
| `method`             | (value: ValueType) => ValueType                          | undefined  | Computed Method                                                                               | Yes      |


### 📄 Return
Returns the [State](../state/Introduction.md) it was called on.
