---
id: hooks
title: React Hooks
sidebar_label: React Hooks
slug: /react/hooks
---

:::note

[React Hooks](https://reactjs.org/docs/hooks-intro.html) are only supported in **Functional React Components**!

:::


## `useAgile()`

The `useAgile()` React Hook binds/subscribes States to Functional React Components.
This binding ensures that the Component re-renders whenever a bound State changes.
We can flexibly bind any [Agile Sub Instances](../../../main/Introduction.md#agile-sub-instance) 
(like States or Collections) to any React Component.
```ts
  const myCoolState = useAgile(MY_COOL_STATE); 
```
The `useAgile()` Hook returns the current `value` of the provided State Instance
and **not** the State Instance itself.
```ts {5}
// -- core.js --------------------------------------------------

const MY_STATE = createState('jeff');

// -- MyComponent.jsx ------------------------------------------

const myState = useAgile(MY_STATE);
console.log(myState); // Returns 'jeff'
```

### 📚 Array

We can also pass an array of State Instances into the `useAgile()` Hook.
```ts
useAgile([MY_COOL_STATE1, MY_COOL_STATE2]);
```
Then `useAgile()` returns an array of State `values` matching the specified State Instances.
This array can be destructured in order to easily access the individual State values
```ts {6}
// -- core.js --------------------------------------------------

const MY_STATE = App.createState('jeff');
const MY_STATE_2 = App.createState('frank');

// -- MyComponent.jsx ------------------------------------------

const [myState, myState2] = useAgile([MY_STATE, MY_STATE_2]);
console.log(myState); // Returns 'jeff'
console.log(myState2); // Returns 'frank'
```
Binding multiple States to a React Component using a single `useAgile()` Hook has one advantage.
It can reduce the number of triggered re-render events by batching re-render jobs.
Thereby, simultaneously triggered re-render events of different State Instances 
are combined into one single (combined) re-render event
if these States share the same `SubscriptionContainer`.
Each `useAgile()` Hook creates its own `Subscription Container` and registers it by AgileTs.
`Subscription Container` serve as an interface to the React-Component for AgileTs.

### 👀 Subscribable Instances

Not only AgileTs States can be bound to React Components,
but also all [Agile Sub Instances](../../../main/Introduction.md#agile-sub-instance)
that contain an `Observer`.
```ts
  const [myCollection, myGroup, myState] = useAgile([MY_COLLECTION, MY_GROUP, MY_STATE]);
```
Instances that contain an `Observer` are, for example:
- ### [`State`](../../core/api/state/Introduction.md)
  ```ts {7}
  // -- core.js --------------------------------------------------
  
  const MY_STATE = createState('jeff');
  
  // -- MyComponent.jsx ------------------------------------------

  const myState = useAgile(MY_STATE);
  console.log(myState); // Returns 'jeff'
  ```
- ### [`Computed`](../../core/api/computed/Introduction.md)
  ```ts {7}
  // -- core.js --------------------------------------------------
  
  const MY_COMPUTED = createComputed(() => 'hello there');
  
  // -- MyComponent.jsx ------------------------------------------
  
  const myComputed = useAgile(MY_COMPUTED);
  console.log(myComputed); // Returns 'hello there'
  ```  
- ### [`Collection`](../../core/api/collection/Introduction.md)
  **Note:** The Collection has no own `Observer`.
  But `useAgile()` is smart enough, to identify a Collection
  and binds the [`defualt` Group](../../core/api/collection/group/Introduction.md#-default-group) to the Component instead.
  The `default` Group represents the default pattern of the Collection.
  ```ts {9}
  // -- core.js --------------------------------------------------
  
  const MY_COLLECTION = createCollection({
     initialData: [{id: 1, name: 'a'}, {id: 2, name: 'b'}, {id: 3, name: 'c'}]  
  });
  
  // -- MyComponent.jsx ------------------------------------------
  
  const myCollection = useAgile(MY_COLLECTION);
  console.log(myCollection); // Returns (see below)
  // '[{id: 1, name: 'a'}, {id: 2, name: 'b'}, {id: 3, name: 'c'}]'
  ```  
- ### [`Group`](../../core/api/collection/group/Introduction.md)
  ```ts {10}
  // -- core.js --------------------------------------------------
  
  const MY_COLLECTION = createCollection({
     initialData: [{id: 1, name: 'a'}, {id: 2, name: 'b'}, {id: 3, name: 'c'}]  
  });
  const MY_GROUP = MY_COLLECTION.createGroup('myGroup', [3, 1]);
  
  // -- MyComponent.jsx ------------------------------------------
  
  const myGroup = useAgile(MY_GROUP);
  console.log(myGroup); // Returns '[{id: 3, name: 'c'}, {id: 1, name: 'a'}]'
  ```
- ### [`Selector`](../../core/api/collection/selector/Introduction.md)
  ```ts {10}
  // -- core.js --------------------------------------------------
  
  const MY_COLLECTION = createCollection({
     initialData: [{id: 1, name: 'a'}, {id: 2, name: 'b'}, {id: 3, name: 'c'}]  
  });
  const MY_SELECTOR = MY_COLLECTION.select(2);
  
  // -- MyComponent.jsx ------------------------------------------
  
  const mySelector = useAgile(MY_SELECTOR);
  console.log(mySelector); // Returns '{id: 2, name: 'b'}'
  ```
- ### [`Item`](../../core/api/collection/Introduction.md#-item)
  ```ts {10}
  // -- core.js --------------------------------------------------
  
  const MY_COLLECTION = createCollection({
     initialData: [{id: 1, name: 'a'}, {id: 2, name: 'b'}, {id: 3, name: 'c'}]  
  });
  const MY_ITEM = MY_COLLECTION.getItem(3);
  
  // -- MyComponent.jsx ------------------------------------------
  
  const myItem = useAgile(MY_ITEM);
  console.log(myItem); // Returns '{id: 3, name: 'c'}'
  ```

### 🔴 Example

```tsx live
const MY_STATE = createState("Hello Stranger!");

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
```ts
// -- core.js --------------------------------------------------

const NUMBER_STATE = createState(0);
const STRING_STATE = createState('hello there');

// -- MyComponent.jsx ------------------------------------------

const [numberState, stringState] = useAgile([NUMBER_STATE, STRING_STATE]);
console.log(typeof numberState); // Returns 'number'
console.log(typeof stringState); // Returns 'string'
```

### 📭 Props

| Prop              | Type                                                                         | Description                                                                                                  | Required    | 
| ----------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------|
| `deps`            | Array<SubscribableAgileInstancesType\> \| SubscribableAgileInstancesType     | Agile Sub Instances that are bound to the Component in which the useAgile Hook is located                    | Yes         | 
| `config`          | [AgileHookConfigInterface](../../../Interfaces.md#agilehookconfiginterface)  | Configuration                                                                                                | No          |

#### SubscribableAgileInstancesType
```ts
type SubscribableAgileInstancesType = State | Collection | Observer | undefined;
```

### 📄 Return

`useAgile()` returns the current `output` of the specified [Agile Sub Instance](../../../main/Introduction.md#agile-sub-instance).
```ts {5}
const MY_STATE = App.createState('jeff');

// -- MyComponent.jsx ------------------------------------------

const myState = useAgile(MY_STATE);
console.log(myState); // Returns 'jeff'
```
When passing multiple Agile Sub Instances, an array of `outputs` matching the passed Instances is returned.
```ts {6}
// -- core.js --------------------------------------------------

const MY_STATE = App.createState('jeff');
const MY_STATE_2 = App.createState('frank');

// -- MyComponent.jsx ------------------------------------------

const [myState, myState2] = useAgile([MY_STATE, MY_STATE_2]);
console.log(myState); // Returns 'jeff'
console.log(myState2); // Returns 'frank'
```



<br />

---

<br />



## `useProxy()`

The `useProxy()` is in its basic functionality equivalent to the [`useAgile()`](#useagile) Hook.
It binds/subscribes AgileTs States to Functional React Components for reactivity.
However, it has one advantage in terms of performance 
by only re-rendering the Component when an actual accessed property changes.
This is accomplished by warping a [Proxy()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
around the returned State value/s.
Through these Proxy, AgileTs is able to exactly track accessed properties in the returned State value object/s
and construct paths to these.

Using the `useAgile()`, the Component would be always re-rendered on a subscribed State value change,
regardless of whether the changed property value was accessed in the Component.

### 👀 Subscribable Instances

Not only AgileTs States can be bound to React Components,
but also all [Agile Sub Instances](../../../main/Introduction.md#agile-sub-instance)
that contain an `Observer`.
```ts
  const [myCollection, myGroup, myState] = useProxy([MY_COLLECTION, MY_GROUP, MY_STATE]);
```
However, a [Javascript Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
can only be wrapped around values of the type object. 
Other provided instances are treated as in [`useAgile()`](#useagile).

### 🔴 Example

```tsx live
const App = new Agile();
const MY_STATE = App.createState({name: 'jeff', location: 'Germany', age: 19}, {key: 'myState'});

let rerenderCount = 0;

const RandomComponent = () => {
  const myState = useProxy(MY_STATE);

  rerenderCount++;

  return (
          <div>
            <p>Name: {myState.name}</p>
            <p>Rerender: {rerenderCount}</p>
            <p>State Value: {JSON.stringify(MY_STATE.value)}</p>
            <button
                    onClick={() => {
                      MY_STATE.patch({name: generateId()})
                    }}
            >
              Update Name
            </button>
            <button
                    onClick={() => {
                      MY_STATE.patch({location: generateId()})
                    }}
            >
              Update Location
            </button>
          </div>
  );
}

render(<RandomComponent/>);
```

### 🟦 Typescript

The `useProxy()` Hook is almost 100% typesafe.

### 📭 Props

| Prop              | Type                                                                         | Description                                                                                                  | Required    | 
| ----------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------|
| `deps`            | Array<SubscribableAgileInstancesType\> \| SubscribableAgileInstancesType     | Agile Sub Instances that are bound to the Component in which the useProxy Hook is located                    | Yes         | 
| `config`          | [AgileHookConfigInterface](../../../Interfaces.md#agilehookconfiginterface)  | Configuration                                                                                                | No          |

#### SubscribableAgileInstancesType
```ts
type SubscribableAgileInstancesType = State | Collection | Observer | undefined;
```

### 📄 Return

`useProxy()` returns the current `output` of the passed [Agile Sub Instance](../../../main/Introduction.md#agile-sub-instance).
```ts {5}
const MY_STATE = App.createState({name: 'jeff', age: 10});

// MyComponent.jsx

const myState = useProxy(MY_STATE);
console.log(myState); // Returns '{name: 'jeff', age: 10}'
```
When passing multiple Agile Sub Instances, an array of `outputs` matching the passed Instances is returned.
```ts {6}
const MY_STATE = App.createState({name: 'jeff', age: 10});
const MY_STATE_2 = App.createState('frank');

// MyComponent.jsx

const [myState, myState2] = useProxy([MY_STATE, MY_STATE_2]);
console.log(myState); // Returns '{name: 'jeff', age: 10}'
console.log(myState2); // Returns 'frank'
```



<br />

---

<br />



## `useWatcher()`
Creates a  `callback` that observes the State on changes.
The provided `callback` function will be fired on every State `value` mutation.
For instance if we update the State value from 'jeff' to 'hans'.
```ts
useWatcher(MY_STATE, (value) => {
  console.log(value); // Returns current State Value
});
```
It is a synonym to the [`watch()`](../../core/api/state/Methods.md#watch) method.
However, it has some advantages.
For example, it automatically cleans up the created watcher callback when the React Component unmounts
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



<br />

---

<br />



## `useValue()`

:::warning

**Note** that this is a "work in progress" hook that has not yet been tested that extensively.

:::



<br />

---

<br />



## `useOutput()`

:::warning

**Note** that this is a "work in progress" hook that has not yet been tested that extensively.

:::



<br />

---

<br />



## `useSelector()`

:::warning

**Note** that this is a "work in progress" hook that has not yet been tested that extensively.

:::
