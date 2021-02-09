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
Returns the Agile Instance to which the State belongs.
Be aware that it gets in function shape returned.
```ts
MY_STATE.agileInstance(); // Returns a Agile Instance
```
The reason for that is to avoid endless deep classes.

## `key`
Returns the current Key/Name of the State.
A Key is used to uniquely identify the State.
Besides getting the key, we can also assign a new Key with this property.
```ts
MY_STATE.key = "myCoolState";
MY_STATE.key; // Returns 'myCoolState'
```

## `valueType`
Returns the current valueType of the State.
```ts {2}
MY_STATE.type(String);
MY_STATE.valueType; // Returns 'string'
```
Be aware that this is only useful for Javascript users,
because Typescript users are recommended to use generic types.
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
If the State is a Placeholder.
A State is an placeholder if it hasn't been instantiated yet, but AgileTs holds a reference to it.
```ts
MY_STATE.isPlaceholder; // Returns false
```
For instance if we bind a Group which might not exist to our Component.
AgileTs creates a placeholder Group for us, to ensure that the Component rerender whenever 
the real Group got created.
```ts
const myGroup = useAgile(MY_COLLECTION.getGroupWithReference("group1")); // Causes rerender if Group got created
const myGroup2 = useAgile(MY_COLLECTION.getGroup("group2")); // Doesn't Causes rerender if Group got created
```

## `initialStateValue`
Returns the initial Value of the State. 
In other words, the value that was first assigned to the State.
```ts {4}
const MY_STATE = App.createState("jeff");
MY_STATE.set("frank");
MY_STATE.set("hans");
MY_STATE.initialStateValue; // Returns 'jeff'
```

## `value`
Returns the current Value of the State.
Besides getting the current Value, we can also assign a new Value with this property.
```ts
MY_STATE.value = "myCoolValue";
MY_STATE.value; // Returns 'myCoolValue'
```

## `previousStateValue`
Returns the previous Value of the State.
So the Value that was assigned to the State before the current Value.
```ts
const MY_STATE = App.createState("hello");
MY_STATE.set("bye");
MY_STATE.previousState; // Returns 'hello'
```

## `nextStateValue`
Returns the Value that will be assigned to the State as next. 
Of course mostly that is the current Value, because AgileTs doesn't need that long to assign a new Value.
```ts {2}
MY_STATE.set(1);
MY_STATE.nextStateValue; // Returns '1'
```
If we ingest the State without any specific value, the `nextStateValue` will be used as the next Value instead.
If this next Value differs to the current Value, it gets assigned to the State.
```ts {2}
const MY_ARRAY = App.State([1, 2, 3]);
MY_ARRAY.nextState.push(4);
MY_ARRAY.ingest(); 
MY_STATE.value; // Returns '[1, 2, 3, 4]'
```

## `isPersisted`
If the State Value got persisted into a Storage like the Local Storage.
```ts
MY_STATE.isPersisted; // Returns 'false'
MY_STATE.persist(); 
MY_STATE.isPersisted; // Returns true (if the persisting was successfull)
```