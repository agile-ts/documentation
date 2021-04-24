---
id: introduction
title: Computed
sidebar_label: Introduction
slug: /core/computed
---

A `Computed` is an extension of the `State Class` that computes its value from a provided function.
It automatically caches the computed value to avoid unnecessary recomputations.
We instantiate a Computed with help of an instantiated [Agile Instance](../agile-instance/Introduction.md) often called `App`.
By doing so, the Computed is automatically bound to the Agile Instance it was created from.
```ts
const MY_COMPUTED = App.createComputed(() => {
    return `My name is '${MY_NAME.value}' and I am ${MY_AGE.value} years old.`;
});
```
A `Computed` will magically track used dependencies (such as [Agile Sub Instances](../../../../main/Introduction.md#agile-sub-instance) like [States](../state/Introduction.md) or [Collections](../collection/Introduction.md))
and recomputes when any of its dependencies mutates. For instance, in the above example, it would recompute when the `MY_NAME` value changes from 'jeff' to 'hans'.
```ts
MY_COMPUTED.value; // Returns "My name is 'jeff' and I am 10 years old"
MY_NAME.set('hans');
MY_COMPUTED.value; // Returns "My name is 'hans' and I am 10 years old"
```
A Computed is an extension of the `State Class` and offers the same powerful functionalities.
```ts
MY_COMPUTED.undo(); // Undo latest change
MY_COMPUTED.is("Hello World"); // Check if Compute has a specific Value
```
If you want to find out more about the Computed's specific methods, check out the [Methods](./Methods.md) Section.
Most methods we use to modify, mutate and access the Computed are chainable.
```ts
MY_COMPUTED.undo().recompute().watch(() => {}).reset().type(String).undo();
```

## 🔨 Use case
A `Computed State` is useful whenever we need a State that is computed depending on other States.
```ts
const IS_AUTHENTICATED = App.Computed(() => {
    return TOKEN.exists && USER_ID.exists && EXPIRATION_TIME.value > 0;
});
```
This is the case for our `IS_AUTHENTICATED` State, which depends on several other States determining whether the current user is authenticated.
These include the `TOKEN`, `CURRENT_USER` and `EXPIRATION_TIME`.
If, for instance, the `USER_ID` value changes, the Computed Class will recompute the `IS_AUTHENTICATED` value.
```ts
IS_AUTHENTICATE.value; // Returns 'true'
USER_ID.set(undefined);
IS_AUTHENTICATE.value; // Returns 'false'
```


## ⛳️ Sandbox
Test the Computed Class yourself. It's only one click away. Just select your preferred Framework below.
- [React](https://codesandbox.io/s/agilets-first-computed-kisgr)
- Vue (coming soon)
- Angular (coming soon)


## 📭 Props

```ts
App.createComputed(computedFunction, deps);
// or
App.createComputed(computedFunction, config, deps);
```

### `computedFunction`

Method used to compute the `value` of the Computed Class.
```ts {1}
const MY_COMPUTED = App.createComputed(() => 1 + 1);
MY_COMPUTED.value; // Returns '2'
```
This function will be called on each dependency mutation.
Dependencies can for example be [States](../state/Introduction.md) or [Collections](../collection/Introduction.md).
In the above code snippet `MY_COMPUTED` is independent,
but in the blow example it depends on the `CURRENT_USER_ID` State and `USERS` Collection.
```ts
const MY_COMPUTED = App.createComputed(() => {
    const user = USERS.getItemValue(CURRENT_USER_ID.value);
    return `My name is '${user?.name} and I am ${user?.age} years old.`;
});
MY_COMPUTED.value; // Returns "My name is 'hans' and I am 10 years old."
USERS.update(CURRENT_USER_ID.value, {name: 'jeff'})
MY_COMPUTED.value; // Returns "My name is 'jeff' and I am 10 years old." 
```

### `deps`

In order not to rely 100% on the automatic detection of dependencies,
we can pass an optional array of hard coded dependencies into the Computed Class.
```ts {3}
const MY_COMPUTED = App.createComputed(() => {
    return `My name is '${MY_NAME.value}' and I am ${MY_AGE.value} years old.`;
}, [MY_NAME, MY_AGE]);
MY_COMPUTED.value; // Returns "My name is 'hans' and I am 10 years old." 
MY_NAME.set('jeff');
MY_COMPUTED.value; // Returns "My name is 'jeff' and I am 10 years old."
```
In most cases, it isn't necessary to provide any hard-coded dependency.
However, it might occur that the Computed Class fails to autodetect a particular dependency.
You can check if all dependencies got correctly noticed by giving each used [Agile Sub Instance](../../../../main/Introduction.md#agile-sub-instance) a unique key
and reviewing the `deps` array.
```ts
MY_COMPUTED.deps; // Returns '[Observer('myName'), Observer('myAge')]'
```

## `config`

Beside the computed function and deps array a `Computed` takes an optional configuration object.
```ts
App.createComputed(() => {}, {
    key: "myKey",
    dependents: [MY_STATE_2]
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
App.createComputed(() => {}, {
    key: "myKey"
});
```
We recommend giving each Computed a unique `key` since it has only advantages:
- helps us during debug sessions
- makes it easier to identify the Computed
- no need for separate persist Key

| Type               | Default     | Required |
|--------------------|-------------|----------|
| `string \| number` | undefined   | No       |

<br/>

#### `dependents`

:::warning

This property is mainly thought for the internal use.

:::

Specifies which States depend on this Computed Class.
```ts
App.createComputed(() => {}, {
    dependents: [MY_STATE_2]
});
```
So if this Computed Class mutes and is ingested into the `runtime`,
the depending States are ingested into the `runtime` too.

| Type              | Default     | Required |
|-------------------|-------------|----------|
| `Array<Observer>` | []          | No       |

<br/>

#### `isPlaceholder`

:::warning

This property is mainly thought for the internal use.

:::

Defines whether the Computed is a `placeholder`.
```ts
const MY_COMPUTED = App.createComputed(() => {}, {
    isPlaceholder: true
});

MY_COMPUTED.exists(); // false
```
Computed Classes are, for example, `placeholder` when AgileTs needs to hold a reference to them,
even though they aren't instantiated yet.

| Type            | Default     | Required |
|-----------------|-------------|----------|
| `boolean`       | false       | No       |


## 🟦 Typescript

The `Computed Class` is almost 100% typesafe and takes an optional generic type for type safety of its `value`.
```ts {1}
const MY_COMPUTED = App.createComputed<string>(() => {
    return 'Now Compute Function has to return String!';
});
```
