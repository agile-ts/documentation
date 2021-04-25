---
id: hooks
title: React Hooks
sidebar_label: React Hooks
slug: /react/hooks
---

:::warning

Be aware that [React Hooks](https://reactjs.org/docs/hooks-intro.html) are only supported in **Functional React Components**!

:::


## `useAgile()`

The `useAgile()` React Hook binds/subscribes States to Functional React Components.
This binding ensures that the Component rerenders whenever a bound State mutates.
We can flexibly bind any State to any React Component.
```ts
  const myCoolState = useAgile(MY_COOL_STATE); 
```
Be aware, that `useAgile()` returns the current `value` of the passed State
and not the State Instance itself.
```ts {5}
const MY_STATE = App.createState('jeff');

// myComponent.jsx

const myState = useAgile(MY_STATE);
console.log(myState); // Returns 'jeff'
```

### 🗂 Array
`useAgile()` also supports **arrays** of State Instances.
```ts
const [myCoolState1, myCoolState2] = useAgile([MY_COOL_STATE1, MY_COOL_STATE2]);
```
Now it returns an array of State `values` that can be destructured.
```ts {6}
const MY_STATE = App.createState('jeff');
const MY_STATE_2 = App.createState('frank');

// myComponent.jsx

const [myState, myState2] = useAgile([MY_STATE, MY_STATE_2]);
console.log(myState); // Returns 'jeff'
console.log(myState2); // Returns 'frank'
```
Binding multiple States to a Component in a single `useAgile()` Hook has one advantage.
In some cases, it can lower the rerender count of the React Component.
This is due to the fact that simultaneously triggered rerender of different States can be combined into one single rerender
if the States share the same `SubscriptionContainer`.
Each `useAgile()` Hook creates its own `SubscriptionContainer`,
which serves as an interface to the Component in order to trigger rerender on it.

### 🏷 Subscribable Instances
We are not limited to States.
We can bind any [Agile Sub Instance](../../../main/Introduction.md#agile-sub-instance) that owns
an `Observer` to React Components.
```ts
  const [myCollection, myGroup, myState] = useAgile([MY_COLLECTION, MY_GROUP, MY_STATE]);
```
Instances that can be bound to a React Component via the `useAgile()` Hook:
- ### [`State`](../../core/features/state/Introduction.md)
  ```ts {5}
  const MY_STATE = App.createState('jeff');
  
  // myComponent.jsx

  const myState = useAgile(MY_STATE);
  console.log(myState); // Returns 'jeff'
  ```
- ### [`Computed`](../../core/features/computed/Introduction.md)
  ```ts {5}
  const MY_COMPUTED = App.createComputed(() => 'hello there');
  
  // myComponent.jsx
  
  const myComputed = useAgile(MY_COMPUTED);
  console.log(myComputed); // Returns 'hello there'
  ```  
- ### [`Collection`](../../core/features/collection/Introduction.md)
  **Note:** The Collection has no own `observer`.
  But `useAgile()` is smart enough, to identify a Collection under the hood
  and binds the [`defualt` Group](../../core/features/collection/group/Introduction.md#-default-group) to the Component instead.
  The `default` Group represents the default pattern of the Collection.
  ```ts {7}
  const MY_COLLECTION = App.createCollection({
     initialData: [{id: 1, name: 'a'}, {id: 2, name: 'b'}, {id: 3, name: 'c'}]  
  });
  
  // myComponent.jsx
  
  const myCollection = useAgile(MY_COLLECTION);
  console.log(myCollection); // Returns (see below)
  // '[{id: 1, name: 'a'}, {id: 2, name: 'b'}, {id: 3, name: 'c'}]'
  ```  
- ### [`Group`](../../core/features/collection/group/Introduction.md)
  ```ts {8}
  const MY_COLLECTION = App.createCollection({
     initialData: [{id: 1, name: 'a'}, {id: 2, name: 'b'}, {id: 3, name: 'c'}]  
  });
  const MY_GROUP = MY_COLLECTION.createGroup('myGroup', [3, 1]);
  
  // myComponent.jsx
  
  const myGroup = useAgile(MY_GROUP);
  console.log(myGroup); // Returns '[{id: 3, name: 'c'}, {id: 1, name: 'a'}]'
  ```
- ### [`Selector`](../../core/features/collection/selector/Introduction.md)
  ```ts {8}
  const MY_COLLECTION = App.createCollection({
     initialData: [{id: 1, name: 'a'}, {id: 2, name: 'b'}, {id: 3, name: 'c'}]  
  });
  const MY_SELECTOR = MY_COLLECTION.select(2);
  
  // myComponent.jsx
  
  const mySelector = useAgile(MY_SELECTOR);
  console.log(mySelector); // Returns '{id: 2, name: 'b'}'
  ```
- ### [`Item`](../../core/features/collection/Introduction.md#-item)
  ```ts {8}
  const MY_COLLECTION = App.createCollection({
     initialData: [{id: 1, name: 'a'}, {id: 2, name: 'b'}, {id: 3, name: 'c'}]  
  });
  const MY_ITEM = MY_COLLECTION.getItem(3);
  
  // myComponent.jsx
  
  const myItem = useAgile(MY_ITEM);
  console.log(myItem); // Returns '{id: 3, name: 'c'}'
  ```
- ### `undefined`
  ```ts {1}
  const myUndefined = useAgile(undefined);
  console.log(myUndefined); // Returns 'undefined'
  ```

### 🔴 Example

```tsx live
  const App = new Agile();
const MY_STATE = App.createState("Hello Stranger!");

const RandomComponent = () => {
  const myFirstState = useAgile(MY_STATE); // Returns "Hello Stranger!"

  return (
          <div>
            <p>{myFirstState}</p>
            <button
                    onClick={() => {
                      MY_STATE.set("Hello Friend!");
                    }}
            >
              Update State
            </button>
          </div>
  );
}

render(<RandomComponent/>);
```

### 🟦 Typescript

The `useAgile()` Hook is almost 100% typesafe.

### 📭 Props

| Prop              | Type                                                                       | Description                                                                                                  | Required    | 
| ----------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------|
| `deps`            | Array<SubscribableAgileInstancesType\> \| SubscribableAgileInstancesType   | Agile Sub Instances that are bound to the Component in which the useAgile Hook is located                    | Yes         | 
| `key`             | string \| number                                                           | Key/Name of SubscriptionContainer that is created. Mainly thought for Debugging                              | No          | 
| `agileInstance`   | Agile                                                                      | To which Agile Instance the State belongs. Automatically detected if only one Agile Instance exists.         | No          |

#### SubscribableAgileInstancesType
```ts
type SubscribableAgileInstancesType = State | Collection | Observer | undefined;
```

### 📄 Return

`useAgile()` returns the current `output` of the passed [Agile Sub Instance](../../../main/Introduction.md#agile-sub-instance).
```ts {6,9}
const MY_STATE = App.State(1);
const MY_STATE_2 = App.State(2);
const MY_STATE_3 = App.State(3);

// One passed Agile Sub Instance
useAgile(MY_STATE); // Returns 3

// Multiple passed Agile Sub Instances
useAgile([MY_STATE, MY_STATE_2, MY_STATE_3]); // Returns [1, 2, 3]
```



<br />

---

<br />



## `useWatcher()`
A `callback` that observes the State on changes.
The provided `callback` function will be fired on every State `value` mutation.
For instance if we update the State value from 'jeff' to 'hans'.
```ts
useWatcher(MY_STATE, (value, key) => {
  console.log(value); // Returns current State Value
  console.log(key); // Key of Watcher ("Aj2pB")
});
```
It is a synonym to the [`watch()`](../../core/features/state/Methods.md#watch) method.
But it has some advantages. It automatically cleans up the created watcher callback when the React Component unmounts
and might be cleaner to read in 'UI-Component-Code'.

### 🔴 Example

```tsx live
const App = new Agile();
const MY_STATE = App.createState("hello");

const RandomComponent = () => {
  useWatcher(MY_STATE, (value) => {
    toast("New Value: " + value);
  });

  return (
          <div>
            <button
                    onClick={() => {
                      MY_STATE.set("bye");
                    }}
            >
              Change State
            </button>
          </div>
  );
}

render(<RandomComponent/>);
```

### 🟦 Typescript

The `useWatcher()` Hook is almost 100% typesafe.

### 📭 Props

| Prop              | Type                                            | Description                                                                  | Required    | 
| ----------------- | ----------------------------------------------- | ---------------------------------------------------------------------------- | ------------|
| `state`           | State<T\>                                       | State to which the passed watcher callback is applied                        | Yes         | 
| `callback`        | StateWatcherCallback<T\>                        | Callback function that is called on each State value change                  | Yes         |

### 📄 Return

```ts
void
```