---
id: methods
title: Methods
sidebar_label: Methods
slug: /core/agile-instance/methods
---

## `createStorage`

With `createStorage` you create a new Storage.
To register your newly created Storage to the Agile Instance use the [register](#integrate) function.
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

### 📭 Props

### 📄 Return
Returns a fresh [Storage](../storage/Introduction.md).

<br />

---

<br />

## `createState`

With `createState` you create a new [State](../state/Introduction.md),
which is bound to the [Agile Instance](../agile-instance/Introduction.md) from which it was created.
```ts
const State = App.createState('jeff', {
    key: 'dummyState',
})
```

### 📭 Props

### 📄 Return
Returns a fresh [State](../state/Introduction.md).

<br />

---

<br />

## `createCollection`

With `createCollection` you create a new [Collection](../collection/Introduction.md),
which is bound to the [Agile Instance](../agile-instance/Introduction.md) from which it was created.
```ts
const Collection = App.createCollection({
    key: 'dummyCollection',
})
```

### 📭 Props

### 📄 Return
Returns a fresh [Collection](../collection/Introduction.md).

<br />

---

<br />

## `createComputed`

With `createComputed` you create a new [Computed](../computed/Introduction.md),
which is bound to the [Agile Instance](../agile-instance/Introduction.md) from which it was created.
```ts
const Computed = App.createComputed(() => {/* Computed Method */}, {
    key: 'dummyComputed',
})
```

### 📭 Props

### 📄 Return
Returns a fresh [Computed](../computed/Introduction.md).

<br />

---

<br />

## `createEvent`

With `createEvent` you create a new [Event](../event/Introduction.md),
which is bound to the [Agile Instance](../agile-instance/Introduction.md) from which it was created.
```ts
const Event = App.createEvent({
    key: 'dummyEvent',
})
```

### 📭 Props

### 📄 Return
Returns a fresh [Event](../event/Introduction.md).

<br />

---

<br />

## `integrate`

## `registerStorage`

## `hasIntegration`

## `hasStorage`