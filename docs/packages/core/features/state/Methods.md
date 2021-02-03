---
id: methods
title: Methods
sidebar_label: Methods
slug: /core/state/methods
---

:::info

Here all methods of the `Agile Instance` are described.

:::

## `setKey`

Assigns a new Key/Name to the State.
```ts {1}
MY_STATE.setKey("newKey");
MY_STATE.key; // Returns 'newKey'
```

### ❓ Why a Key
It is recommended that each State has its own unique Key.
Such a unique key has only advantages.
- helps us during debug sessions
- makes it easy to identify a State
- no need for separate persist Key

### 📭 Props

| Prop           | Type                             | Default    | Description                                           | Required |
|----------------|----------------------------------|------------|-------------------------------------------------------|----------|
| `value`        | string \| number \| undefined      | undefined  | New Key/Name of State                                 | Yes      |

### 📄 Return
Returns the [State](../state/Introduction.md) it was called on.



<br />

---

<br />



## `set`

Allows us to mutate the State Value.
```ts {1}
MY_STATE.set("myNewValue");
MY_STATE.value; // Returns 'myNewValue'
```
After having called the `set` method, the State gets ingested into the `runtime`.
The `runtime` applies our new value to the State and ensures that each Component which has the State bound to itself rerender.

Beside the value, we are able to pass a `config` object. <br />
To give you a taste what we can configure, here are some simple examples:
- `force` <br />
  Defines if the new State Value gets forced trough the `runtime`, not matter what happens
   ```ts
    // Doesn't get ingested into the Runtime, because the State Value hasn't changed
    MY_STATE.set("myNewValue");
  
    // Gets ingested into the Runtime
    MY_STATE.set("myNewValue", {force: true}); // ◀️
   ```

- `background` <br />
  If the new State Value gets applied to the State in background.
  So that Agile doesn't cause a rerender in Components that have bound the State to itself.
  ```ts
  // Causes rerender in Components
  MY_STATE.set("myNewValue2");
  
  // Doesn't cause rerender in Comonents
  MY_STATE.set("myNewValue3", {background: true}); // ◀️
  ```

- `overwrite` <br />
  If the whole State gets overwritten with the new Value.
   ```ts
   MY_STATE.set("finalValue", {overwrite: true}); // ◀️
   MY_STATE.value; // Returns 'finalValue'
   MY_STATE.previousStateValue; // Returns 'finalValue'
   MY_STATE.initialStateValue; // Returns 'finalValue'
   ```
  
