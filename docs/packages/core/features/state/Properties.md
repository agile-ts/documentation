---
id: properties
title: Properties
sidebar_label: Properties
slug: /core/state/properties
---

:::info

Here are valuable properties of the `State Class` listed.

:::

## `agileInstance`

The [`agileInstance`](../agile-instance/Introduction.md) to which the State belongs.
```ts
MY_STATE.agileInstance(); // Returns a Agile Instance
```
Be aware that the `agileInstance` property is of the type function, 
to avoid endless deep classes.

### 📄 Return

```ts
Agile
```



<br />

---

<br />



## `key`

The current `key/name` of the State, 
which is used to uniquely identify it.
```ts {2}
const MY_STATE = App.createState(123, {key: 'jeffKey'});
MY_STATE.key; // Returns 'jeffKey'
```
Besides, accessing the `key`, we can also assign a new `key` through this property.
```ts {1}
MY_STATE.key = "myCoolState";
MY_STATE.key; // Returns 'myCoolState'
```

### 📄 Return

```ts
string | number
```


<br />

---

<br />



## `valueType`

Represents the current `type` of the State value.
```ts {2}
MY_STATE.type(String);
MY_STATE.valueType; // Returns 'string'
```
This property is thought to help Javascript users to get a basic type safety.
In Typescript, we recommend using generic types to reach such goal.
```ts
App.createState<string>("see generic types are sick");
```

### 📄 Return

```ts
string
```


<br />

---

<br />



## `isSet`

Is `ture`, if the current State value differs from the initial State value.
```ts {2,4}
const MY_STATE = App.createState("jeff");
MY_STATE.isSet; // Returns false
MY_STATE.set("frank");
MY_STATE.isSet; // Returns true
```

### 📄 Return

```ts
boolean
```


<br />

---

<br />



## `isPlaceholder`

Determines if the State is a `placeholder`.
```ts
MY_STATE.isPlaceholder; // Returns 'false'
```
States are, for example, `placeholder` when AgileTs needs to hold a reference to them,
although they aren't instantiated yet.
This might be the case by using `getGroupWithReference()`,
which returns a `placeholder` Group (extension of State), if the Group doesn't exist,
to hold a reference to it.
```ts
const myGroup = useAgile(MY_COLLECTION.getGroupWithReference("group1")); // Causes rerender if Group got created
const myGroup2 = useAgile(MY_COLLECTION.getGroup("group2")); // Doesn't Causes rerender if Group got created
```
This reference is essential to rerender the Component,
whenever the Group got instantiated.

### 📄 Return

```ts
boolean
```


<br />

---

<br />



## `initialStateValue`

The initial `value` of the State,
so the `value` that got firstly assigned to it.
```ts {4}
const MY_STATE = App.createState("jeff");
MY_STATE.set("frank");
MY_STATE.set("hans");
MY_STATE.initialStateValue; // Returns 'jeff'
```

### 📄 Return

```ts
ValueType
```


<br />

---

<br />



## `value`

The current `value` of the State.
```ts {2}
const MY_STATE = App.createState(123);
MY_STATE.key; // Returns '123'
```
Besides, accessing the `value`,
we can also assign a new `value` through this property to the State.
```ts {1}
MY_STATE.value = 9999;
MY_STATE.value; // Returns '9999'
```

### 📄 Return

```ts
ValueType
```


<br />

---

<br />



## `previousStateValue`

The previously assigned State `value`.
```ts
const MY_STATE = App.createState("hello");
MY_STATE.set("bye");
MY_STATE.previousState; // Returns 'hello'
```

### 📄 Return

```ts
ValueType
```



<br />

---

<br />



## `nextStateValue`

The State `value` that will be assigned next to the State as current `value`.
Often it is the current `value`, because AgileTs assigns new `values` pretty fast 🚀.
```ts {2}
MY_STATE.set(1);
MY_STATE.nextStateValue; // Returns '1'
MY_STATE.value; // Returns '1'
```
The `nextStateValue` will be used as the next `value`, 
if the State got ingested into the `runtime` without any specific new `value`.
```ts {2}
const MY_STATE = App.State('hans');
MY_STATE.nextStateValue = 'jeff';
MY_STATE.ingest(); 
MY_STATE.value; // Returns 'jeff'
```

### 📄 Return

```ts
ValueType
```


<br />

---

<br />



## `isPersisted`

If the State `value` is stored in an external Storage like the [Local Storage](https://developer.mozilla.org/de/docs/Web/API/Window/localStorage).
```ts {1,3}
MY_STATE.isPersisted; // Returns 'false'
MY_STATE.persist(); 
MY_STATE.isPersisted; // Returns 'true' if the persist was successful
```

### 📄 Return

```ts
boolean
```
