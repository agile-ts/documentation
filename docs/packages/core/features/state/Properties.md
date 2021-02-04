---
id: properties
title: Properties
sidebar_label: Properties
slug: /core/state/properties
---

:::info

Here useful properties of the `State` are described.

:::

## `agileInstance`
Returns the Agile Instance to which the State belongs.
Be aware that we get it in Function shape.
```ts
MY_STATE.agileInstance(); // Returns a Agile Instance
```
The reason for that is to avoid endless deep classes.

## `key`
Returns the current Key/Name of the State.
It is also possible to assign a new Key trough it.
If we assign a new Key, the `setKey` function gets executed behind the scenes.
```ts
MY_STATE.key = "myCoolState";
MY_STATE.key; // Returns 'myCoolState'
```

## `valueType`
Returns the current valueType of the State. 
Be aware that this is only useful for Javascript users,
because Typescript users are recommended to use a generic type.
```ts
MY_STATE.type(String);
MY_STATE.valueType; // Returns 'string'
```

## `isSet`
If the current State Value differ to the initial State Value.
```ts
const MY_STATE = App.createState("jeff");
MY_STATE.isSet; // Returns false
MY_STATE.set("frank");
MY_STATE.isSet; // Returns true
```

## `isPlaceholder`
If the State is a Placeholder.
Mostly a State is a Placeholder if we want to hold a reference to a State that hasn't been instantiated yet.
```ts
MY_STATE.isPlaceholder; // Returns false
```

## `initialStateValue`
Returns the initial Value of the State. 
In other words, the value that was first assigned to the State.
```ts
const MY_STATE = App.createState("jeff");
MY_STATE.set("frank");
MY_STATE.set("hans");
MY_STATE.initialStateValue; // Returns 'jeff'
```

## `value`
Returns the current Value of the State.
It is also possible to assign a new Value trough it.
If we assign a new Value, the `set` function gets executed behind the scenes.
```ts
MY_STATE.value = "myCoolValue";
MY_STATE.value; // Returns 'myCoolValue'
```

## `previousStateValue`
Returns the previous Value of the State.
```ts
const MY_STATE = App.createState("hello");
MY_STATE.set("bye");
MY_STATE.previousState; // Returns 'hello'
```

## `nextStateValue`
Returns the current State Value 
or sometimes the Value that will be assigned next to the State, if it has not been ingested yet.
From this we can deduce that, if we ingest no value into the Runtime, the `nextStateValue` will be used.
```ts
const MY_ARRAY = App.State([1, 2, 3]);
MY_ARRAY.nextState.push(4);
MY_ARRAY.ingest(); 
MY_STATE.value; // Returns [1, 2, 3, 4]
```

## `isPersisted`
If the State Value got persisted into a Storage like the Local Storage.
```ts
MY_STATE.isPersisted; // Returns false
MY_STATE.persist(); 
MY_STATE.isPersisted; // Returns true (if the persisting was successfull)
```