- ...To find out more about `set` configuration options checkout the [StateRuntimeJobConfigInterface](../../../../Interfaces.md#stateruntimejobconfig).

### 📭 Props

| Prop           | Type                                                                                | Default    | Description                                           | Required |
|----------------|-------------------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `value`        | ValueType = any                                                                     | undefined  | New State Value                                       | Yes      |
| `config`       | [StateIngestConfig](../../../../Interfaces.md#stateingestconfig)                    | {}         | Configuration                                         | False    |

### 📄 Return
Returns the [State](../state/Introduction.md) it was called on.



<br />

---

<br />



## `ingest`

Ingests State into the Runtime, trough which the `nextStateValue` or if
it is an extension of the State like a Computed the `computedValue`
gets applied to the State.

```ts {2}
MY_STATE.nextStateValue = "frank";
MY_STATE.ingest();
MY_STATE.value; // Returns 'frank'
```

### 📭 Props

| Prop           | Type                                                                                | Default    | Description                                           | Required |
|----------------|-------------------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `config`       | [StateIngestConfig](../../../../Interfaces.md#stateingestconfig)                    | {}         | Configuration                                         | False    |

### 📄 Return
Returns the [State](../state/Introduction.md) it was called on.



<br />

---

<br />



## `type`

:::info

We recommend [Typescript](https://www.typescriptlang.org/) Users to use generic types instead of the `type` function.
```ts
const MY_STATE = createState<string>("hi");
MY_STATE.set(1); // Error in editor
MY_STATE.set("bye"); // Success in editor
```

:::

Forces State to only allow mutations of the provided type. 
This is different from Typescript as it enforces the type at runtime.
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
| `type`         | any                          | undefined    | Type that gets applied to the State                   | False    |

### 📄 Return
Returns the [State](../state/Introduction.md) it was called on.



<br />

---

<br />



## `undo`

Reverses our latest State Value mutation.
Be aware that it currently can only reverse one State change action,
that's why we can't do `undo().undo().undo()` to get to the State Value from before 3 State changes.
```ts {3}
MY_STATE.set("hi"); // State Value is 'hi'
MY_STATE.set("bye"); // State Value is 'bye'
MY_STATE.undo(); // State Value is 'hi' 
```

### 📭 Props

| Prop           | Type                                                                                | Default    | Description                                           | Required |
|----------------|-------------------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `config`       | [StateIngestConfig](../../../../Interfaces.md#stateingestconfig)                    | {}         | Configuration                                         | False    |

### 📄 Return
Returns the [State](../state/Introduction.md) it was called on.



<br />

---

<br />



## `reset`

Resets our State Value to its initial Value, 
so the value that was first assigned to our State.
```ts {4}
const MY_STATE = App.createState("hi"); // State Value is 'hi'
MY_STATE.set("bye"); // State Value is 'bye'
MY_STATE.set("hello"); // State Value is 'hello'
MY_STATE.reset(); //️ State Value is 'hi' 
```

### 📭 Props

| Prop           | Type                                                                                | Default    | Description                                           | Required |
|----------------|-------------------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `config`       | [StateIngestConfig](../../../../Interfaces.md#stateingestconfig)                    | {}         | Configuration                                         | False    |

### 📄 Return
Returns the [State](../state/Introduction.md) it was called on.



<br />

---

<br />



## `patch`

:::info

Only relevant for States with a Value that has a type of `object`!

:::

Merges our Object with changes into the current State Value Object.
```ts {2,5}
const MY_STATE = App.createState({id: 1, name: "frank"}); // State Value is {id: 1, name: "frank"}
MY_STATE.patch({name: "jeff"}); // State Value is {id: 1, name: "jeff"}

const MY_STATE_2 = App.createState(1);
MY_STATE.patch({hello: "there"}); // Error
```

### ❓ Deepmerge
Unfortunately this function doesn't support deepmerge yet. 
So currently the merge only happens at the top-level of our Objects 
and doesn't for deep properties.
If it can't find a specific property it adds it at the
top-level of the State Object.
```ts
const MY_STATE = App.createState({id: 1, data: {name: "frank"}}); // State Value is {id: 1, name: "frank"}
MY_STATE.patch({name: "jeff"}); // State Value is {id: 1, data: {name: "frank"}, name: "jeff"}
```
If you don't like to add new properties to your Object, just set `addNewProperties` to _false_ in the `config`.
```ts
const MY_STATE = App.createState({id: 1, data: {name: "frank"}}); // State Value is {id: 1, name: "frank"}
MY_STATE.patch({name: "jeff"}, {addNewProperties: false}); // State Value is {id: 1, data: {name: "frank"}}
```

### 📭 Props

| Prop                 | Type                                                     | Default    | Description                                           | Required |
|----------------------|----------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `targetWithChanges`  | Object                                                   | undefined  | Object that gets merged into the current State Value  | True     |
| `config`             | [PatchConfig](../../../../Interfaces.md#patchconfig)     | {}         | Configuration                                         | False    |

### 📄 Return
Returns the [State](../state/Introduction.md) it was called on.



<br />

---

<br />



## `watch`

Observes our State, therefore it calls the passed callback function on each State Value change.
```ts
const response = MY_STATE.watch((value, key) => {
    console.log(value); // Returns current State Value
    console.log(key); // Key of Watcher ("Aj2pB")
});

console.log(response); // "Aj2pB" Random generated Key to idetify the watcher callback
```
We recommend giving each `watcher` callback a unique key to properly identify it later.
```ts
const something = MY_STATE.watch("myKey", (value) => {
  // do something
});

console.log(response); // State Instance it was called on
```
A proper identification is for instance necessary if we want to clean up our `watcher` callback.

### ❓ When should I cleanup
If we need to use our watcher in component code, it is important to [clean up](#removewatcher), as if
the component unmounts, and the watcher remains it can cause memory leaks.
```ts
MY_STATE.removeWatcher(cleanupKey);
```

### 🚀 [`useWatcher`](../../../react/features/Hooks.md#usewatcher)
If you use React and don't want to do fancy cleanups after the component unmounts,
just use the `useWatcher` Hook, which automatically cleans up
the watcher callback on unmount.
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
| `key`                | string \| number                                         | undefined  | Key/Name of Watcher Callback                                         | False    |
| `callback`           | (value: ValueType) => void                               | undefined  | Callback Function that gets called on every State Value change       | True     |

### 📄 Return
Returns the [State](../state/Introduction.md) it was called on if we pass our own Key.
Otherwise, it generates us a random Key and returns this.


<br />

---

<br />



## `removeWatcher`

Removes `watcher` callback at specific key.
Such a cleanup is important, after we have no reason to use the callback
anymore, for instance after unmounting of a component, we should cleanup
the callback to avoid memory leaks.
```ts
MY_STATE.removeWatcher("myKey");
```

## `hasWatcher`

Checks if a `watcher` callback exists at a specific key
```
MY_STATE.watch("myKey", (value) => {
  // do something
});
MY_STATE.hasWatcher("myKey"); // true
```

## `onInaugurated`

Create a watcher that will fire a callback then destroy itself after invoking.

## `persist`

Persists value into a Storage.

## `onLoad`

Gets called whenever the persisted value got loaded into the State

## `copy`

Creates a fresh copy without any references from the State.
```ts
const MY_STATE = App.createState([1, 2, 3]);

MY_STATE.copy(); // Returns [1, 2, 3] without any reference to the orginal Value
```

## `exists`

Checks if the State exists. 

## `is`

Checks if the State Value is equal to a specific value.
Equivalent to `===`.
```ts
const MY_STATE = App.createState("hi");

MY_STATE.is("bye"); // Returns false
MY_STATE.is("hi"); // Returns true
```

## `isNot`

Checks if the State Value isn't equal to a specific value.
Equivalent to `!==`.
```ts
const MY_STATE = App.createState("hi");

MY_STATE.isNot("bye"); // Returns true
MY_STATE.isNot("hi"); // Returns false
```

## `invert`

## `compute`

## `addSideEffect`

## `removeSideEffect`

## `hasSideEffect`

## `hasCorrectType`

## `getPublicValue`

## `getPersistableValue`
