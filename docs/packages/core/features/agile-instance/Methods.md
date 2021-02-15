---
id: methods
title: Methods
sidebar_label: Methods
slug: /core/agile-instance/methods
---

:::info

Here all methods of the `Agile Instance` are described.

:::


## `createState()`

Creates a new [State](../state/Introduction.md),
which gets automatically bound to the [Agile Instance](../agile-instance/Introduction.md) it was created from.
```ts
const State = App.createState('jeff', {
    key: 'dummyState',
})
```

### 📭 Props

| Prop           | Type                                                                       | Default   | Description                                           | Required |
|----------------|----------------------------------------------------------------------------|-----------|-------------------------------------------------------|----------|
| `initialValue` | ValueType = any                                                            | undefined | Initial Value of State                                | Yes      |
| `config`       | [StateConfigInterface](../../../../Interfaces.md#stateconfig)              | {}        | Configuration                                         | No       |

### 📄 Return
Returns a fresh [State](../state/Introduction.md).



<br />

---

<br />



## `createCollection()`

Creates a new [Collection](../collection/Introduction.md),
which gets automatically bound to the [Agile Instance](../agile-instance/Introduction.md) it was created from.
```ts {1-4,8-13}
const Collection = App.createCollection({
    key: 'dummyCollection',
   groups: ['myGroup']
})

// or 

const Collection2 = App.createCollection((collection) => ({
   key: 'dummyCollection',
   groups: {
       myGroup: collection.Group(['item1', 'item2'])
   }
}))
```

### 📭 Props

| Prop         | Type                                                                   | Default   | Description                                           | Required |
|--------------|------------------------------------------------------------------------|-----------|-------------------------------------------------------|----------|
| `config`     | [CollectionConfig](../../../../Interfaces.md#collectionconfig)         | {}        | Configuration                                         | No       |


### 📄 Return
Returns a fresh [Collection](../collection/Introduction.md).



<br />

---

<br />



## `createComputed()`

Creates a new [Computed](../computed/Introduction.md),
which gets automatically bound to the [Agile Instance](../agile-instance/Introduction.md) it was created from.
```ts {1,5-7}
const Computed = App.createComputed(() => {/* Computed Method */}, [/* hard coded deps */])

// or

const ComputedWithConfig = App.createComputed(() => {/* Computed Method */}, {
   key: 'dummyComputed',
}, [/* hard coded deps */])
```

### 📭 Props

| Prop              | Type                                                              | Default   | Description                                        | Required |
|-------------------|-------------------------------------------------------------------|-----------|----------------------------------------------------|----------|
| `computeFunction` | () =>  ComputedValueType                                          | undefined | Function that recomputes the value of the Computed | Yes      |
| `config`          | [StateConfigInterface](../../../../Interfaces.md#stateconfig)     | {}        | Configuration                                      | No       |
| `deps`            | Array<Observer \| State \| Event \| Group\>                       | []        | Dependencies of Computed                           | No       |

### 📄 Return
Returns a fresh [Computed](../computed/Introduction.md).



<br />

---

<br />



## `createEvent()`

Creates a new [Event](../event/Introduction.md),
which gets automatically bound to the [Agile Instance](../agile-instance/Introduction.md) it was created from.
```ts
const Event = App.createEvent({
    key: 'dummyEvent',
})
```

### 📭 Props

| Prop            | Type                                                              | Default   | Description                                        | Required |
|-----------------|-------------------------------------------------------------------|-----------|----------------------------------------------------|----------|
| `config`        | [CreateEventConfig](../../../../Interfaces.md#createeventconfig)  | {}        | Configuration                                      | No       |


### 📄 Return
Returns a fresh [Event](../event/Introduction.md).



<br />

---

<br />



## `integrate()`

Allows us to integrate AgileTs into nearly any [Framework/Integration](../integration/Introduction.md).
For instance in case of [React](https://reactjs.org/), AgileTs offers a [React Integration](../integration/Introduction.md),
which allows us to integrate it into AgileTs.
```ts {29}
const reactIntegration = new Integration<typeof React, AgileReactComponent>({
  key: 'react',
  frameworkInstance: React,
  bind() {
    // Nothing to bind ;D
    return Promise.resolve(true);
  },
  updateMethod(componentInstance, updatedData: Object) {
    // Merge changes into State if some Data updated otherwise force rerender
    if (Object.keys(updatedData).length !== 0) {
      componentInstance.agileProps = flatMerge(
        componentInstance.agileProps,
        updatedData
      );
      componentInstance.setState(
        flatMerge(componentInstance.state, updatedData)
      );
    } else {
      componentInstance.forceUpdate();
    }
  },
});

// Each initialIntegraion gets integrated into AgileTs automatically during initialation
// Note: Only useful if you create your own integration
Agile.initialIntegrations.push(reactIntegration);

// Or we integrate it manually (mostly the case if the auto integration doesn't work)
App.integrate(reactIntegration);
```

### 📭 Props

| Prop            | Type                                                              | Default   | Description                                                 | Required |
|-----------------|-------------------------------------------------------------------|-----------|-------------------------------------------------------------|----------|
| `integration`   | [Integration](../integration/Introduction.md)                     | undefined | Integration that gets registered/integrated into AgileTs    | Yes      |

### 📄 Return
Returns the [Agile Instance](./Introduction.md) it was called from



<br />

---

<br />



## `hasIntegration()`
Checks if AgileTs has any registered [Integration](../integration/Introduction.md).

### 📄 Return
`boolean`



<br />

---

<br />



## `createStorage()`

Creates a new [Storage](../storage/Introduction.md).
```ts
const Storage = App.createStorage({
    key: 'dummyStorage',
    methods: {
        get: (key: string) => {},
        set: (key: string, value: any) => {},
        remove: (key: string) => {}
    }
})
```
To register a newly created Storage, we use the [registerStorage](#registerstorage) function.

### 📭 Props

| Prop        | Type                                                                         | Default   | Description                                       | Required |
|-------------|------------------------------------------------------------------------------|-----------|---------------------------------------------------|----------|
| `key`       | string                                                                       | undefined | Key/Name of Storage                               | Yes      |
| `methods`   | [StorageMethodsInterface](../../../../Interfaces.md#storagemethods)          | {}        | Methods with which the Storage get mutated        | Yes      |

### 📄 Return
Returns a fresh [Storage](../storage/Introduction.md).



<br />

---

<br />



## `registerStorage()`

Adds a new [Storage](../storage/Introduction.md) to AgileTs, 
which later can store persisted Instances (`.persist()`).
The [Local Storage](https://developer.mozilla.org/de/docs/Web/API/Window/localStorage) is registered by default.
```ts {13}
  // Here we create our Storage
const _localStorage = new Storage({
    key: 'localStorage',
    async: false,
    methods: {
       get: localStorage.getItem.bind(localStorage),
       set: localStorage.setItem.bind(localStorage),
       remove: localStorage.removeItem.bind(localStorage),
    },
});

// Here we register our Storage
App.register(_localStorage, { default: true }); 
```

### 📭 Props

| Prop            | Type                                                              | Default   | Description                                                 | Required |
|-----------------|-------------------------------------------------------------------|-----------|-------------------------------------------------------------|----------|
| `integration`   | [Integration](../integration/Introduction.md)                     | undefined | Integration that gets registered/integrated into AgileTs    | Yes      |

### 📄 Return
Returns the [Agile Instance](./Introduction.md) it was called from



<br />

---

<br />



## `hasStorage()`
Checks if AgileTs has any registered [Storage](../storage/Introduction.md).
If AgileTs couldn't find any Storage, we aren't able to use the `.persist()` functionality in any Agile Sub Instance.

### 📄 Return
`boolean`