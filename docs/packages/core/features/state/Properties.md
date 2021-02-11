---
id: properties
title: Properties
sidebar_label: Properties
slug: /core/state/properties
---

:::info

Here useful properties of the `State` are listed.

:::

## `agileInstance`
Agile Instance to which the State belongs
```ts
MY_STATE.agileInstance(); // Returns a Agile Instance
```
Note that it is stored as a function in the State, to avoid endless deep classes.

## `key`
Current key/name of the State.
It is used to uniquely identify the State.
Besides getting the `key`, we can also assign a new `key` with help of this property.
```ts
MY_STATE.key = "myCoolState";
MY_STATE.key; // Returns 'myCoolState'
```

## `valueType`
Current type of the value.
```ts {2}
MY_STATE.type(String);
MY_STATE.valueType; // Returns 'string'
```
This property is only useful if you are using Javascript,
because for Typescript there are better solutions, like generic types.
```ts
App.createState<string>("see generic types are sick");
```

## `isSet`
If the current State Value differ from the initial State Value.
```ts {2,4}
const MY_STATE = App.createState("jeff");
MY_STATE.isSet; // Returns false
MY_STATE.set("frank");
MY_STATE.isSet; // Returns true
```

## `isPlaceholder`
If the State is a placeholder.
```ts
MY_STATE.isPlaceholder; // Returns 'false'
```
For instance, it might be a placeholder if it hasn't been instantiated yet, but AgileTs needs to hold a reference to it.
This is the case if we bind a maybe not existing Group with the `getGroupWithReference` function to a Component.
Then AgileTs creates a placeholder Group for us, to ensure that the Component rerender whenever 
the real Group got created.
```ts
const myGroup = useAgile(MY_COLLECTION.getGroupWithReference("group1")); // Causes rerender if Group got created
const myGroup2 = useAgile(MY_COLLECTION.getGroup("group2")); // Doesn't Causes rerender if Group got created
```

## `initialStateValue`
The first Value which got firstly assigned to the State.
```ts {4}
const MY_STATE = App.createState("jeff");
MY_STATE.set("frank");
MY_STATE.set("hans");
MY_STATE.initialStateValue; // Returns 'jeff'
```

## `value`
The current Value of the State.
Besides getting the `value`, we can also assign a new `value` with help of this property.
```ts
MY_STATE.value = "myCoolValue";
MY_STATE.value; // Returns 'myCoolValue'
```

## `previousStateValue`
The State Value, which has been assigned to the State, before the current active Value.
```ts
const MY_STATE = App.createState("hello");
MY_STATE.set("bye");
MY_STATE.previousState; // Returns 'hello'
```

## `nextStateValue`
The State Value, which will be assigned to the State as next.
Often this is the current Value, because AgileTs is pretty fast in assigning new Values 🚀.
```ts {2}
MY_STATE.set(1);
MY_STATE.nextStateValue; // Returns '1'
```
The `nextStateValue` will be used as next value, if we ingest the State without any specific new value into the runtime.
```ts {2}
const MY_ARRAY = App.State([1, 2, 3]);
MY_ARRAY.nextState.push(4);
MY_ARRAY.ingest(); 
MY_STATE.value; // Returns '[1, 2, 3, 4]'
```

## `isPersisted`
If the State Value got successfully persisted into an external Storage like the [Local Storage](https://developer.mozilla.org/de/docs/Web/API/Window/localStorage).
```ts {1,3}
MY_STATE.isPersisted; // Returns 'false'
MY_STATE.persist(); 
MY_STATE.isPersisted; // Returns 'true'
```
