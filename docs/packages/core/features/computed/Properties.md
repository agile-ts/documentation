---
id: properties
title: Properties
sidebar_label: Properties
slug: /core/computed/properties
---

:::info

Here are valuable properties of the `Computed Class` listed,
which aren't directly related to the [`State Class`](../state/Introduction.md).

The Computed is an extension of the [`State Class`](../state/Introduction.md)
and offers the same methods and properties as a normal State.
These State related methods aren't described in this Section.
To find out more about specific State methods,
checkout the [State docs](../state/Introduction.md).

:::

## `computeFunction`

Method used to recompute the `value` of the Computed Class.
```ts {1}
const MY_COMPUTED = App.createComputed(() => 1 + 1);
MY_COMPUTED.value; // Returns '2'
```
This function will be called on each dependency mutation.
A dependency can for example be a State or Collection.
In the above code snippet `MY_COMPUTED` depends on nothing,
but in the blow example it depends on the `MY_NAME` and `MY_AGE` State.
```ts
const MY_COMPUTED = App.createComputed(() => {
    return `My name is '${MY_NAME.value} and I am ${MY_AGE.value} years old.`;
});
MY_COMPUTED.value; // Returns 'My name is hans and I am 10 years old.' 
MY_NAME.set('jeff');
MY_COMPUTED.value; // Returns 'My name is jeff and I am 10 years old.' 
```

### 📄 Return

```ts
() => ComputedValueType
```



<br />

---

<br />



## `deps`

An Array of Observers the `Computed Class` depends on.
```ts
const MY_COMPUTED = App.createComputed(() => {
    return MY_NAME.value + MY_AGE.value;
}, [MY_LOCATION]);
MY_COMPUTED.deps; // Returns (see below)
// [Observer(MY_LOCATION), Observer(MY_NAME), Observer(MY_AGE)]
```
It does include the autodetected Observers, and the hard coded Observers.

### 📄 Return

```ts
Array<Observer>
```



<br />

---

<br />



## `hardCodedDeps`

An Array of hard coded Observers the `Computed Class` depends on.
```ts
const MY_COMPUTED = App.createComputed(() => {
    return MY_NAME.value + MY_AGE.value;
}, [MY_LOCATION]);
MY_COMPUTED.hardCodedDeps; // Returns (see below)
// [Observer(MY_LOCATION)]
```
It only includes the hard coded Observers.

### 📄 Return

```ts
Array<Observer>
```