---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /core/computed
---

:::warning

WIP docs!

:::


A Computed automatically computes its value depending on other Agile Sub Instances like [States](../state/Introduction.md), [Collections](../collection/Introduction.md), ..
We instantiate a Computed with help of an instantiated [Agile Instance](../agile-instance/Introduction.md) often called `App`.
By doing so, the Computed is automatically bound to the Agile Instance it was created from.
```ts
const MY_COMPUTED = App.createComputed(() => {
    return `My name is '${MY_NAME.value} and I am ${MY_AGE.value} years old.`;
});
```
The first parameter `createComputed()` takes,
is the computed method which recomputes the `value` of the Computed.
The computed method will be called on each Agile Sub Instance mutation,
to keep the Computed value up to date. 
In the above example such Agile Sub Instance mutation might be, if `MY_NAME` value changes to 'hans'.
```ts
MY_COMPUTED.computeFunction(); // Returns (See below)
// 'My name is hans and I am 10 years old.'
```
By default, the `Computed Class` does autodetect the used dependencies (Agile Sub Instance)
and recomputes its value as soon as one dependency mutates.
But sometimes there are some issue with the autodetecting.
Therefore, the `createComputed()` method takes optional second property with hard coded dependencies of the `Computed Class`.
```ts
const MY_COMPUTED = App.createComputed(() => {
    return `My name is '${MY_NAME.value} and I am ${MY_AGE.value} years old.`;
}, [MY_NAME, MY_AGE]); // to recompute value whenever MY_NAME or MY_AGE changes (gets normally autodetected)
```
A Computed is an extension of the `State Class` and offers the same powerful features.
```ts
MY_COMPUTED.undo(); // Undo latest change
MY_COMPUTED.persist(); // Persist Computed Value into Storage
```
If you want to find out more about specific methods of the Computed, checkout the [Methods](./Methods.md) Section.
Most methods we use to modify, mutate and access the Computed are chainable.
```ts
MY_COMPUTED.undo().recompute().watch(() => {}).reset().persist().type(String).undo();
```


## 🔨 Use case
We might use a Computed to compute the `IS_AUTHENTICATED` State, which depends on multiple other Agile States.
```ts
const IS_AUTHENTICATED = App.Computed(() => {
    return TOKEN.exists && USER_ID.exists && EXPIRATION_TIME > 0;
});
```
In the above example, we create a `IS_AUTHENTICATED` Computed, 
which computes its value depending on the `TOKEN`, `CURRENT_USER` and `EXPIRATION_TIME`.
So the user is only authenticated if the TOKEN, and the USER_ID is not `undefined` and the EXPIRATION_TIME is larger than 0.
If for instance the TOKEN value changes, the Computed Class will recompute the IS_AUTHENTICATED value.


## ⛳️ Sandbox
Test the Computed yourself. It's only one click away. Just select your preferred Framework below.
- [React](https://codesandbox.io/s/agilets-first-state-f12cz)
- Vue (coming soon)
- Angular (coming soon)


## 📭 Props

```ts
App.createComputed(computedFunction, deps);
// or
App.createComputed(computedFunction, config, deps);
```

### `computedFunction`

The method which recomputes the Computed value.
```ts {1}
const MY_COMPUTED = App.createComputed(() => 1 + 1);
MY_COMPUTED.value; // Returns '2'
```
This function will be called on each dependency change.
In the above example MY_COMPUTED has no dependencies, 
but in the below example it depends on the `MY_NAME` and `MY_AGE` State.
```ts
const MY_COMPUTED = App.createComputed(() => {
    return `My name is '${MY_NAME.value} and I am ${MY_AGE.value} years old.`;
});
MY_COMPUTED.value; // Returns 'My name is hans and I am 10 years old.' 
MY_NAME.set('jeff');
MY_COMPUTED.value; // Returns 'My name is jeff and I am 10 years old.' 
```

### `deps`

In order not to rely 100% on the autodetection of dependencies, 
we can pass an optional array of hard coded deps into the `Computed Class`.
```ts
const MY_COMPUTED = App.createComputed(() => {
    return `My name is '${MY_NAME.value} and I am ${MY_AGE.value} years old.`;
}, [MY_NAME, MY_AGE]);
MY_COMPUTED.value; // Returns 'My name is hans and I am 10 years old.' 
MY_NAME.set('jeff');
MY_COMPUTED.value; // Returns 'My name is jeff and I am 10 years old.' 
```
We don't need to pass hard coded dependencies into the Computed Class so often,
because in 95% of the cases it will be able to detect its dependencies by itself.
Of course, you can get 100% sure by giving each passed State a unique key and checking the deps of the Computed.
```ts
MY_COMPUTED.deps; // Returns '[Observer('myName'), Observer('myAge')]'
```

## `config`

Beside the computedFunction and deps a `Computed` takes an optional configuration object.
```ts
const MY_STATE = App.createState("myInitialValue", {
    key: "myKey",
    dpendents: [MY_STATE_2]
});
```
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface StateConfigInterface {
    key?: StateKey;
    dependents?: Array<Observer>;
    isPlaceholder?: boolean;
}
```

<br/>

#### `key`
The optional property `key/name` should be a unique `string/number` to identify the Computed later.
```ts
const MY_COMPUTED = App.createComputed(() => {}, {
    key: "myKey"
});
```
We recommend giving each Computed a unique `key`, since it has only advantages:
- helps us during debug sessions
- makes it easier to identify the Computed
- no need for separate persist Key

<br/>

#### `dependents`

:::warning

This property is mainly thought for internal use.

:::

`dependents` defines which States depend on our Computed.
This means if our Computed gets mutated and ingested into the `runtime`,
the States depending on our Computed will be ingested into the `runtime` too.
```ts
const MY_COMPUTED = App.createComputed(() => {}, {
    dependents: [MY_STATE_2]
});
```

<br/>

#### `isPlaceholder`

:::warning

This property is mainly thought for internal use.

:::

Defines whether the Computed is an `placeholder` or not.
```ts
const MY_COMPUTED = App.createComputed(() => {}, {
    isPlaceholder: true
});

MY_COMPUTED.exists(); // false
```
Computeds are, for example, `placeholder` when AgileTs needs to hold a reference to them,
although they aren't instantiated yet.


## 🟦 Typescript

The `Computed Class` is almost 100% typesafe.
